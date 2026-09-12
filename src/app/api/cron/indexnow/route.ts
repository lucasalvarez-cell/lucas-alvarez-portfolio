import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

/**
 * Tells IndexNow about the post that went live this morning.
 *
 * Bing, Yandex, Seznam and Naver recrawl within hours of a ping instead of
 * waiting for their own schedule, and Bing is what backs Copilot and the web
 * search inside ChatGPT. Google does not participate.
 *
 * Only today's URLs are submitted. `scripts/indexnow.mjs` pushes the whole
 * sitemap, which is right after a migration and wrong every morning:
 * resubmitting 138 unchanged URLs daily is the pattern the endpoint treats as
 * noise.
 *
 * Runs at 07:00 UTC, an hour after the deploy is triggered, so the URL it
 * announces is one that already resolves.
 */
export const dynamic = "force-dynamic";

const KEY = "4eb52d3830fb66887a93b839c855d32c";

function todayInMadrid(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function GET(request: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return Response.json(
      { error: "CRON_SECRET no está configurada." },
      { status: 500 },
    );
  }

  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("No autorizado", { status: 401 });
  }

  const today = todayInMadrid();
  const urlList = getAllPosts()
    .filter((post) => post.date === today || post.updated === today)
    .map((post) => `${SITE_URL}/blog/${post.slug}`);

  /* Most days there is exactly one. On a day with nothing scheduled there are
     none, and saying so is a better outcome than inventing a submission. */
  if (urlList.length === 0) {
    return Response.json({ ok: true, submitted: 0 });
  }

  /* The blog index and the sitemap both changed too, and they are how a
     crawler finds its way to the rest. */
  urlList.push(`${SITE_URL}/blog`, `${SITE_URL}/sitemap.xml`);

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList,
    }),
  });

  /* 200 accepted, 202 accepted with the key still pending validation. */
  const accepted = response.status === 200 || response.status === 202;

  return Response.json(
    {
      ok: accepted,
      submitted: urlList.length,
      urls: urlList,
      status: response.status,
      detail: accepted ? undefined : await response.text(),
    },
    { status: accepted ? 200 : 502 },
  );
}
