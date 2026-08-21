"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";
import type { ServiceOption } from "@/content/servicios";

type Status = "idle" | "loading" | "success" | "error" | "rate-limited";
type FieldErrors = Partial<
  Record<
    "name" | "email" | "phone" | "service" | "message" | "consent" | "form",
    string
  >
>;

const fieldStyles =
  "mt-2 w-full rounded-[var(--radius-card)] border-2 border-light-grey bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-purple focus-visible:ring-2 focus-visible:ring-turquoise";

const labelStyles = "block text-sm font-semibold text-ink";

const errorStyles = "mt-2 text-sm text-error";

/* A native select arrow ignores the border width and radius the rest of the
   fields use, so the control is reset with `appearance-none` and given the
   chevron back as a background image. Inline rather than a Tailwind arbitrary
   value because the data URI carries spaces and quotes, which do not survive
   bracket syntax cleanly. */
const selectChevron = {
  backgroundImage:
    "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%236423cd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m5 8 5 5 5-5'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 1rem center",
  backgroundSize: "1.25rem 1.25rem",
} as const;

export function ContactForm({ services }: { services: ServiceOption[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [receiptSent, setReceiptSent] = useState(false);
  /* Tracked only so the placeholder option can be greyed out while nothing is
     chosen — the value itself is read from `FormData` like every other field. */
  const [service, setService] = useState("");
  /* Fixed once, when the form first renders. The server discards a submission
     that arrives faster than a person could plausibly have typed it. */
  const [renderedAt] = useState(() => Date.now());
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* The form is replaced wholesale on success, so without moving focus a
       screen reader user is left on a control that no longer exists, hears
       nothing, and lands back at the top of the document. */
    if (status === "success") successRef.current?.focus();
  }, [status]);

  /* An error that keeps contradicting the visitor while they fix the field is
     worse than no error at all. */
  function clearError(field: keyof FieldErrors) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Capture the element up front: `currentTarget` is null after the await.
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setErrors({});
    setNotice(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          message: formData.get("message"),
          consent: formData.get("privacy-consent") === "on",
          website: formData.get("website"),
          renderedAt,
        }),
      });

      const result: {
        ok?: boolean;
        errors?: FieldErrors;
        message?: string;
        rateLimited?: boolean;
        receipt?: boolean;
      } = await response.json().catch(() => ({}));

      if (response.ok && result.ok) {
        setReceiptSent(result.receipt === true);
        setStatus("success");
        form.reset();
        return;
      }

      if (response.status === 429) {
        setNotice(result.message ?? null);
        setStatus("rate-limited");
        return;
      }

      if (result.errors) {
        /* Field errors belong under their fields. Showing the generic red
           paragraph as well would just be noise on top of the real answer. */
        setErrors(result.errors);
        setStatus("idle");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="rounded-[var(--radius-card)] border-2 border-turquoise bg-turquoise/15 p-6 text-base text-ink outline-none focus-visible:ring-2 focus-visible:ring-turquoise"
      >
        Mensaje recibido. Te respondo personalmente en menos de 24 horas
        laborables.
        {receiptSent ? " Te he enviado una copia por email." : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot. `hidden` rather than off-screen on purpose: browsers do not
          autofill a display:none field, and a real visitor whose browser helpfully
          filled this in would be silently discarded — a far worse failure than the
          handful of bots that skip hidden inputs. */}
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* The four short answers share two rows instead of taking a line each.
          Six columns rather than two so the split can be uneven where the
          content is: a phone number is a fixed handful of digits, a service
          name is not, so the phone takes a third of its row and the dropdown
          the rest. One column below `sm`, where half a phone screen is not a
          usable field. */}
      <div className="grid gap-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="name" className={labelStyles}>
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            onChange={() => clearError("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={clsx(fieldStyles, errors.name && "border-error")}
          />
          {errors.name ? (
            <p id="name-error" className={errorStyles}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="email" className={labelStyles}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            onChange={() => clearError("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={clsx(fieldStyles, errors.email && "border-error")}
          />
          {errors.email ? (
            <p id="email-error" className={errorStyles}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone" className={labelStyles}>
            Teléfono <span className="font-normal text-ink-soft">(opcional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="600 12 34 56"
            onChange={() => clearError("phone")}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={clsx(fieldStyles, errors.phone && "border-error")}
          />
          {errors.phone ? (
            <p id="phone-error" className={errorStyles}>
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="service" className={labelStyles}>
            Servicio que te interesa
          </label>
          <select
            id="service"
            name="service"
            required
            value={service}
            onChange={(event) => {
              setService(event.target.value);
              clearError("service");
            }}
            style={selectChevron}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={clsx(
              fieldStyles,
              "appearance-none truncate pr-11",
              service === "" && "text-ink-soft/50",
              errors.service && "border-error",
            )}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {services.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-ink"
              >
                {option.label}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p id="service-error" className={errorStyles}>
              {errors.service}
            </p>
          ) : null}
        </div>
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
          onChange={() => clearError("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={clsx(fieldStyles, errors.message && "border-error")}
        />
        {errors.message ? (
          <p id="message-error" className={errorStyles}>
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Rendered on mount and left empty, not mounted alongside its content: a
          live region that appears at the same moment as its text is not
          reliably announced. */}
      <div role="status" aria-live="polite">
        {status === "error" || status === "rate-limited" ? (
          <p className="text-base text-error">
            {notice ?? "No se ha podido enviar."} Escríbeme directamente a{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-semibold underline underline-offset-4"
            >
              {CONTACT.email}
            </a>
            .
          </p>
        ) : null}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="privacy-consent"
          name="privacy-consent"
          type="checkbox"
          required
          onChange={() => clearError("consent")}
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? "consent-error" : undefined}
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
      {errors.consent ? (
        <p id="consent-error" className={errorStyles}>
          {errors.consent}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando…" : "Enviar"}
      </Button>
    </form>
  );
}
