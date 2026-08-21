import { createHash, randomBytes } from "node:crypto";

/**
 * Best-effort throttle for the contact endpoint.
 *
 * **What this is not:** an exact limit. On Vercel the route runs in serverless
 * functions. An instance is reused while warm — often for minutes, and warm
 * instances are preferred by the router, so this map persists more reliably
 * than the folklore suggests — but concurrent instances exist under load and a
 * cold start wipes it. None of that is contractual. Any design that promises an
 * exact number without an external store is lying about it.
 *
 * **Why that is the right trade here.** The alternative — Upstash or Vercel KV —
 * means another service, more environment variables, and another US data
 * processor persisting an IP-derived key off-box. That makes the GDPR position
 * *worse*, not better, and adds a name to the privacy policy. What actually
 * stops automated spam is the honeypot and the fill-time check in
 * `contact-schema.ts`; this is the backstop for someone holding down a button.
 *
 * If real spam ever arrives, swap the map for Upstash behind this same pair of
 * functions and nothing else in the codebase changes.
 *
 * **The IP is never stored.** It is hashed with a salt generated fresh at
 * process start, and only the hash goes in the map, in memory, with an expiry.
 * Nothing is written to disk or to a log — and the log part matters more than it
 * looks: on Vercel a `console.log` goes to Runtime Logs, which are retained, so
 * printing the address while debugging would undo the whole design. Because the
 * salt dies with the process the hash cannot be correlated across deployments
 * or reversed by hashing a list of candidate addresses.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_KEY = 3;

/**
 * A second dimension: a ceiling on what one instance will send in an hour,
 * whoever asks. It is the cheap catch for a distributed bot that happens to
 * land on one warm instance, and it is what actually protects the Resend quota
 * — which, at two emails per submission on the free plan, runs out at fifty
 * submissions a day and then legitimate messages start failing.
 */
const MAX_GLOBAL_PER_HOUR = 30;
const HOUR_MS = 60 * 60 * 1000;

/** Regenerated on every cold start. Deliberately not configurable. */
const SALT = randomBytes(32).toString("hex");

const hits = new Map<string, number[]>();
let globalHits: number[] = [];

/**
 * The caller's address, as far as the platform will tell us.
 *
 * `x-real-ip` first: Vercel sets it to a single client address, so there is no
 * list to parse and no ambiguity. `x-forwarded-for` is the fallback and its
 * first entry is the client. Both are set by the proxy, so they are trustworthy
 * at the edge — which is another way of saying this is a backstop and not a
 * security control.
 */
export function clientIp(request: Request): string {
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real;

  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || "unknown";
}

function hash(ip: string): string {
  return createHash("sha256").update(`${SALT}:${ip}`).digest("hex").slice(0, 32);
}

export type RateLimitVerdict = { limited: boolean; retryAfter: number };

/**
 * Read-only. Deliberately separate from {@link recordSend}.
 *
 * If a hit were recorded on every request, a visitor who submits, gets a
 * validation error for a short message, fixes it and submits again would have
 * burned two of three slots and be blocked on their third honest attempt. Only
 * submissions that are actually about to send an email count.
 */
export function checkRateLimit(ip: string): RateLimitVerdict {
  const now = Date.now();
  const key = hash(ip);

  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= MAX_PER_KEY) {
    const oldest = recent[0] ?? now;
    return {
      limited: true,
      retryAfter: Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000)),
    };
  }

  const recentGlobal = globalHits.filter((at) => now - at < HOUR_MS);
  if (recentGlobal.length >= MAX_GLOBAL_PER_HOUR) {
    const oldest = recentGlobal[0] ?? now;
    return {
      limited: true,
      retryAfter: Math.max(1, Math.ceil((HOUR_MS - (now - oldest)) / 1000)),
    };
  }

  return { limited: false, retryAfter: 0 };
}

export function recordSend(ip: string): void {
  const now = Date.now();
  const key = hash(ip);

  /* A long-lived warm instance under attack must not grow without bound. */
  if (hits.size > 500) hits.clear();

  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  globalHits = globalHits.filter((at) => now - at < HOUR_MS);
  globalHits.push(now);
}
