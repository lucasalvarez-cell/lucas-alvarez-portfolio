/**
 * Pushes every URL in the live sitemap to IndexNow.
 *
 * Bing, Yandex, Seznam and Naver read this endpoint and recrawl in hours
 * instead of waiting for their own schedule. Google does not participate, so
 * this is not a substitute for Search Console; it is the fast lane to Bing,
 * which is what backs Copilot and the web search inside ChatGPT.
 *
 * The URL list comes from the deployed sitemap rather than from `sitemap.ts`,
 * so there is still exactly one source of truth for the route list and what
 * gets submitted is what is actually live. Running this against a deploy that
 * has not finished propagating just submits the previous set, which is
 * harmless.
 *
 *   node scripts/indexnow.mjs                 # every URL in the sitemap
 *   node scripts/indexnow.mjs /blog/foo /precios   # only these paths
 */

const SITE_URL = "https://lucasalvarez.info";
const KEY = "4eb52d3830fb66887a93b839c855d32c";
const ENDPOINT = "https://api.indexnow.org/indexnow";

/* IndexNow caps a single submission at 10.000 URLs. Nowhere near it today, but
   the batching is three lines and the failure mode without it is a silent 422. */
const BATCH_SIZE = 10000;

const host = new URL(SITE_URL).host;
const keyLocation = `${SITE_URL}/${KEY}.txt`;

async function urlsFromSitemap() {
  const response = await fetch(`${SITE_URL}/sitemap.xml`, {
    headers: { "User-Agent": "indexnow-submit (+https://lucasalvarez.info)" },
  });

  if (!response.ok) {
    throw new Error(`GET /sitemap.xml devolvió ${response.status}`);
  }

  const xml = await response.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].trim(),
  );

  if (locs.length === 0) {
    throw new Error("El sitemap se ha leído pero no contiene ninguna <loc>.");
  }

  return locs;
}

async function verifyKeyFile() {
  const response = await fetch(keyLocation);
  const body = response.ok ? (await response.text()).trim() : "";

  if (body !== KEY) {
    throw new Error(
      `${keyLocation} devolvió ${response.status} y "${body.slice(0, 40)}". ` +
        `Tiene que devolver 200 y exactamente "${KEY}", o IndexNow rechaza el envío.`,
    );
  }

  console.log(`Clave verificada en ${keyLocation}`);
}

async function submit(urlList) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: KEY, keyLocation, urlList }),
  });

  /* 200 = aceptado, 202 = aceptado y clave pendiente de validar. Cualquier otra
     cosa es un rechazo y el cuerpo dice por qué. */
  const detail = response.status === 200 || response.status === 202
    ? ""
    : `: ${await response.text()}`;

  console.log(
    `${urlList.length} URLs -> ${response.status} ${response.statusText}${detail}`,
  );

  return response.status === 200 || response.status === 202;
}

const explicit = process.argv.slice(2);
const urls = explicit.length
  ? explicit.map((path) => new URL(path, SITE_URL).href)
  : await urlsFromSitemap();

await verifyKeyFile();

let ok = true;
for (let index = 0; index < urls.length; index += BATCH_SIZE) {
  ok = (await submit(urls.slice(index, index + BATCH_SIZE))) && ok;
}

if (!ok) process.exitCode = 1;
