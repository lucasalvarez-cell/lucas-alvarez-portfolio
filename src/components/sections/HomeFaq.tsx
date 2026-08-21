import { Section } from "@/components/ui/Section";
import { QuickAnswer } from "@/components/blog/QuickAnswer";
import { FaqSection } from "@/components/blog/FaqSection";

/**
 * The home page had no extractable block of any kind: a hero, a logo strip and
 * three card grids, none of which answers a question completely enough to be
 * quoted. These two do, which is what makes the page citable by an AI answer
 * rather than merely indexable.
 */
export const HOME_QUICK_ANSWER =
  "Lucas Álvarez es social media manager y estratega de contenido en Barcelona. Gestiona redes sociales, estrategia de contenido, SEO, desarrollo web y campañas de Meta Ads y Google Ads para marcas de turismo, hostelería, industria y creadores, desde 290 €. Las cuentas que gestiona subieron entre un 62 % y un 500 % de visualizaciones en su primer mes, sin publicidad de pago.";

export const HOME_FAQ = [
  {
    question: "¿Qué hace un social media manager y en qué se diferencia de un community manager?",
    answer:
      "Un community manager ejecuta: publica, responde y modera. Un social media manager decide qué se publica y por qué: diagnostica la cuenta, define la línea editorial, valida el formato con datos y ajusta la estrategia cada mes. La diferencia práctica es que uno rellena un calendario y el otro responde de que ese calendario funcione.",
  },
  {
    question: "¿Cuánto cuesta contratar a Lucas Álvarez?",
    answer:
      "La gestión de redes sociales empieza en 490 € al mes, el SEO en 390 €, las campañas de Meta Ads y Google Ads en 350 € más inversión, una auditoría completa en 290 € y una web en 1.190 €. Ninguno tiene permanencia y todos los precios están publicados en la página de precios.",
  },
  {
    question: "¿En qué sectores tienes resultados demostrables?",
    answer:
      "Turismo y campings sobre todo: gestiono tres campings de la costa catalana y de la costa valenciana. También hostelería y café, impresión industrial y dos canales de YouTube de naturaleza. Las cifras de cada uno están publicadas con nombre de cliente en la página de casos de éxito.",
  },
  {
    question: "¿Trabajas solo en Barcelona?",
    answer:
      "Barcelona es la base, y trabajo en toda Cataluña y en remoto para el resto de España sin cambio de precio. Varias de las cuentas que gestiono están fuera del área metropolitana; lo único que se acuerda aparte es el desplazamiento cuando hay que grabar en el sitio.",
  },
  {
    question: "¿Quién lleva mi cuenta si te contrato?",
    answer:
      "Yo. No hay un comercial que vende y otra persona que ejecuta. Es la pregunta que más cambia el resultado de contratar a alguien y la que menos se hace, así que va respondida antes de que la hagas.",
  },
  {
    question: "¿En cuánto tiempo se ven resultados?",
    answer:
      "En visualizaciones y alcance, el primer mes: es el plazo en el que subieron las cinco cuentas de la página de resultados. En clientes que llegan por este canal, entre tres y seis meses. En SEO, entre el mes tres y el seis, y no antes: quien te prometa la primera posición en semanas está adivinando.",
  },
  {
    question: "¿Qué relación tienes con Publiqo?",
    answer:
      "Soy cofundador de Publiqo, una agencia de marketing digital de Barcelona, junto a mi socio Martí. Los servicios de esta web los presto yo directamente; Publiqo es el sitio desde el que trabajamos proyectos que necesitan más de una persona.",
  },
];

export function HomeFaq() {
  return (
    <Section tone="grey">
      <div className="max-w-3xl">
        <QuickAnswer
          question="¿Quién es Lucas Álvarez?"
          answer={HOME_QUICK_ANSWER}
          label="En corto"
          id="en-corto"
        />

        <FaqSection items={HOME_FAQ} title="Preguntas frecuentes" />
      </div>
    </Section>
  );
}
