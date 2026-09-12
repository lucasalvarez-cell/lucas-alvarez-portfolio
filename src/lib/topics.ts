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
    overview: [
      "Una web bonita que no convierte es un gasto con buen aspecto. La diferencia entre las dos casi nunca está en el diseño: está en si alguien decidió, página por página, qué queremos que haga quien llega ahí, y si el resultado carga rápido en el móvil de alguien que va en el metro.",
      "Los tres números que deciden un proyecto web se pueden pedir antes de firmar y casi nadie los pide: cuánto tarda en cargar medido en un móvil real, quién se queda el código y el dominio si dejáis de trabajar juntos, y qué pasa con las URLs antiguas el día del lanzamiento. Las tres respuestas caben en un correo y las tres cuestan dinero si llegan tarde.",
      "Estas guías están escritas para que puedas juzgar un presupuesto sin saber programar. Lo que no vas a encontrar aquí es una comparativa de gestores de contenido en abstracto: la pregunta útil no es cuál es mejor, es cuál te deja mantener la web tú mismo dentro de dos años.",
    ],
    path: [
      {
        decision: "Cuánto debería costar, y qué encarece un presupuesto",
        slug: "cuanto-cuesta-una-pagina-web",
        label: "Cuánto cuesta una página web",
      },
      {
        decision: "Si te sirve una plantilla o necesitas algo a medida",
        slug: "wordpress-vs-web-a-medida",
        label: "WordPress o web a medida",
      },
      {
        decision: "Qué se mide de verdad cuando se habla de velocidad",
        slug: "que-es-core-web-vitals",
        label: "Qué son los Core Web Vitals",
      },
      {
        decision: "Antes de rehacer una web que ya tiene posiciones",
        slug: "como-migrar-una-web-sin-perder-posiciones",
        label: "Migrar sin perder posiciones",
      },
      {
        decision: "Qué tiene que hacer la página donde aterriza una campaña",
        slug: "que-es-una-landing-page",
        label: "Qué es una landing page",
      },
    ],
  },
  {
    tag: "turismo",
    label: "Turismo y campings",
    title: "Guías de marketing para campings, hoteles y turismo",
    description:
      "Estacionalidad, formato y frecuencia en campings, hoteles y alojamientos: qué publicar cada mes y las cifras de tres campings que gestiono.",
    intro:
      "Estacionalidad, formato y frecuencia en el sector donde más cuentas he gestionado, con los números encima de la mesa.",
    overview: [
      "El turismo de temporada tiene un problema de calendario antes que un problema de contenido. Casi todos los alojamientos encienden las redes en mayo, publican a diario en agosto y desaparecen en septiembre, que es exactamente al revés de como funciona el canal: en julio ya has vendido o ya no has vendido.",
      "El segundo problema es de formato. Un catálogo de instalaciones (la piscina vacía, el bungalow recién hecho, el cartel de la entrada) le habla a alguien que ya ha decidido venir. Quien todavía no sabe que existes no está buscando una parcela: está imaginando un fin de semana, y eso se enseña con la escena, no con el inventario.",
      "Las cifras que aparecen en estos artículos son de tres campings cuyas cuentas gestiono, todas orgánicas: +250 % de visualizaciones en un mes en Camping Collvert, +62 % en Camping Puzol y ×6 en Camping Victòria. En los tres el cambio fue de formato, y solo en uno se tocó la frecuencia, al final.",
    ],
    path: [
      {
        decision: "Cuándo trabajar el contenido para notarlo el verano siguiente",
        slug: "como-llenar-camping-temporada-baja",
        label: "Llenar en temporada baja",
      },
      {
        decision: "Qué grabar y en qué orden publicarlo",
        slug: "que-publicar-instagram-camping",
        label: "30 días de contenido",
      },
      {
        decision: "Cómo bajar la comisión de los portales",
        slug: "conseguir-reservas-directas-sin-booking",
        label: "Reservas directas",
      },
      {
        decision: "El método completo, con los tres casos",
        slug: "marketing-digital-campings-turismo-cataluna",
        label: "Marketing para campings",
      },
    ],
  },
  {
    tag: "marca-personal",
    label: "Marca personal",
    title: "Marca personal y crecimiento orgánico",
    description:
      "Cómo se construye una audiencia propia: encontrar el formato, escribir el gancho y saber cuándo un perfil está listo para monetizar.",
    intro:
      "El sistema que probé en mi propia cuenta antes de aplicarlo a las de nadie más.",
    overview: [
      "Todo lo que aplico en cuentas de clientes lo probé antes en la mía. @lucasalvarez.x llegó a 116 mil seguidores y a un acuerdo de embajador con Gymshark, y los canales de YouTube que diseño funcionan con el mismo marco: estructura fija, gancho escrito aparte y frecuencia al final.",
      "El error que más tiempo cuesta en marca personal es publicar de todo esperando que algo funcione. No solo impide que nadie te reconozca: impide aprender, porque para saber si un formato funciona hace falta repetirlo lo suficiente como para poder comparar.",
      "Y el que más dinero cuesta es confundir tamaño con valor. Un perfil de veinte mil seguidores muy definido cierra acuerdos que uno de doscientos mil sin identidad no cierra, porque una marca no compra alcance: compra acceso a un público que puede describir.",
    ],
    path: [
      {
        decision: "Qué funcionó y qué haría distinto",
        slug: "como-crecer-marca-personal-instagram",
        label: "Crecer una marca personal",
      },
      {
        decision: "Dónde se pierde de verdad la audiencia",
        slug: "primeros-tres-segundos-video",
        label: "El gancho de los 3 segundos",
      },
      {
        decision: "Cuándo estás listo para cobrar",
        slug: "cuantos-seguidores-para-monetizar",
        label: "Monetizar una audiencia",
      },
    ],
  },
  {
    tag: "ia-y-busqueda",
    label: "IA y búsqueda",
    title: "Aparecer en ChatGPT, en las respuestas de IA de Google y en Perplexity",
    description:
      "Cómo se consigue que un asistente de IA cite tu web: qué contenido levantan, qué ignoran, cómo se mide ese tráfico y qué ha cambiado desde 2025.",
    intro:
      "Qué hay que cambiar en una web para que las respuestas generadas la citen, y cómo saber si está funcionando.",
    overview: [
      "En España ya hay un resumen generado por IA en cerca del 41 % de las búsquedas informativas, y buena parte de esas consultas terminan sin que nadie haga clic. Eso no significa que el SEO se haya acabado. Significa que el tráfico informativo barato se está evaporando y el que queda llega más decidido.",
      "Lo que cambia no es la técnica, es qué contenido sobrevive. Un asistente cita párrafos que se sostienen solos, con una cifra y una fuente, colocados arriba. No cita rodeos. La consecuencia práctica es incómoda: el artículo de mil palabras que repite lo que dicen otros diez deja de tener sentido, y el que trae un dato propio vale más que nunca.",
      "Aquí no vas a encontrar trucos. Google ha dicho por escrito que optimizar para sus respuestas generadas sigue siendo SEO, y que ficheros como llms.txt no cambian nada en su buscador. Lo que sí cambia las cosas es la frescura, la estructura y tener algo que no esté ya publicado, y de eso va esta sección.",
    ],
    path: [
      {
        decision: "Entender de qué se habla cuando se dice GEO",
        slug: "que-es-el-geo",
        label: "Qué es el GEO",
      },
      {
        decision: "Aparecer en la respuesta de ChatGPT cuando busca por ti",
        slug: "como-aparecer-en-chatgpt",
        label: "Cómo aparecer en ChatGPT",
      },
      {
        decision: "Entrar en el resumen que Google pone encima de todo",
        slug: "como-aparecer-en-las-respuestas-de-ia-de-google",
        label: "Aparecer en las respuestas de IA de Google",
      },
      {
        decision: "Saber si el tráfico que perdiste se lo llevó la IA",
        slug: "por-que-ha-bajado-mi-trafico-organico",
        label: "Por qué ha bajado tu tráfico",
      },
      {
        decision: "Medir lo que llega desde asistentes, que no aparece solo",
        slug: "como-medir-el-trafico-que-llega-desde-la-ia",
        label: "Medir el tráfico que llega desde la IA",
      },
    ],
  },
  {
    tag: "precios",
    label: "Precios y presupuestos",
    title: "Qué cuesta cada cosa en marketing digital",
    description:
      "Precios reales de una web, una tienda online, el SEO, Google Ads, Meta Ads y un vídeo, con lo que encarece cada partida y cómo comparar dos ofertas.",
    intro:
      "Rangos reales del mercado español, qué mueve el precio arriba y abajo, y cómo leer un presupuesto antes de firmarlo.",
    overview: [
      "Publico precios porque el «precio a medida» obliga al visitante a adivinar, y quien adivina alto se va sin preguntar. Estas guías hacen lo mismo con el resto del mercado: dicen la banda, dicen de qué depende y dicen cuándo un número bajo es una señal de alarma en lugar de una oportunidad.",
      "Casi todos los presupuestos que llegan a comparación son incomparables, porque cada uno mete cosas distintas bajo la misma palabra. La forma de arreglarlo es siempre la misma: pedir el desglose en partidas y comparar partida contra partida. Una cifra única no se puede juzgar, y esa es exactamente la razón por la que se da.",
      "Un aviso que vale para toda la sección: los rangos son del mercado español en 2026 y se mueven por sector y por competencia. Sirven para saber si una oferta está dentro de lo razonable, no para exigir un número concreto a nadie.",
    ],
    path: [
      {
        decision: "Cuánto pedir para una web, y qué la encarece",
        slug: "cuanto-cuesta-una-pagina-web",
        label: "Cuánto cuesta una página web",
      },
      {
        decision: "Qué se paga por posicionar y durante cuánto tiempo",
        slug: "cuanto-cuesta-el-seo-en-espana",
        label: "Cuánto cuesta el SEO",
      },
      {
        decision: "Cuánto poner en campañas y cuánto cuesta gestionarlas",
        slug: "cuanto-cuesta-una-campana-de-google-ads",
        label: "Cuánto cuesta Google Ads",
      },
      {
        decision: "Repartir un presupuesto anual entre canales",
        slug: "presupuesto-de-marketing-digital-para-una-pyme",
        label: "Presupuesto de marketing para una pyme",
      },
      {
        decision: "Saber cuándo es razonable esperar resultados",
        slug: "cuanto-tarda-el-seo-en-dar-resultados",
        label: "Cuánto tarda el SEO",
      },
    ],
  },
  {
    tag: "analitica",
    label: "Analítica y medición",
    title: "Medir lo que hace tu web y tus redes",
    description:
      "Search Console, GA4 y las métricas que de verdad deciden algo: qué mirar, qué ignorar y cómo montar la medición en un negocio pequeño.",
    intro:
      "Qué mirar, cada cuánto y qué decisión sale de cada número. Sin cuadros de mando que nadie abre.",
    overview: [
      "La mayoría de los informes de marketing que veo miden esfuerzo, no resultado. Número de publicaciones, número de palabras, número de impresiones. Ninguno responde a la única pregunta que importa: ¿ha entrado alguien nuevo por aquí y ha hecho algo?",
      "Un negocio pequeño necesita cuatro números, no cuarenta: cuántas páginas tiene indexadas, por qué búsquedas aparece, cuántas visitas acaban en un contacto y de dónde vienen esas visitas. Los cuatro salen gratis de Search Console y de Analytics, y los cuatro se revisan en media hora al mes.",
      "Lo demás es decoración. Si una métrica no cambia lo que vas a hacer el mes que viene, no la mires: te está cobrando atención sin darte nada a cambio.",
    ],
    path: [
      {
        decision: "Saber qué ve Google de tu web, que es el punto de partida",
        slug: "como-usar-google-search-console",
        label: "Cómo usar Search Console",
      },
      {
        decision: "Montar la medición sin liarla con eventos",
        slug: "como-configurar-ga4-en-un-negocio-pequeno",
        label: "Configurar GA4 en un negocio pequeño",
      },
      {
        decision: "Entender la métrica que más se cita y peor se usa",
        slug: "que-es-el-ctr",
        label: "Qué es el CTR",
      },
      {
        decision: "Saber si la publicidad está devolviendo el dinero",
        slug: "que-es-el-roas",
        label: "Qué es el ROAS",
      },
      {
        decision: "Ver cuánto tráfico llega desde asistentes de IA",
        slug: "como-medir-el-trafico-que-llega-desde-la-ia",
        label: "Medir el tráfico que llega desde la IA",
      },
    ],
  },
  {
    tag: "conversion",
    label: "Conversión",
    title: "Convertir visitas en clientes",
    description:
      "Qué es un embudo, qué es una landing page, qué es un lead cualificado y cómo se monta un sistema de captación que no dependa de publicar más.",
    intro:
      "El tramo entre la visita y el contacto, que es donde se pierde casi todo el dinero que se gasta en atraer tráfico.",
    overview: [
      "Meter más tráfico en una web que no convierte solo hace las pérdidas más grandes. Es la conversación más incómoda que tengo con clientes que llegan pidiendo campañas: el problema casi nunca está en la cantidad de visitas, está en lo que pasa en los quince segundos siguientes.",
      "Lo que falla suele ser una de tres cosas, y las tres se comprueban en una tarde: el tráfico aterriza en la home en lugar de en una página que responda a lo que buscaba, no está claro qué se espera que haga el visitante, o la página tarda tanto en el móvil que nadie llega a verla.",
      "Esta sección es el vocabulario y el método de ese tramo. No hay trucos de urgencia falsa ni contadores. Lo que funciona es aburrido: una página por intención, una acción clara, y medir qué porcentaje la hace.",
    ],
    path: [
      {
        decision: "Entender por dónde pasa alguien antes de comprarte",
        slug: "que-es-un-embudo-de-conversion",
        label: "Qué es un embudo de conversión",
      },
      {
        decision: "Saber a qué página mandar el tráfico de una campaña",
        slug: "que-es-una-landing-page",
        label: "Qué es una landing page",
      },
      {
        decision: "Dejar de contar contactos que nunca iban a comprar",
        slug: "que-es-un-lead-cualificado",
        label: "Qué es un lead cualificado",
      },
      {
        decision: "Mejorar lo que ya tienes antes de traer más gente",
        slug: "que-es-el-cro",
        label: "Qué es el CRO",
      },
      {
        decision: "Montar el sistema completo sin herramientas caras",
        slug: "como-montar-un-embudo-de-captacion-simple",
        label: "Montar un embudo simple",
      },
    ],
  },
  {
    tag: "ecommerce",
    label: "Ecommerce",
    title: "Marketing para tiendas online pequeñas",
    description:
      "Qué cuesta montar una tienda online, qué plataforma elegir y cómo se posiciona un ecommerce pequeño frente a marketplaces con mil veces su presupuesto.",
    intro:
      "Lo que cambia cuando el producto se vende desde la web y no desde una llamada.",
    overview: [
      "Una tienda online pequeña no compite con Amazon y no debería intentarlo. Compite por las búsquedas que Amazon no responde bien: la talla rara, el repuesto concreto, el producto con una duda que nadie contesta en la ficha.",
      "Ahí es donde el ecommerce pequeño tiene ventaja real, y es una ventaja de contenido, no de precio. Quien sabe explicar qué diferencia dos modelos gana la búsqueda de quien está decidiendo entre los dos, y esa es la persona que compra.",
      "La parte técnica importa más que en una web de servicios, porque un catálogo genera cientos de URLs solo. Facetas, filtros y variantes son la causa más común de que una tienda tenga mil páginas indexadas y ninguna posición.",
    ],
    path: [
      {
        decision: "Cuánto cuesta de verdad montar y mantener una tienda",
        slug: "cuanto-cuesta-una-tienda-online",
        label: "Cuánto cuesta una tienda online",
      },
      {
        decision: "Elegir plataforma sin quedarte atrapado en ella",
        slug: "shopify-vs-woocommerce",
        label: "Shopify o WooCommerce",
      },
      {
        decision: "Posicionar un catálogo sin generar mil páginas vacías",
        slug: "seo-para-un-ecommerce-pequeno",
        label: "SEO para un ecommerce pequeño",
      },
    ],
  },
  {
    tag: "b2b",
    label: "B2B e industria",
    title: "Marketing digital para empresas que venden a empresas",
    description:
      "Redes sociales, contenido y captación para industria, asesorías y servicios B2B: ciclos largos, pocos clientes y decisiones que firman varias personas.",
    intro:
      "Lo que cambia cuando tu cliente es una empresa, el ciclo dura meses y la decisión la firman tres personas.",
    overview: [
      "En B2B el número de clientes potenciales es pequeño y cada uno vale mucho. Eso invierte casi todas las reglas del marketing de consumo: el alcance importa poco, la frecuencia importa poco, y lo que importa es que las quince empresas que podrían comprarte sepan quién eres cuando les toque decidir.",
      "El error más caro que veo es medir una cuenta de LinkedIn de industria con las métricas de una cuenta de restaurante. Doscientas visualizaciones de las personas correctas valen más que veinte mil de gente que nunca va a comprar, y ninguna herramienta te va a decir eso: lo tienes que decidir tú antes de empezar.",
      "La otra diferencia es el ciclo. Entre el primer contacto y la firma pueden pasar seis meses, así que el contenido no persigue una venta, sostiene una conversación hasta que llega el momento. Publicar tres veces por semana no acelera nada; estar presente cuando se abre el presupuesto sí.",
    ],
    path: [
      {
        decision: "Qué publicar cuando tu cliente es una fábrica",
        slug: "redes-sociales-para-industria-b2b",
        label: "Redes sociales para industria",
      },
      {
        decision: "En qué red estar, si solo puedes estar en una",
        slug: "linkedin-vs-instagram-para-b2b",
        label: "LinkedIn o Instagram para B2B",
      },
      {
        decision: "Captar clientes en un servicio profesional",
        slug: "marketing-para-asesorias-y-gestorias",
        label: "Marketing para asesorías",
      },
    ],
  },
  {
    tag: "email-marketing",
    label: "Email marketing",
    title: "Email y newsletter para negocios pequeños",
    description:
      "Cuándo una lista de correo rinde más que las redes sociales, qué es un lead magnet y si conviene una newsletter o un blog.",
    intro:
      "El único canal donde la audiencia es tuya y no te la puede quitar un cambio de algoritmo.",
    overview: [
      "Una lista de correo es el único activo digital que no depende de la decisión de una plataforma. El alcance orgánico en redes lleva años bajando y va a seguir bajando, porque las plataformas venden ese alcance. Una dirección de correo no se devalúa por eso.",
      "Dicho eso, no es para todo el mundo. Una lista exige algo que publicar con regularidad y algo que decir que merezca abrirse. Un negocio que no tiene ninguna de las dos cosas monta la lista, la abandona a los dos meses y se queda con mil direcciones que ya no le abren.",
      "La forma de saber si te conviene es anterior a la herramienta: si ahora mismo tuvieras mil correos, ¿qué les mandarías el mes que viene? Si no hay respuesta, el problema no es el email.",
    ],
    path: [
      {
        decision: "Decidir si te conviene la lista o las redes",
        slug: "email-marketing-vs-redes-sociales",
        label: "Email marketing o redes sociales",
      },
      {
        decision: "Conseguir que alguien te deje su correo",
        slug: "que-es-un-lead-magnet",
        label: "Qué es un lead magnet",
      },
      {
        decision: "Elegir dónde publicar lo que escribes",
        slug: "newsletter-vs-blog",
        label: "Newsletter o blog",
      },
    ],
  },
  {
    tag: "salud",
    label: "Clínicas y salud",
    title: "Marketing para clínicas y profesionales sanitarios",
    description:
      "Qué se puede publicar y qué no en el sector salud, cómo captar pacientes sin prometer resultados y qué funciona en Google Ads para clínicas.",
    intro:
      "Un sector donde la mitad de lo que funciona en otros está prohibido, y la otra mitad funciona mejor.",
    overview: [
      "El marketing sanitario tiene una restricción que cambia todo lo demás: no se pueden prometer resultados, y en buena parte de España la publicidad sanitaria está regulada por el colegio profesional correspondiente. Eso descarta de entrada el antes y después sin matices, el testimonio que garantiza un desenlace y casi todo el repertorio del sector estético menos cuidadoso.",
      "La buena noticia es que la restricción empuja hacia lo que mejor funciona de todas formas. Explicar un procedimiento, enseñar la consulta, responder la duda que el paciente no se atreve a preguntar por teléfono. Es contenido que genera confianza y que además cumple, y produce más visitas que cualquier promesa.",
      "El otro factor decisivo es local y no está en las redes: la ficha de Google, las reseñas y la página de cada tratamiento. Un paciente busca «fisioterapeuta cerca de mí» mucho más a menudo que el nombre de tu clínica.",
    ],
    path: [
      {
        decision: "Saber qué se puede publicar sin arriesgar el colegiado",
        slug: "redes-sociales-clinicas-dentales",
        label: "Qué puede publicar una clínica",
      },
      {
        decision: "Captar pacientes con campañas en un sector regulado",
        slug: "google-ads-para-clinicas",
        label: "Google Ads para clínicas",
      },
      {
        decision: "Llenar la agenda de un gabinete pequeño",
        slug: "marketing-para-fisioterapeutas",
        label: "Marketing para fisioterapeutas",
      },
    ],
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
  "marca-personal": "Marca personal",
  hosteleria: "Hostelería",
  salud: "Clínicas y salud",
  deporte: "Gimnasios y deporte",

  /* Added with the 2026 content plan. Kept hand-written rather than derived
     from the slug: deriving would print "ia y busqueda" where this has to say
     "IA y búsqueda". Forgetting one is a build error (see blog-validate.ts),
     which is the trade that makes the manual list safe. */
  "ia-y-busqueda": "IA y búsqueda",
  precios: "Precios y presupuestos",
  analitica: "Analítica y medición",
  conversion: "Conversión",
  ecommerce: "Ecommerce",
  b2b: "B2B e industria",
  "email-marketing": "Email marketing",
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
