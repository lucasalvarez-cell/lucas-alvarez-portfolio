import type { PostMeta } from "@/types/blog";

/**
 * Topic hubs.
 *
 * The index was a flat wall of equal cards with no way in. Every blog that
 * ranks in this sector organises by topic, because a reader who arrived on
 * "mejores agencias SEO" wants the other three SEO pieces, not the camping one.
 *
 * A hub only earns a URL if it has real posts under it *and* something of its
 * own to say. `overview` and `path` are that something: a hub that only
 * repeats the titles of its children is a thin page competing with them.
 */
export type Topic = {
  tag: string;
  label: string;
  /** H1 of the hub page. */
  title: string;
  description: string;
  /** Shown under the H1 — the promise of the cluster in one line. */
  intro: string;
  /** The hub's own prose. Nothing here should be liftable from a child post. */
  overview: string[];
  /** Reading order, framed by the decision each article resolves. */
  path: { decision: string; slug: string; label: string }[];
};

/**
 * Below this, a hub is a thin page that competes with its own children for the
 * same terms while adding almost nothing. Two-post topics keep their tag for
 * relatedness and simply produce no URL.
 */
export const MIN_POSTS_FOR_HUB = 3;

export const TOPICS: Topic[] = [
  {
    tag: "marketing-digital",
    label: "Marketing digital",
    title: "Agencias de marketing digital: cómo elegir y quién hay",
    description:
      "Rankings y guías para elegir agencia de marketing digital en Barcelona, Cataluña y España: qué preguntar, qué plazos son reales y quién hace qué.",
    intro:
      "Cómo se elige una agencia generalista, qué debería incluir la propuesta y quién trabaja bien en Barcelona, Cataluña y España.",
    overview: [
      "Contratar una agencia generalista es la decisión más difícil de auditar de todo el marketing digital, porque el servicio se define en la propuesta y se juzga un año después. Casi todas dicen lo mismo con las mismas palabras, y ninguna de esas frases se puede comprobar antes de firmar.",
      "Lo que sí se puede comprobar es el proceso: quién ejecuta frente a quién vende, qué se hace la primera semana, desde qué punto de partida se va a medir y a nombre de quién quedan las cuentas. Estos artículos están escritos alrededor de eso, no alrededor de qué agencia es mejor en abstracto.",
      "Un aviso que se repite en todos: trabajo en Publiqo, que aparece primera en los rankings de esta sección. Va dicho arriba en cada pieza y no en una nota al pie, porque es la información que necesitas para leer el resto con criterio.",
    ],
    path: [
      {
        decision: "Qué preguntar antes de firmar con cualquiera",
        slug: "como-elegir-agencia-marketing-digital-barcelona",
        label: "Las 8 preguntas antes de firmar",
      },
      {
        decision: "Quién hay en Barcelona y con quién encaja cada una",
        slug: "mejores-agencias-marketing-digital-barcelona",
        label: "Ranking de Barcelona",
      },
      {
        decision: "Si tu negocio no está en el área metropolitana",
        slug: "mejores-agencias-marketing-digital-cataluna",
        label: "Ranking de Cataluña",
      },
      {
        decision: "Si el presupuesto es de pyme y no de marca nacional",
        slug: "mejores-agencias-marketing-pymes-barcelona",
        label: "Ranking para pymes",
      },
      {
        decision: "Antes de contratar nada: saber qué falla exactamente",
        slug: "mejor-agencia-consultoria-marketing-digital-barcelona",
        label: "Auditoría y consultoría",
      },
    ],
  },
  {
    tag: "seo",
    label: "SEO",
    title: "SEO y posicionamiento web",
    description:
      "SEO explicado desde dentro: cómo auditar a una agencia SEO sin saber SEO, qué plazos son reales y qué priorizar si eres un negocio pequeño.",
    intro:
      "Cómo juzgar el trabajo de posicionamiento sin ser técnico, qué se hace primero y qué promesas son directamente imposibles.",
    overview: [
      "El SEO es el servicio más fácil de cobrar sin hacer: los resultados tardan meses, dependen de un algoritmo ajeno y son difíciles de auditar para quien no es del gremio. Es el terreno perfecto para facturar un año entero sin que se note que no está pasando nada.",
      "Por eso esta sección dedica más espacio a enseñarte a juzgar el trabajo que a explicarte el trabajo. Tres frases descartan a una agencia antes de llegar al presupuesto: garantizar la primera posición, presentarse como partner oficial de Google en orgánico y prometer resultados en un mes. Ninguna de las tres es posible.",
      "El resto es orden. Primero la base técnica, aunque no luzca, porque hasta que Google no puede rastrear e indexar bien tu web cualquier esfuerzo de contenido rinde por debajo. Después las palabras clave por intención, que es lo que separa subir en un ranking de que suene el teléfono.",
    ],
    path: [
      {
        decision: "Cómo auditar a una agencia SEO sin saber SEO",
        slug: "como-elegir-agencia-seo-barcelona",
        label: "Guía para elegir agencia SEO",
      },
      {
        decision: "Quién hay en Barcelona y para qué sirve cada una",
        slug: "mejores-agencias-seo-barcelona",
        label: "Ranking de agencias SEO",
      },
      {
        decision: "Qué hacer tú mismo si tienes un negocio pequeño",
        slug: "fundamentos-seo-pequenos-negocios-2026",
        label: "Fundamentos para negocios pequeños",
      },
      {
        decision: "Si solo puedes permitirte un canal",
        slug: "seo-o-google-ads-negocio-local",
        label: "SEO o Google Ads",
      },
    ],
  },
  {
    tag: "publicidad",
    label: "Publicidad online",
    title: "Google Ads y Meta Ads",
    description:
      "Cuándo invertir en Google Ads o Meta Ads, cómo se estructura una cuenta, qué medir y qué señales indican que te están gestionando mal el presupuesto.",
    intro:
      "Cuándo la publicidad acelera un negocio y cuándo solo acelera las pérdidas, con la estructura de cuenta y las métricas que importan.",
    overview: [
      "Los dos canales de pago hacen cosas distintas y se confunden constantemente. Google recoge demanda que ya existe: alguien busca lo que vendes y tú apareces. Meta la crea: le enseña tu producto a quien no te estaba buscando. Elegir mal entre los dos es la forma más rápida de concluir que la publicidad no funciona en tu sector.",
      "En los dos, el dinero se pierde casi siempre en el mismo sitio, y no es la puja: es el destino. Una página que tarda cuatro segundos en cargar en móvil, un formulario que nadie ha probado o tráfico enviado a la home cuando la búsqueda iba de una cosa concreta. La publicidad acelera lo que ya existe, incluidas las pérdidas.",
      "La otra confusión frecuente es el plazo. En Ads entran conversiones desde la primera semana, pero el coste por cliente no se estabiliza hasta el segundo o tercer mes, mientras se limpian búsquedas y se concentra el presupuesto. Escalar antes de esa limpieza es multiplicar un error.",
    ],
    path: [
      {
        decision: "Si deberías invertir en búsqueda ahora mismo",
        slug: "agencia-google-ads-barcelona",
        label: "Qué hace una agencia de Google Ads",
      },
      {
        decision: "Quién gestiona bien una cuenta en Barcelona",
        slug: "mejores-agencias-google-ads-barcelona",
        label: "Ranking de agencias SEM",
      },
      {
        decision: "Por qué en Meta el anuncio pesa más que el público",
        slug: "agencia-meta-ads-barcelona",
        label: "Meta Ads y el creativo",
      },
      {
        decision: "Si solo puedes permitirte un canal",
        slug: "seo-o-google-ads-negocio-local",
        label: "SEO o Google Ads",
      },
    ],
  },
  {
    tag: "redes-sociales",
    label: "Redes sociales",
    title: "Gestión de redes sociales y contenido",
    description:
      "Qué incluye de verdad gestionar redes sociales, cómo se valida un formato antes de subir la frecuencia y las cifras reales de las cuentas que gestiono.",
    intro:
      "Qué separa gestionar una cuenta de rellenar un calendario, y el método con el que estas cuentas se movieron de verdad.",
    overview: [
      "Bajo la etiqueta «gestión de redes sociales» conviven dos servicios que no se parecen en nada: rellenar un calendario con material que envía el cliente, y producir el contenido. Cuestan parecido, se venden con las mismas palabras y dan resultados incomparables.",
      "El método que se repite en todos estos artículos tiene tres pasos y el orden es lo que importa: entender por qué no funciona lo que ya existe, validar un formato con datos y solo entonces subir la frecuencia. Casi todo el mundo hace el tercero primero, que es exactamente lo que duplica el ruido en lugar del alcance.",
      "Las cifras que aparecen aquí son de cuentas que gestiono personalmente y son orgánicas, sin publicidad detrás: +250 % en un mes en Camping Collvert, +62 % en Camping Puzol, ×6 en Camping Victòria y 2,6 millones de visualizaciones en un mes en Reino Selva. Están con nombre de cliente a propósito, porque es la comprobación que pido a cualquier agencia.",
    ],
    path: [
      {
        decision: "Qué incluye realmente el servicio y qué no",
        slug: "agencia-gestion-redes-sociales-barcelona",
        label: "Qué hace una agencia de redes",
      },
      {
        decision: "Quién produce de verdad en Barcelona",
        slug: "mejores-agencias-redes-sociales-barcelona",
        label: "Ranking de agencias de redes",
      },
      {
        decision: "Cómo crecer sin pagar publicidad",
        slug: "crecer-en-instagram-sin-pagar-publicidad",
        label: "Crecimiento orgánico en Instagram",
      },
      {
        decision: "Cómo convertirlo en un sistema que sostenga tu equipo",
        slug: "mejor-agencia-estrategia-contenido-barcelona",
        label: "Estrategia de contenido",
      },
      {
        decision: "Si tu negocio es de temporada",
        slug: "marketing-digital-campings-turismo-cataluna",
        label: "Campings y turismo",
      },
    ],
  },
  {
    tag: "diseno-web",
    label: "Diseño web",
    title: "Diseño y desarrollo web",
    description:
      "Qué debe incluir un proyecto web sí o sí: rendimiento medido en móvil, SEO de base, textos escritos para convertir y propiedad del código.",
    intro:
      "Qué separa una web que convierte de una web bonita, y qué tiene que estar por escrito antes de firmar.",
    overview: [],
    path: [],
  },
  {
    tag: "turismo",
    label: "Turismo y campings",
    title: "Marketing para campings, hoteles y turismo",
    description:
      "Qué funciona en marketing digital para campings, hoteles y turismo en Cataluña: formato, frecuencia, estacionalidad y las cifras de tres campings reales.",
    intro:
      "Estacionalidad, formato y frecuencia en el sector donde más cuentas he gestionado, con los números encima de la mesa.",
    overview: [],
    path: [],
  },
];

/** Human labels for every tag in use, hub or not. Feeds chips and breadcrumbs. */
export const TAG_LABELS: Record<string, string> = {
  "marketing-digital": "Marketing digital",
  seo: "SEO",
  publicidad: "Publicidad online",
  "redes-sociales": "Redes sociales",
  "diseno-web": "Diseño web",
  turismo: "Turismo y campings",
  "google-ads": "Google Ads",
  "meta-ads": "Meta Ads",
  "estrategia-contenido": "Estrategia de contenido",
  "negocios-locales": "Negocios locales",
  barcelona: "Barcelona",
  cataluna: "Cataluña",
  espana: "España",
  ranking: "Ranking",
  publiqo: "Publiqo",
  pymes: "Pymes",
  auditoria: "Auditoría",
  agencias: "Elegir agencia",
};

export function postsByTopic(posts: PostMeta[], tag: string): PostMeta[] {
  return posts.filter((post) => post.tags?.includes(tag));
}

/** Only hubs that clear the threshold get rendered, linked or put in a sitemap. */
export function activeTopics(posts: PostMeta[]): (Topic & { count: number })[] {
  return TOPICS.map((topic) => ({
    ...topic,
    count: postsByTopic(posts, topic.tag).length,
  })).filter((topic) => topic.count >= MIN_POSTS_FOR_HUB);
}

/** Resolves a tag to its hub, but only if that hub actually has a page. */
export function getTopic(tag: string, posts?: PostMeta[]): Topic | undefined {
  const topic = TOPICS.find((item) => item.tag === tag);
  if (!topic) return undefined;
  if (!posts) return topic;
  return postsByTopic(posts, tag).length >= MIN_POSTS_FOR_HUB
    ? topic
    : undefined;
}
