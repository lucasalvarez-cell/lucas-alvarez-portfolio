/**
 * The daily publish.
 *
 * The site is prerendered end to end, so "today" is decided at build time:
 * `getAllPosts()` drops anything dated in the future, and the post scheduled
 * for today only exists once a build has run after midnight in Madrid. That
 * build is what this route triggers.
 *
 * A deploy hook rather than ISR on purpose. ISR would mean flipping
 * `dynamicParams` to true on /blog/[slug], and it is false deliberately so a
 * missed slug cannot inherit the root canonical. It would also leave
 * sitemap.xml, llms.txt and feed.xml (all force-static) announcing a post the
 * page itself was not serving yet. A full rebuild is about two minutes and
 * keeps one source of truth for what is published.
 *
 * Scheduled at 06:00 UTC, which is 08:00 in Madrid in summer and 07:00 in
 * winter. Both are safely past the Madrid midnight. A midnight-UTC cron would
 * fire at 02:00 Madrid in summer and publish a day early.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;

  /* Vercel sends this header itself once CRON_SECRET is set on the project.
     Without the variable the route stays closed rather than open: an
     unauthenticated deploy trigger is a free way for anyone to burn the build
     minutes on the account. */
  if (!secret) {
    return Response.json(
      { error: "CRON_SECRET no está configurada." },
      { status: 500 },
    );
  }

  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("No autorizado", { status: 401 });
  }

  const hook = process.env.DEPLOY_HOOK_URL;
  if (!hook) {
    return Response.json(
      { error: "DEPLOY_HOOK_URL no está configurada." },
      { status: 500 },
    );
  }

  const response = await fetch(hook, { method: "POST" });

  if (!response.ok) {
    return Response.json(
      { error: `El deploy hook devolvió ${response.status}.` },
      { status: 502 },
    );
  }

  /* Deliberately does not touch IndexNow. At this moment the build has only
     been queued: the post is not live for another couple of minutes, and
     submitting a URL that still 404s is how a domain loses trust with the
     endpoint. That is the second cron's job, an hour later. */
  return Response.json({ ok: true, triggered: "deploy" });
}
