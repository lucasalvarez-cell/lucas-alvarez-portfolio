import type { FaqItem } from "@/types/content";
import type { ServicePricing } from "./servicios";

/**
 * Sector landing pages: one service crossed with one industry.
 *
 * These are the pages that can realistically rank first, because almost nobody
 * writes them properly. That only holds while each one is genuinely about its
 * sector — the moment they become a template with the noun swapped, they are
 * doorway pages and Google evaluates the whole directory as such.
 *
 * Two structural guards against that:
 *
 * 1. `dynamicParams = false` on the route. The service × sector matrix is never
 *    generated; only the pairs written here exist.
 * 2. `assertSectorPages()` throws at build time if a page is under 700 words of
 *    body or shares a FAQ answer with another page.
 *
 * Sectors with no case study of their own are legal — `proof: []` renders no
 * proof block — but they still have to say something true and specific about
 * the sector, or they do not belong here.
 */

export type Sector = {
  slug: string;
  /** Title case, for breadcrumbs and cards. */
  name: string;
  /** Lowercase, for use inside generated sentences. */
  label: string;
};

export type SectorSection = {
  title: string;
  /** Paragraphs. Plain strings: no MDX pipeline for five pages of prose. */
  body: string[];
};

export type SectorPage = {
  service: string;
  sector: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  quickAnswer: string;
  sections: SectorSection[];
  faq: FaqItem[];
  /** Case study slugs. `[]` where there is no case in this sector yet. */
  proof: string[];
  /** Blog slugs worth reading next. */
  relatedPosts: string[];
  /** Only when the sector genuinely prices differently. */
  pricing?: ServicePricing;
  updated: string;
};

export const SECTORS: Sector[] = [
  { slug: "campings", name: "Campings", label: "campings" },
  { slug: "hoteles", name: "Hoteles y alojamientos", label: "hoteles" },
  { slug: "restaurantes", name: "Restaurantes", label: "restaurantes" },
  { slug: "industria", name: "Industria y B2B", label: "empresas industriales" },
  {
    slug: "creadores",
    name: "Creadores y marcas personales",
    label: "creadores y marcas personales",
  },
];

export const SECTOR_PAGES: SectorPage[] = [
  /* ------------------------------------------------------------------ */
  {
    service: "gestion-redes-sociales",
    sector: "campings",
    h1: "Gestión de redes sociales para campings",
    metaTitle: "Redes sociales para campings: el sistema",
    metaDescription:
      "Gestión de redes sociales para campings en Cataluña y España. +250 % en Camping Collvert, +62 % en Puzol y x6 en Victòria en su primer mes. Desde 490 € al mes.",
    intro:
      "Gestiono las redes de tres campings de la costa catalana. Los tres subieron en su primer mes, y ninguno lo hizo publicando más.",
    quickAnswer:
      "En un camping, las redes sociales no venden la parcela: venden el plan de fin de semana. Las cuentas que gestiono subieron entre un 62 % y un 250 % de visualizaciones en su primer mes cambiando el formato, no la frecuencia. La audiencia se construye de octubre a marzo, cuando nadie publica, y se convierte en reservas en temporada. Desde 490 € al mes.",
    sections: [
      {
        title: "Por qué no funciona publicar fotos de las instalaciones",
        body: [
          "El contenido que casi todos los campings publican es un catálogo: la piscina vacía a las ocho de la mañana, el bungalow recién hecho, la entrada con el cartel. Son fotos correctas y son invisibles, porque le están hablando a alguien que ya ha decidido venir. La persona que decide dónde va este verano todavía no sabe que existes, y no está buscando una parcela: está imaginando un fin de semana.",
          "Lo que sí para el dedo es la escena. El amanecer desde la parcela con vistas al mar, la cena en la terraza cuando refresca, el niño que aprende a montar en bici en el camino de tierra, el perro que entra al agua. Nada de eso es una instalación: son las tres horas de ese día que alguien quiere tener. La instalación aparece de fondo, y aparece mejor así que fotografiada de frente.",
          "En Camping Collvert ese fue el cambio entero. No se publicó más, se publicó otra cosa: línea editorial fija, un formato repetible y guion escrito para los tres primeros segundos. Las visualizaciones subieron un 250 % en el primer mes de gestión, sin un euro de publicidad.",
        ],
      },
      {
        title: "La audiencia se construye en temporada baja",
        body: [
          "Este es el error que más caro sale en el sector, y es un error de calendario. La mayoría de campings encienden las redes en mayo, publican a diario en julio y agosto y desaparecen en septiembre. Es exactamente al revés de como funciona: en julio ya has vendido o ya no has vendido, y una cuenta que arranca de cero en mayo no tiene alcance acumulado que usar.",
          "El trabajo de verdad es de octubre a marzo. Es cuando no hay ruido, cuando el coste de captar atención es más bajo, y cuando la gente está planificando el verano siguiente sin prisa. Una cuenta que ha estado publicando bien todo el invierno llega a la temporada con audiencia hecha, y entonces cada publicación de junio rinde el triple.",
          "En la práctica esto significa cambiar qué se publica según el mes, no cuánto. En temporada baja funciona el detrás de cámara, la obra del invierno, la naturaleza sin gente, el equipo. En temporada funciona la escena llena. El calendario cambia; el ritmo no.",
        ],
      },
      {
        title: "Tu cliente no es de aquí",
        body: [
          "Un camping de la costa catalana no vive del pueblo de al lado. Vive de Barcelona, de Francia, de Holanda y de Alemania, y eso cambia todo lo que hay que hacer en redes. La geolocalización agresiva en un radio de veinte kilómetros, que es lo que suelen configurar por defecto, es tirar el alcance a la basura.",
          "También cambia el idioma. En las cuentas que gestiono el castellano y el catalán conviven sin problema, pero el contenido que se quiere que salte a público francés o alemán se piensa distinto desde el guion: menos texto en pantalla, más imagen que se entienda sin leer nada. Un vídeo que necesita subtítulos para funcionar es un vídeo que solo funciona en un idioma.",
          "Y cambia el momento. Alguien que va a conducir seiscientos kilómetros decide con semanas de antelación, no el jueves por la tarde. La ventana de decisión de un camping de costa es larga, y eso es una ventaja: te da tiempo a aparecer varias veces antes de que reserven.",
        ],
      },
      {
        title: "La frecuencia va después, nunca antes",
        body: [
          "Camping Victòria es el caso que mejor lo enseña. Multiplicó por seis sus visualizaciones, y la tentación es contar que fue por publicar el doble. Publicó el doble, sí: pasó de un post semanal a dos. Pero eso fue lo último que hicimos, no lo primero.",
          "Primero se identificó qué formato aguantaba la retención con su audiencia real. Hasta que ese dato no estuvo encima de la mesa, la frecuencia se dejó quieta. Duplicar la frecuencia con el formato equivocado no habría cambiado nada: habría duplicado el mismo contenido que ya no funcionaba. Multiplicar por dos lo que sí funciona es lo que multiplica por seis.",
          "Camping Puzol subió un 62 % en su primer mes tocando solo los primeros segundos de cada pieza y el orden del calendario. Ni una publicación más. El sector entero tiene un problema de formato disfrazado de problema de volumen.",
        ],
      },
      {
        title: "Las reseñas y los mensajes son la primera línea comercial",
        body: [
          "En turismo, el mensaje directo no es atención al cliente: es la reserva. Alguien que pregunta por WhatsApp o por Instagram si quedan parcelas la última semana de julio está a un mensaje de reservar, y el tiempo de respuesta decide si lo hace contigo o con el camping de al lado.",
          "Por eso, en las cuentas que gestiono, la parte de mensajes se acuerda desde el principio: qué respondo yo, qué responde recepción y con qué plantillas, para que nadie tarde seis horas en contestar una pregunta de dos líneas. Y por eso las reseñas de Google entran en el trabajo aunque no sean redes sociales: en la decisión de un camping pesan tanto como el contenido.",
        ],
      },
      {
        title: "Todo tiene que aterrizar en algún sitio",
        body: [
          "El alcance que no acaba en una reserva es entretenimiento caro. Un camping con presencia fuerte en redes y un motor de reservas lento, o una web que tarda cuatro segundos en cargar en móvil, está pagando por llevar gente a una puerta cerrada.",
          "Por eso, cuando llevo la cuenta de un camping, miro también dónde aterriza el tráfico: si el enlace del perfil lleva a algo útil, si el proceso de reserva se puede terminar desde el móvil sin frustrarse, y si el que no reserva hoy deja al menos un correo para el invierno. Es la parte menos vistosa del trabajo y la que más reservas directas gana frente a los portales.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Cuánto cuesta llevar las redes sociales de un camping?",
        answer:
          "Desde 490 € al mes, con estrategia, guion, edición, publicación e informe. En un camping el precio se mueve sobre todo por dos cosas: si hay que grabar en el sitio cada mes y a qué distancia está de Barcelona, y si el contenido tiene que funcionar también en francés o alemán para el público internacional.",
      },
      {
        question: "¿Cuándo hay que empezar si quiero notarlo el próximo verano?",
        answer:
          "En octubre. Una cuenta que empieza en mayo llega a julio sin alcance acumulado y compite en el mes más caro del año. Los seis meses de temporada baja son los que construyen la audiencia que después reserva, y son además los meses en los que menos publica la competencia.",
      },
      {
        question: "¿Qué se publica cuando el camping está cerrado?",
        answer:
          "Es cuando mejor funciona el contenido de detrás: la reforma del invierno, el sitio sin gente, la naturaleza alrededor, el equipo preparando la temporada. Ese contenido rinde muy bien porque no lo publica nadie y porque humaniza un negocio que el resto del año se ve solo como instalaciones.",
      },
      {
        question: "¿Sirve esto para un camping pequeño, de treinta parcelas?",
        answer:
          "Sí, y suele funcionar mejor, porque un camping pequeño tiene algo concreto que contar y no compite en volumen. Lo que necesita un camping pequeño es un motivo claro por el que alguien conduzca dos horas hasta ahí, y eso se comunica mucho mejor en vídeo que en un listado de portal.",
      },
      {
        question: "¿Hace falta que salga el propietario en los vídeos?",
        answer:
          "No. En camping, el protagonista es el sitio y la escena: funciona sin que aparezca nadie del equipo. Cuando el propietario o el equipo sí aparecen, ayuda a diferenciar, pero no es un requisito como sí lo es en un negocio de servicios.",
      },
      {
        question: "¿Trabajas con campings fuera de Cataluña?",
        answer:
          "Sí. Camping Puzol está en Valencia y se lleva en remoto sin problema, con sesiones de grabación concentradas. Lo que cambia fuera de Cataluña es la logística de producción y el desplazamiento, no el método.",
      },
      {
        question: "¿Esto sustituye a Booking o a los portales de camping?",
        answer:
          "No los sustituye, pero reduce la dependencia. Cada reserva que entra por tu propio canal es una reserva sin comisión, y el contenido es lo que hace que alguien busque tu nombre en vez de filtrar por precio en un portal. El objetivo realista no es dejar los portales: es dejar de depender solo de ellos.",
      },
    ],
    proof: ["camping-collvert", "camping-puzol", "camping-victoria"],
    relatedPosts: [
      "marketing-digital-campings-turismo-cataluna",
      "mejores-agencias-marketing-campings-turismo",
      "crecer-en-instagram-sin-pagar-publicidad",
    ],
    updated: "2026-08-21",
  },

  /* ------------------------------------------------------------------ */
  {
    service: "gestion-redes-sociales",
    sector: "hoteles",
    h1: "Gestión de redes sociales para hoteles y alojamientos",
    metaTitle: "Redes sociales para hoteles y alojamientos",
    metaDescription:
      "Gestión de redes sociales para hoteles, casas rurales y apartamentos turísticos. Contenido orientado a reserva directa, no a comisión de portal. Desde 490 € al mes.",
    intro:
      "El objetivo en un hotel no es tener seguidores. Es que la próxima reserva entre por tu web y no por un portal que se lleva el 18 %.",
    quickAnswer:
      "En un hotel, las redes sociales sirven para una cosa medible: que la reserva entre por tu canal y no por un portal que cobra entre el 15 % y el 20 % de comisión. Eso se consigue con contenido que muestre la experiencia y el entorno, no las habitaciones, y con un camino claro del perfil a tu motor de reservas. Desde 490 € al mes.",
    sections: [
      {
        title: "La foto de la habitación ya la tiene Booking",
        body: [
          "Un hotel que publica fotos de habitaciones está compitiendo con su propia ficha de Booking, donde esas mismas fotos aparecen junto al precio y al botón de reservar. En ese terreno el portal gana siempre, porque tiene el precio comparado y la fricción resuelta.",
          "Donde no compites con el portal es en todo lo que el portal no puede enseñar: el barrio, el desayuno concreto, la persona de recepción que lleva quince años ahí, el bar de la esquina al que mandas a todo el mundo, la vista a las seis de la tarde. Eso es lo que hace que alguien busque tu nombre en Google en vez de filtrar por precio, y buscar tu nombre es el paso previo a la reserva directa.",
          "Es también el contenido que sostiene un precio más alto. Un hotel indistinguible solo puede competir bajando la tarifa; un hotel con una identidad reconocible compite por otra cosa.",
        ],
      },
      {
        title: "Reserva directa: cómo se mide de verdad",
        body: [
          "El indicador que importa en este sector no es el número de seguidores, es el porcentaje de reservas que entran por canal propio. Es un número que la mayoría de hoteles pequeños no mira mensualmente, y es el único que convierte el trabajo de redes en dinero contable.",
          "La cadena completa es corta: contenido que genera búsqueda de marca, perfil con un enlace que no lleva a la home genérica, motor de reservas que se puede terminar desde el móvil, y una razón concreta para reservar directo (una ventaja pequeña y real, no un descuento que canibalice tu propia tarifa). Si uno de esos cuatro eslabones falla, el alcance se lo queda el portal.",
          "Por eso, cuando llevo la cuenta de un alojamiento, la primera semana no es de contenido: es de mirar dónde se rompe esa cadena. Casi siempre está rota en el tercer eslabón.",
        ],
      },
      {
        title: "Estacionalidad y ventana de decisión",
        body: [
          "Un hotel urbano y una casa rural no tienen el mismo calendario ni de lejos. El urbano vive de estancias cortas decididas con pocos días de antelación y de eventos que llenan la ciudad; la casa rural vive de puentes, de verano y de decisiones tomadas con semanas de margen y en grupo.",
          "Eso cambia el ritmo del contenido. En urbano, publicar alrededor de lo que pasa en la ciudad esa semana es lo que capta a alguien que ya va a venir y todavía no sabe dónde duerme. En rural, el trabajo se parece más al de un camping: construir deseo con antelación y aparecer varias veces antes de la decisión.",
          "Los apartamentos turísticos son un caso aparte, porque la normativa local condiciona qué se puede anunciar y cómo. En Barcelona en particular conviene revisar qué se publica antes de publicarlo.",
        ],
      },
      {
        title: "El entorno vende tanto como el alojamiento",
        body: [
          "El contenido que mejor rinde en alojamiento pequeño casi nunca es sobre el alojamiento. Es sobre el sitio: la ruta que sale de la puerta, el mercado del sábado, dónde se come bien de verdad, qué se ve desde el mirador al que nadie va.",
          "Eso funciona por dos razones. La primera es que es contenido útil, y lo útil se guarda y se comparte, que son las dos señales que más alcance dan hoy. La segunda es que te convierte en la referencia de la zona: quien guarda tu vídeo de la ruta se acuerda de ti cuando decide dónde dormir.",
          "Es también contenido que se produce barato y no caduca. Una guía en vídeo de tu barrio grabada en marzo sigue funcionando en agosto.",
        ],
      },
      {
        title: "Lo que aprendí en tres campings y aplica igual aquí",
        body: [
          "Camping y hotel comparten la parte difícil: alojamiento de temporada que se vende por deseo y se decide con antelación. El método que subió un 250 % las visualizaciones de Camping Collvert en un mes, y por seis las de Camping Victòria, es el mismo que aplico en alojamiento: diagnosticar el formato antes de tocar la frecuencia, escribir los tres primeros segundos aparte, y no subir el ritmo hasta que hay un formato validado con datos.",
          "Lo que cambia entre uno y otro es el pilar de contenido, no el proceso. Un camping vende aire libre y plan familiar; un hotel boutique vende criterio y descanso. Los guiones son distintos, la forma de encontrarlos es idéntica.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Cuánto cuesta gestionar las redes de un hotel?",
        answer:
          "Desde 490 € al mes. En alojamiento, lo que más mueve el precio es si hay que producir contenido en varios idiomas para público internacional y con qué frecuencia hay que grabar en el sitio. Un hotel urbano con material propio constante sale más barato de sostener que una casa rural a dos horas de Barcelona.",
      },
      {
        question: "¿Las redes sociales aumentan la reserva directa?",
        answer:
          "Sí, pero de forma indirecta y solo si el resto del camino funciona. Las redes generan búsqueda de marca; la reserva directa la cierra tu motor de reservas. Si el motor es lento o no se puede terminar desde el móvil, el alcance acaba en el portal igualmente y el trabajo no se nota en la cuenta de resultados.",
      },
      {
        question: "¿Qué se publica si el hotel es pequeño y no tiene nada espectacular?",
        answer:
          "El entorno. La ruta que sale de la puerta, dónde desayunar, qué hacer un martes de lluvia. Ese contenido es útil, se guarda y se comparte, y convierte al alojamiento en la referencia de la zona, que es exactamente lo que hace que alguien busque tu nombre en vez de filtrar por precio.",
      },
      {
        question: "¿Funciona para apartamentos turísticos?",
        answer:
          "Sí, con una advertencia: en algunas ciudades, Barcelona entre ellas, la normativa condiciona qué se puede anunciar y cómo. Antes de montar la estrategia hay que revisar tu situación de licencia, porque afecta a qué se puede decir en la publicación.",
      },
      {
        question: "¿Cuántos idiomas hacen falta?",
        answer:
          "Depende de tu mezcla real de clientes, no de la que te gustaría tener. Si el 60 % viene de Francia, el contenido tiene que estar pensado para que funcione sin leer texto en pantalla. Añadir un idioma no es traducir el pie de foto: es cambiar el guion para que el vídeo se entienda sin sonido y sin subtítulos.",
      },
      {
        question: "¿En cuánto tiempo se nota?",
        answer:
          "En alcance y visualizaciones, el primer mes. En reservas directas, entre tres y seis meses, porque la ventana de decisión en alojamiento es larga: alguien que te descubre en marzo puede reservar en junio. Es un canal que hay que juzgar por temporada, no por semana.",
      },
    ],
    proof: ["camping-collvert", "camping-victoria"],
    relatedPosts: [
      "marketing-digital-campings-turismo-cataluna",
      "mejores-agencias-marketing-campings-turismo",
      "agencia-gestion-redes-sociales-barcelona",
    ],
    updated: "2026-08-21",
  },

  /* ------------------------------------------------------------------ */
  {
    service: "gestion-redes-sociales",
    sector: "restaurantes",
    h1: "Gestión de redes sociales para restaurantes",
    metaTitle: "Redes sociales para restaurantes y hostelería",
    metaDescription:
      "Gestión de redes sociales para restaurantes, bares y cafeterías en Barcelona. Contenido que llena mesas entre semana, no que acumula seguidores. Desde 490 € al mes.",
    intro:
      "Un restaurante no necesita seguidores. Necesita llenar el martes. Son dos objetivos distintos y llevan a contenidos distintos.",
    quickAnswer:
      "En hostelería, el contenido que llena mesas no es el plato bonito: es el plato en movimiento y la escena del local lleno. Instagram y TikTok funcionan como escaparate de decisión inmediata —la gente elige dónde comer con menos de dos horas de antelación— así que lo que importa es aparecer cerca, con hambre y en el momento justo. Desde 490 € al mes.",
    sections: [
      {
        title: "La decisión se toma con dos horas de antelación",
        body: [
          "Es la diferencia estructural entre hostelería y casi cualquier otro sector. Nadie planifica en marzo dónde cenará el 14 de junio. La ventana de decisión de un restaurante se mide en horas, y eso lo cambia todo: la geolocalización sí importa aquí, la hora de publicación importa, y el contenido tiene que provocar hambre inmediata, no admiración diferida.",
          "En la práctica significa publicar cuando la gente decide, no cuando al equipo le viene bien grabar. La franja de la media mañana y la de media tarde son las que capturan la decisión de comida y de cena. Un vídeo excelente publicado a las once de la noche llega tarde a todo el mundo.",
          "También significa que el radio importa. Un restaurante de barrio vive de tres calles a la redonda entre semana y de toda la ciudad el fin de semana, y son dos audiencias que hay que trabajar con contenido distinto.",
        ],
      },
      {
        title: "El plato quieto no funciona; el plato en movimiento sí",
        body: [
          "La foto cenital del plato perfectamente emplatado es el contenido más publicado del sector y uno de los que peor rinde. Está inmóvil, está iluminado como un catálogo y se parece al de otros cuatrocientos restaurantes.",
          "Lo que para el dedo es el movimiento y el sonido: el queso que se estira, el cuchillo que corta y suelta jugo, la salsa que cae, el pan que cruje al partirlo, la plancha. Son medio segundo de vídeo y son la razón por la que alguien decide comer eso hoy. En hostelería, el sonido no es un extra: es la mitad del contenido.",
          "El segundo formato que funciona es el local lleno. Una mesa larga con gente hablando comunica más que cualquier descripción de ambiente, y responde a la pregunta que se hace el que no te conoce: si merece la pena.",
        ],
      },
      {
        title: "La reseña de Google pesa más que el número de seguidores",
        body: [
          "En hostelería local, el mapa gana al feed. Mucha gente decide desde Google Maps, ordenando por valoración y mirando las fotos que suben los clientes. Una cuenta de Instagram impecable con una ficha de Google descuidada es un negocio que está trabajando el canal equivocado.",
          "Por eso, en un restaurante, lo primero que miro no es el perfil social: es la ficha de Google. Fotos actualizadas, horario correcto, carta accesible, y sobre todo un flujo constante de reseñas nuevas, que es la señal que más mueve la posición en el mapa. Diez reseñas de este mes valen más que ochenta de hace tres años.",
          "Las redes sociales y la ficha se alimentan entre sí: el contenido lleva gente al local, y la gente que va deja reseñas si alguien se lo pide bien y en el momento adecuado.",
        ],
      },
      {
        title: "Entre semana y fin de semana son dos negocios",
        body: [
          "Casi ningún restaurante tiene un problema de fin de semana. Tiene un problema de martes. Y el contenido que llena un sábado —el ambiente, la sobremesa larga, el grupo— no es el que llena un martes.",
          "Entre semana se vende otra cosa: rapidez, menú, precio cerrado, sitio tranquilo para comer con un portátil, café decente. Es contenido menos vistoso y más útil, y es el que mueve la caja los cinco días que de verdad deciden el año.",
          "Separar los dos calendarios es una de las decisiones que más rápido se nota, y casi nadie la toma porque el contenido de fin de semana es el que da más 'me gusta'. Los 'me gusta' no pagan la nómina del martes.",
        ],
      },
      {
        title: "El equipo es el activo que nadie usa",
        body: [
          "El contenido con cara funciona en hostelería mejor que en casi cualquier otro sector, y casi nadie lo aprovecha. La persona que lleva veinte años en la cocina, el camarero que se sabe el pedido de los habituales, el jefe de sala que explica por qué ese vino y no otro: eso construye un motivo para elegirte que ningún plato bonito construye.",
          "No hace falta que el dueño sea un creador de contenido. Hace falta un formato fijo y corto en el que salga alguien real diciendo algo concreto, grabado en bloques de una hora al mes. Es exactamente el sistema con el que trabajo las cuentas de Grupo Arnal2 y Arnal2 Coffee.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Cuánto cuesta llevar las redes de un restaurante?",
        answer:
          "Desde 490 € al mes. En hostelería el precio depende sobre todo de la frecuencia de grabación: el contenido caduca rápido y hay que reponerlo, así que un restaurante que necesita presencia diaria pide más producción que un negocio que publica tres veces por semana.",
      },
      {
        question: "¿Instagram o TikTok para un restaurante?",
        answer:
          "Instagram sigue siendo el escaparate donde la gente comprueba si un sitio le encaja antes de ir, y es donde vive tu público local. TikTok da más alcance nuevo y funciona muy bien si tu propuesta es visualmente llamativa. Si solo puedes con uno, empieza por Instagram y replica en TikTok lo que funcione.",
      },
      {
        question: "¿Sirve para llenar entre semana o solo el fin de semana?",
        answer:
          "Sirve para entre semana si el contenido está pensado para eso, que casi nunca lo está. El menú del día, la rapidez y el sitio tranquilo se comunican distinto que el ambiente de un sábado. Separar los dos calendarios es lo que convierte el trabajo en caja los cinco días que deciden el año.",
      },
      {
        question: "¿Y la ficha de Google?",
        answer:
          "Entra en el trabajo, porque en hostelería local pesa más que el feed: mucha gente decide desde el mapa. Fotos al día, horario correcto y un flujo constante de reseñas nuevas mueven la posición más que casi cualquier otra cosa. Diez reseñas de este mes valen más que ochenta de hace tres años.",
      },
      {
        question: "¿Tiene que salir alguien del equipo en cámara?",
        answer:
          "No es obligatorio, pero es la ventaja más desaprovechada del sector. Un formato corto y fijo con alguien real del local diferencia más que cualquier plato bien fotografiado, y se graba en bloques de una hora al mes sin alterar el servicio.",
      },
      {
        question: "¿Trabajas con bares y cafeterías, no solo restaurantes?",
        answer:
          "Sí. Llevo la marca de café Arnal2 Coffee y el Grupo Arnal2, y el método es el mismo: el negocio de barra vive de repetición y de proximidad, así que el contenido tiene que trabajar el hábito y no solo la primera visita.",
      },
    ],
    proof: [],
    relatedPosts: [
      "crecer-en-instagram-sin-pagar-publicidad",
      "agencia-gestion-redes-sociales-barcelona",
      "fundamentos-seo-pequenos-negocios-2026",
    ],
    updated: "2026-08-21",
  },

  /* ------------------------------------------------------------------ */
  {
    service: "gestion-redes-sociales",
    sector: "industria",
    h1: "Gestión de redes sociales para empresas industriales y B2B",
    metaTitle: "Redes sociales para industria y B2B",
    metaDescription:
      "Gestión de redes sociales para empresas industriales y B2B en Barcelona. Cómo se hace contenido de un negocio que vende a otras empresas. Desde 490 € al mes.",
    intro:
      "«Lo nuestro es muy aburrido para redes» es la frase que más veces he oído en industria. Casi siempre es falsa, y suele significar otra cosa.",
    quickAnswer:
      "Una empresa industrial no vende en redes sociales: vende confianza y talento. El contenido de proceso —cómo se fabrica algo, con qué tolerancia, por qué se hace así— rinde muy bien porque casi nadie lo publica, y sirve a la vez para que un cliente potencial te tome en serio y para que alguien quiera trabajar contigo. Desde 490 € al mes.",
    sections: [
      {
        title: "El proceso es el contenido, y casi nadie lo publica",
        body: [
          "La máquina trabajando es hipnótica. El corte, la impresión, la soldadura, el troquel, la pieza que sale con una tolerancia de centésimas: todo eso funciona en vídeo, y funciona precisamente porque casi ninguna empresa industrial lo publica. La saturación de contenido que existe en hostelería o en moda no existe aquí.",
          "Lo que impide publicarlo casi nunca es que sea aburrido. Es que quien está dentro lleva veinte años viéndolo y ha dejado de verlo como algo notable. Es el sesgo más común del sector, y es fácil de corregir: basta con enseñarle el material en bruto a alguien de fuera y ver dónde se queda mirando.",
          "En impresión industrial, que es donde tengo la experiencia directa, ese contenido de proceso es el que mejor rinde con diferencia. No hace falta explicar nada técnico: la pieza saliendo bien es el argumento.",
        ],
      },
      {
        title: "En B2B, las redes no cierran ventas: las preparan",
        body: [
          "El ciclo de compra industrial es largo, hay varias personas decidiendo y casi nunca se firma por un vídeo. Medir una cuenta de industria por conversiones directas es medirla con la regla equivocada, y es la razón por la que muchas empresas concluyen que «esto no sirve para nosotros».",
          "Lo que sí hace el contenido es llegar antes que el comercial. Cuando alguien recibe tu propuesta y busca tu nombre, lo que encuentra decide en qué tono lee esa propuesta. Una empresa con presencia visible y proceso enseñado entra en la conversación con ventaja; una sin rastro digital entra teniendo que demostrar que existe.",
          "El indicador realista en B2B no es el lead directo. Es cuántos de los que llegan a una reunión ya te conocían, y cuánto se acorta la conversación cuando ya te han visto trabajar.",
        ],
      },
      {
        title: "Captar talento es la mitad del retorno",
        body: [
          "Este es el retorno que casi ningún proveedor menciona y que en industria suele ser el más inmediato. Encontrar un buen operario, un técnico de mantenimiento o un comercial con conocimiento del sector es difícil y es caro, y una empresa que no existe en internet parte con desventaja frente a la que sí.",
          "El contenido que enseña la nave, el equipo y cómo se trabaja hace un trabajo de reclutamiento silencioso durante meses. He visto ese efecto notarse antes que cualquier efecto comercial: la primera consecuencia visible de empezar a publicar en una empresa industrial suele ser que llegan currículums mejores.",
          "Es además contenido que no compite con nadie, porque el resto del sector sigue pensando que las redes sociales son para vender.",
        ],
      },
      {
        title: "Dónde publicar cuando tu cliente es una empresa",
        body: [
          "La respuesta obvia es LinkedIn, y es solo media respuesta. LinkedIn es donde está el decisor con su rol profesional puesto, y es el canal natural para el contenido de proceso y de criterio. Pero el decisor de una pyme industrial es una persona que también usa Instagram por la noche, y ahí el contenido de fabricación funciona muy bien con público general.",
          "La estrategia que mejor me ha funcionado es producir una vez y adaptar: la misma grabación de proceso da una pieza para LinkedIn con un enfoque técnico y otra para Instagram con un enfoque de espectáculo. El coste marginal de la segunda es casi cero y el alcance combinado es muy superior.",
          "YouTube entra cuando hay algo que explicar de verdad: una instalación completa, una comparativa de materiales, un caso de cliente. Es contenido que se busca activamente y que sigue trayendo visitas dos años después.",
        ],
      },
      {
        title: "Qué hace falta de tu lado",
        body: [
          "Menos de lo que parece, pero no cero. Necesito acceso a la planta con cierta regularidad —una sesión al mes suele bastar— y una persona de dentro que pueda responder a preguntas técnicas cuando el guion las necesite. Sin eso, el contenido se queda en imágenes bonitas sin criterio, que es lo que produce cualquier proveedor que no entra en la nave.",
          "Lo que no hace falta es que nadie de la empresa se convierta en presentador. En industria, el protagonista puede ser perfectamente la máquina y la pieza.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Sirven las redes sociales para una empresa industrial?",
        answer:
          "Sí, pero no para cerrar ventas directas. Sirven para tres cosas medibles: que un cliente potencial te tome en serio cuando busca tu nombre después de recibir una propuesta, que llegue mejor talento, y que el sector sepa que existes. Medir una cuenta industrial por conversiones directas es medirla con la regla equivocada.",
      },
      {
        question: "¿Y si mi producto es aburrido?",
        answer:
          "Casi nunca lo es; lo que pasa es que llevas veinte años viéndolo. El proceso de fabricación —el corte, la máquina, la pieza saliendo con tolerancia de centésimas— funciona muy bien en vídeo justo porque casi nadie del sector lo publica. La prueba barata es enseñar material en bruto a alguien de fuera y ver dónde se queda mirando.",
      },
      {
        question: "¿LinkedIn o Instagram?",
        answer:
          "Los dos, produciendo una vez y adaptando. LinkedIn es donde está el decisor con el rol profesional puesto y donde funciona el contenido técnico. Instagram alcanza a esa misma persona fuera del horario y funciona muy bien con contenido de fabricación. El coste de hacer la segunda versión es casi cero.",
      },
      {
        question: "¿Cuánto tarda en notarse en B2B?",
        answer:
          "El efecto en reputación se nota en semanas: cambia lo que alguien encuentra cuando busca tu nombre. El efecto comercial tarda un ciclo de compra entero, que en industria pueden ser seis meses o más. Lo que suele notarse primero, y sorprende a casi todo el mundo, es la calidad de los currículums que llegan.",
      },
      {
        question: "¿Hay que enseñar información confidencial?",
        answer:
          "No, y se acuerda antes de grabar qué zonas, clientes y procesos quedan fuera. En la práctica, el contenido que mejor funciona casi nunca es el confidencial: es el gesto, la máquina y el acabado, que no revelan nada de tu know-how ni de tus clientes.",
      },
      {
        question: "¿Cuánto cuesta?",
        answer:
          "Desde 490 € al mes. En industria el factor que más mueve el precio es la frecuencia de acceso a la planta: si puedo grabar material para varias semanas en una sola sesión mensual, el coste de producción se mantiene bajo.",
      },
    ],
    proof: [],
    relatedPosts: [
      "agencia-gestion-redes-sociales-barcelona",
      "crecer-en-instagram-sin-pagar-publicidad",
      "seo-o-google-ads-negocio-local",
    ],
    updated: "2026-08-21",
  },

  /* ------------------------------------------------------------------ */
  {
    service: "estrategia-contenido-crecimiento-organico",
    sector: "creadores",
    h1: "Estrategia de contenido para creadores y marcas personales",
    metaTitle: "Estrategia de contenido para creadores",
    metaDescription:
      "Estrategia de contenido para creadores y marcas personales. El sistema con el que Reino Selva llegó a 2,6 M de visualizaciones en un mes. Desde 990 € el proyecto.",
    intro:
      "Esto es lo único que he hecho conmigo mismo antes de hacerlo con nadie. Mi cuenta y los canales que diseño funcionan con el mismo sistema.",
    quickAnswer:
      "Crecer como creador no depende de publicar más, depende de encontrar el formato que tu audiencia real consume y repetirlo con una estructura fija. Es el sistema con el que Reino Selva pasó de crecimiento plano a 2,6 millones de visualizaciones en un mes, con picos del 1.833 %. Se entrega documentado, desde 990 €.",
    sections: [
      {
        title: "El techo casi nunca es el algoritmo",
        body: [
          "Cuando una cuenta lleva meses plana, la explicación que se repite es que el alcance ha bajado. Casi siempre la explicación real es otra: la cuenta está publicando para una audiencia que no es la que la consume. Se habla a quien uno cree tener delante en vez de a quien está de verdad al otro lado.",
          "Ese diagnóstico se hace con datos, no con opiniones. Retención segundo a segundo, qué piezas se guardan, qué piezas se comparten, de dónde viene el alcance que no es de seguidores. Ahí se ve enseguida si el problema es de gancho, de desarrollo o de tema.",
          "En Reino Selva ese análisis dijo que no fallaba la frecuencia ni la calidad de imagen: fallaban el formato y el guionaje. Se reconstruyó desde cero y el contenido pasó de no moverse a picos del 1.833 % en visualizaciones, con 2,6 millones combinadas en Instagram y Facebook en un solo mes, 1,5 millones de alcance y 105.700 interacciones.",
        ],
      },
      {
        title: "Los tres primeros segundos deciden el resto",
        body: [
          "En vídeo vertical no se pierde a la gente al final: se pierde antes de que empiece nada. Si en el primer segundo no hay una razón para quedarse, el resto del vídeo no existe, por bien montado que esté.",
          "Por eso el gancho se escribe aparte, antes que el guion, y se prueba solo. Lo que funciona casi nunca es una frase ingeniosa: es una promesa concreta, una imagen que no encaja, una pregunta que molesta o el resultado enseñado antes que el proceso. En un canal de naturaleza, el gancho es el animal; en uno de fitness, el antes; en uno de negocio, la cifra.",
          "El error más caro y más frecuente es la introducción. Presentarse, saludar y explicar de qué va el vídeo son tres segundos que cuestan la mitad de la audiencia.",
        ],
      },
      {
        title: "Estructura fija: por qué el sistema gana a la inspiración",
        body: [
          "Un creador que depende de tener una buena idea cada semana tiene un negocio frágil. El crecimiento sostenido viene de lo contrario: una estructura que se repite y dentro de la cual la creatividad se aplica a la variación, no al formato.",
          "En los canales que diseño, el guion, el título y la descripción siguen una plantilla fija. Suena poco creativo y es exactamente al revés: liberar la decisión estructural deja toda la energía para lo que de verdad diferencia una pieza de otra. También hace que la producción sea sostenible, que es lo que separa a quien sigue publicando en el mes catorce de quien lo dejó en el cuatro.",
          "Es el mismo marco que uso en mi propia cuenta y el que documenté para RayWild y para el canal de Zernio, que llegó a 14.500 visualizaciones, 180 horas de reproducción y más de 70 suscriptores en 28 días partiendo de cero.",
        ],
      },
      {
        title: "Frecuencia: solo después de validar",
        body: [
          "El consejo estándar es publicar más. Es un consejo peligroso porque multiplica lo que estés haciendo, y si lo que estás haciendo no funciona, publicar el doble solo te agota antes.",
          "El orden correcto es: diagnosticar, probar dos o tres formatos, mirar los datos, quedarse con el que aguanta y solo entonces subir el ritmo. Es lo que hizo que Camping Victòria multiplicara por seis pasando de uno a dos posts semanales: el salto no vino del volumen, vino de que el volumen se aplicó sobre el formato correcto.",
          "Tres piezas semanales sostenidas seis meses producen mucho más crecimiento que diez piezas en enero y silencio en febrero. La constancia gana, pero la constancia sobre el formato equivocado es solo constancia en el error.",
        ],
      },
      {
        title: "Monetizar: seguidores no es el número que importa",
        body: [
          "Una marca no paga por seguidores, paga por audiencia útil. Un perfil de 20.000 seguidores muy definido en un nicho concreto cierra acuerdos que un perfil de 200.000 sin identidad clara no cierra, porque el segundo no le sirve a nadie para nada específico.",
          "Lo que sí importa es qué se puede decir de tu audiencia con datos: de dónde es, qué edad tiene, qué consume, qué guarda. Esa es la conversación con una marca, y es la que decide el precio de una colaboración.",
          "Mi acuerdo de embajador con Gymshark salió de eso, no del número. La cuenta tenía una identidad clara y una audiencia que a esa marca le encajaba. El número ayuda a que te miren; lo que cierra es la definición.",
        ],
      },
      {
        title: "Qué se entrega exactamente",
        body: [
          "Un documento con los pilares de contenido, los formatos validados con datos de tu propia cuenta, plantillas de guion por pilar, la estructura fija de título y descripción, un calendario tipo realista para tu capacidad, y el cuadro de métricas con los umbrales que indican cuándo un formato se está agotando y qué hacer entonces.",
          "Más una sesión de traspaso grabada, para que el sistema sobreviva a que dejes de mirarlo durante un mes. El objetivo no es un pico: es que dentro de un año sigas creciendo sin necesitarme.",
        ],
      },
    ],
    faq: [
      {
        question: "¿Cuántos seguidores hacen falta para empezar a trabajar la estrategia?",
        answer:
          "Ninguno en concreto, pero sí hace falta contenido publicado con el que diagnosticar. Con menos de veinte o treinta piezas no hay datos de retención suficientes para saber qué funciona, y el trabajo sería adivinar. Si estás empezando de cero, lo sensato es publicar tres meses y después diagnosticar.",
      },
      {
        question: "¿Esto sirve para cualquier nicho?",
        answer:
          "El método sí; los pilares cambian por completo. Lo he aplicado en naturaleza y documental, en fitness y marca personal, en turismo y en impresión industrial. Lo que se traslada de un nicho a otro no es el formato ganador, es la forma de encontrarlo.",
      },
      {
        question: "¿Es lo mismo que llevarme tú la cuenta?",
        answer:
          "No. Aquí entrego el sistema documentado y lo ejecutas tú, que es lo que suele tener sentido para un creador: nadie va a hacer tu contenido personal mejor que tú. Si además quieres que lleve la producción, eso es el servicio de gestión de redes sociales y va aparte.",
      },
      {
        question: "¿Cuánto tarda en verse el crecimiento?",
        answer:
          "El diagnóstico y la validación de formato llevan unas cinco semanas. A partir de ahí, el cambio en visualizaciones suele verse en el primer mes de aplicar el formato ganador, como pasó en Reino Selva. En seguidores tarda más, porque la gente sigue una cuenta después de verla varias veces, no la primera.",
      },
      {
        question: "¿Cuánto cuesta?",
        answer:
          "Desde 990 € el proyecto completo, unas seis semanas, con la documentación entregada en formato editable y una revisión de seguimiento a los dos meses. Si después quieres que ejecute yo, ese importe se descuenta de los tres primeros meses de gestión.",
      },
      {
        question: "¿Puedes ayudarme a conseguir acuerdos con marcas?",
        answer:
          "Puedo ayudarte a estar en condiciones de conseguirlos, que es la parte que depende de ti: identidad definida, audiencia que se puede describir con datos y un formato reconocible. La negociación con la marca no la hago yo, pero el material con el que se negocia sale de este trabajo.",
      },
    ],
    proof: ["reino-selva", "zernio"],
    relatedPosts: [
      "crecer-en-instagram-sin-pagar-publicidad",
      "mejor-agencia-estrategia-contenido-barcelona",
      "agencia-gestion-redes-sociales-barcelona",
    ],
    updated: "2026-08-21",
  },
];

export function getSectorPage(
  service: string,
  sector: string,
): SectorPage | undefined {
  return SECTOR_PAGES.find(
    (page) => page.service === service && page.sector === sector,
  );
}

export function getSectorBySlug(slug: string): Sector | undefined {
  return SECTORS.find((sector) => sector.slug === slug);
}

/** Every sector page that belongs to one service, for the parent's link block. */
export function getSectorPagesForService(service: string): SectorPage[] {
  return SECTOR_PAGES.filter((page) => page.service === service);
}

export function sectorPageWordCount(page: SectorPage): number {
  const text = [
    page.intro,
    page.quickAnswer,
    ...page.sections.flatMap((section) => [section.title, ...section.body]),
    ...page.faq.flatMap((item) => [item.question, item.answer]),
  ].join(" ");

  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Build-time guard against the failure mode these pages invite.
 *
 * Called from `sitemap.ts`, which runs on every build. A sector page that is
 * thin, or that recycles an answer from another page, is a doorway page — and
 * Google judges the pattern across the whole directory, so a handful of weak
 * ones discount the good ones too. Better to fail the build than to publish
 * them.
 */
export function assertSectorPages(): void {
  const seenAnswers = new Map<string, string>();

  for (const page of SECTOR_PAGES) {
    const id = `${page.service}/${page.sector}`;

    if (!getSectorBySlug(page.sector)) {
      throw new Error(`Sector page ${id}: el sector "${page.sector}" no existe.`);
    }

    const words = sectorPageWordCount(page);
    if (words < 700) {
      throw new Error(
        `Sector page ${id}: ${words} palabras. El mínimo son 700 — por debajo de eso es una plantilla rellenada, no una página de sector.`,
      );
    }

    for (const item of page.faq) {
      const previous = seenAnswers.get(item.answer);
      if (previous) {
        throw new Error(
          `Sector page ${id}: la respuesta "${item.question}" es idéntica a la de ${previous}.`,
        );
      }
      seenAnswers.set(item.answer, id);
    }
  }
}
