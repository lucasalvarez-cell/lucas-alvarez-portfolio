"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const fieldStyles =
  "mt-2 w-full rounded-[var(--radius-card)] border-2 border-light-grey bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-purple focus-visible:ring-2 focus-visible:ring-turquoise";

const labelStyles = "block text-sm font-semibold text-ink";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!accessKey) {
      setStatus("error");
      return;
    }

    // Capture the element up front: `currentTarget` is null after the await.
    const form = event.currentTarget;

    setStatus("loading");
    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append("subject", "Nuevo contacto desde lucasalvarez.info");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border-2 border-turquoise bg-turquoise/15 p-6 text-base text-ink">
        Mensaje recibido. Te respondo personalmente en menos de 24 horas
        laborables.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className={labelStyles}>
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={fieldStyles}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelStyles}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={fieldStyles}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelStyles}>
          Tu situación actual
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Cuéntame qué marca es, qué estáis publicando ahora y qué te gustaría conseguir."
          className={fieldStyles}
        />
      </div>

      {status === "error" ? (
        <p className="text-base text-error">
          No se ha podido enviar. Escríbeme directamente a{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="font-semibold underline underline-offset-4"
          >
            {CONTACT.email}
          </a>
          .
        </p>
      ) : null}

      <div className="flex items-start gap-3">
        <input
          id="privacy-consent"
          name="privacy-consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-2 border-light-grey text-purple outline-none focus-visible:ring-2 focus-visible:ring-turquoise"
        />
        <label htmlFor="privacy-consent" className="text-sm text-ink-soft">
          He leído y acepto la{" "}
          <Link
            href="/politica-privacidad"
            className="font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple"
          >
            política de privacidad
          </Link>
          .
        </label>
      </div>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando…" : "Enviar"}
      </Button>
    </form>
  );
}
