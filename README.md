# lucasalvarez.info

Web de Lucas Álvarez, social media manager y estratega de contenido en Barcelona. Next.js 16 (App Router), React 19, Tailwind 4, contenido en MDX y TypeScript, desplegada en Vercel.

## Arranque

```bash
npm install
cp .env.example .env.local   # rellena al menos RESEND_API_KEY para el formulario
npm run dev                  # http://localhost:3000
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción. Ejecuta `assertSectorPages()`, que falla si una página de sector baja de 700 palabras o repite una respuesta de FAQ |
| `npm run start` | Sirve el build |
| `npm run lint` | ESLint |
| `npm run indexnow` | Envía las URL del sitemap desplegado a IndexNow (Bing, Yandex, Seznam, Naver). Google no participa |

## Dónde está cada cosa

```
content/
  blog/*.mdx          Artículos. El frontmatter está tipado en src/types/blog.ts
  servicios.ts        Los seis servicios: copy, precios, FAQ y proceso
  sectores.ts         Páginas de servicio por sector
  casos-de-exito.ts   Casos con cifras
src/
  app/                Rutas. sitemap.ts, robots.ts, llms.txt y feed.xml son generados
  lib/schema.ts       Todo el JSON-LD. Un solo @graph con @id cruzados
  lib/seo.ts          buildMetadata(): title, canónica, robots, OG y alternates
  lib/links.ts        Qué enlaces salientes pasan autoridad y cuáles van en nofollow
```

## Reglas que el código da por supuestas

- **Una sola fuente por dato.** Los precios viven en `content/servicios.ts` y de ahí salen la página, el `Offer` del schema, `/precios` y `llms.txt`. Cambiarlos en un sitio los cambia en todos.
- **Un solo `FAQPage` por documento**, y la array que se pasa a `faqSchema()` tiene que ser la misma que renderiza `<FaqSection>`. Marcar preguntas que no están visibles en la página es la causa más común de una acción manual.
- **Sin `Review` ni `AggregateRating` propios.** Reseñas de uno mismo sobre uno mismo están prohibidas por la política de datos estructurados de Google. Las reseñas van en el perfil de empresa de Google.
- **Los precios de mercado que se citan no son `Offer`.** Solo lo que cobra Lucas se declara como oferta; las bandas ajenas son texto.
- **Enlaces salientes:** `src/lib/links.ts` decide. Los dominios propios y las fuentes documentales pasan autoridad; el resto sale en `nofollow`. Los rankings citan a la competencia con enlace porque si no no son verificables, pero no le regalan señal.

## Variables de entorno

Están documentadas una a una en `.env.example`. Ninguna lleva el prefijo `NEXT_PUBLIC_`: ese prefijo mete el valor en el JavaScript que descarga el navegador.

## Después de desplegar

1. `npm run indexnow` para avisar a Bing, que es el índice que alimenta Copilot y la búsqueda web de ChatGPT.
2. Solicitar indexación en Search Console de las URL nuevas o reescritas.
