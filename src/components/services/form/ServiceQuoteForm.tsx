import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ui } from "../../../i18n/ui";
import type { Locale } from "../../../i18n/ui";
import { getRouteUrl } from "../../../i18n/routes";
import type { Service, ServiceFormField } from "../../../data/services/types";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "../../../lib/whatsapp";
import { ErrorIcon, SuccessIcon, WhatsAppIcon } from "../../ui/icons";
import ServiceFormSelect from "./ServiceFormSelect";

const EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env
  .PUBLIC_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY as string;

type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  service: Service;
  lang: Locale;
}

const inputAttrsByField: Record<
  string,
  { type: string; autoComplete: string }
> = {
  name: { type: "text", autoComplete: "name" },
  email: { type: "email", autoComplete: "email" },
  phone: { type: "tel", autoComplete: "tel" },
};

const ServiceQuoteForm = ({ service, lang }: Props) => {
  const t = (key: string) =>
    (ui[lang] as Record<string, string>)[key] ??
    (ui["en"] as Record<string, string>)[key] ??
    key;

  const nameField: ServiceFormField = {
    name: "name",
    label: { en: "Name", es: "Nombre" },
    type: "text",
    required: true,
  };
  const emailField: ServiceFormField = {
    name: "email",
    label: { en: "Email", es: "Correo electrónico" },
    type: "text",
    required: true,
  };
  const phoneField: ServiceFormField = {
    name: "phone",
    label: {
      en: t("service.page.form.phone.label"),
      es: t("service.page.form.phone.label"),
    },
    type: "text",
  };
  const budgetField: ServiceFormField = {
    name: "budget",
    label: {
      en: t("service.page.form.budget.label"),
      es: t("service.page.form.budget.label"),
    },
    type: "select",
    placeholder: {
      en: t("service.page.form.budget.placeholder"),
      es: t("service.page.form.budget.placeholder"),
    },
    options: [
      ...service.budgetOptions,
      {
        value: "unsure",
        label: {
          en: t("service.page.form.budget.unsure"),
          es: t("service.page.form.budget.unsure"),
        },
      },
    ],
  };
  const timelineField: ServiceFormField = {
    name: "timeline",
    label: {
      en: t("service.page.form.timeline.label"),
      es: t("service.page.form.timeline.label"),
    },
    type: "select",
    placeholder: {
      en: t("service.page.form.timeline.placeholder"),
      es: t("service.page.form.timeline.placeholder"),
    },
    options: [
      {
        value: "asap",
        label: {
          en: t("service.page.form.timeline.asap"),
          es: t("service.page.form.timeline.asap"),
        },
      },
      ...service.timelineOptions,
      {
        value: "flexible",
        label: {
          en: t("service.page.form.timeline.flexible"),
          es: t("service.page.form.timeline.flexible"),
        },
      },
    ],
  };
  const messageField: ServiceFormField = {
    name: "message",
    label: {
      en: t("service.page.form.message.label"),
      es: t("service.page.form.message.label"),
    },
    type: "textarea",
    required: true,
    placeholder: service.messagePlaceholder,
  };

  const rows: ServiceFormField[][] = [
    [nameField],
    [emailField, phoneField],
    [budgetField, timelineField],
    [messageField],
  ];
  const fields: ServiceFormField[] = rows.flat();

  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.name, ""])),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // Submitting swaps the (tall) form for a much shorter success card, or
  // adds an error banner below the fields — either way the old scroll
  // position no longer lands on the message, so bring it into view.
  useEffect(() => {
    if (status === "sent") {
      successRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (status === "error") {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [status]);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!values.name.trim()) errs.name = t("drawer.error.name.required");
    if (!values.email.trim()) {
      errs.email = t("drawer.error.email.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = t("drawer.error.email.invalid");
    }
    fields.forEach((field) => {
      if (field.name === "name" || field.name === "email") return;
      if (field.required && !values[field.name]?.trim()) {
        errs[field.name] = t("review.error.required");
      }
    });
    return errs;
  };

  const fieldLabel = (field: ServiceFormField) => field.label[lang];

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");

    const message = fields
      .filter((field) => field.name !== "name" && field.name !== "email")
      .map((field) => `${fieldLabel(field)}: ${values[field.name] || "-"}`)
      .join("\n");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name,
          from_email: values.email,
          reply_to: values.email,
          service_name: service.card.title[lang],
          message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const handleWhatsAppSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const message = buildWhatsAppMessage(
      service.card.title[lang],
      lang,
      fields.map((field) => ({
        label: fieldLabel(field),
        value: values[field.name],
      })),
    );
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  const renderField = (field: ServiceFormField) => {
    const commonProps = {
      id: `service-form-${field.name}`,
      name: field.name,
      value: values[field.name] ?? "",
      "aria-invalid": !!errors[field.name],
    };

    return (
      <div key={field.name} className="space-y-1.5">
        <label
          htmlFor={commonProps.id}
          className="block text-sm font-medium text-slate-300"
        >
          {fieldLabel(field)}
          {field.required && <span className="text-red-400"> *</span>}
        </label>

        {field.type === "textarea" && (
          <textarea
            {...commonProps}
            rows={4}
            placeholder={field.placeholder?.[lang]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={`w-full resize-none rounded-lg border ${errors[field.name] ? "border-red-500" : "border-border"} bg-surface-alt px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-300/30`}
          />
        )}

        {field.type === "select" && (
          <ServiceFormSelect
            id={commonProps.id}
            value={values[field.name] ?? ""}
            options={field.options ?? []}
            placeholder={field.placeholder?.[lang]}
            lang={lang}
            invalid={!!errors[field.name]}
            onChange={(value) => handleChange(field.name, value)}
          />
        )}

        {field.type === "radio" && (
          <div className="flex flex-wrap gap-2">
            {field.options?.map((opt) => (
              <label
                key={opt.value}
                className={`cursor-pointer rounded-lg border px-3.5 py-2 text-sm transition-all ${
                  values[field.name] === opt.value
                    ? "border-red-600 bg-red-600/10 text-red-300"
                    : "border-border bg-surface-alt text-slate-400 hover:border-border-muted"
                }`}
              >
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={values[field.name] === opt.value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="sr-only"
                />
                {opt.label[lang]}
              </label>
            ))}
          </div>
        )}

        {(field.type === "text" || field.type === "number") && (
          <input
            {...commonProps}
            type={inputAttrsByField[field.name]?.type ?? field.type}
            autoComplete={inputAttrsByField[field.name]?.autoComplete}
            placeholder={field.placeholder?.[lang]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={`w-full rounded-lg border ${errors[field.name] ? "border-red-500" : "border-border"} bg-surface-alt px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-300/30`}
          />
        )}

        {errors[field.name] && (
          <p className="mt-1 text-xs text-red-400">{errors[field.name]}</p>
        )}
      </div>
    );
  };

  const renderRow = (row: ServiceFormField[]) => {
    if (row.length === 1) return renderField(row[0]);
    return (
      <div
        key={row.map((field) => field.name).join("-")}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        {row.map(renderField)}
      </div>
    );
  };

  if (status === "sent") {
    return (
      <section id="service-quote-form" className="px-4 py-20 sm:px-6 lg:px-8">
        <div
          ref={successRef}
          className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-6 text-center sm:p-10"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/20 text-emerald-400">
            <SuccessIcon />
          </div>
          <h3 className="text-xl font-semibold text-slate-100">
            {t("drawer.success.title")}
          </h3>
          <p className="text-slate-400">{t("drawer.success.body")}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="service-quote-form" className="px-4 py-20 sm:px-6 lg:px-8 bg-surface-alt">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center" data-scroll-animate="up">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-alt px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-400">
            <span
              className="inline-flex [&_svg]:h-3.5 [&_svg]:w-3.5"
              dangerouslySetInnerHTML={{ __html: service.icon }}
            />
            {service.card.title[lang]}
          </span>
          <h2 className="mb-3 text-3xl font-bold text-slate-100 sm:text-4xl">
            {t("service.page.form.heading")}
          </h2>
          <p className="text-slate-400">{t("service.page.form.intro")}</p>
        </div>

        <form
          onSubmit={handleEmailSubmit}
          noValidate
          data-scroll-animate="scale"
          className="space-y-5 rounded-2xl border border-border bg-surface p-6 sm:p-8"
        >
          {rows.map(renderRow)}

          {status === "error" && (
            <div
              ref={errorRef}
              className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3"
            >
              <ErrorIcon />
              <p className="text-sm text-red-400">{t("drawer.error")}</p>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={status === "sending"}
              className={`flex-1 cursor-pointer rounded-lg bg-red-600 py-3 text-sm font-semibold text-white transition-all hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20 disabled:cursor-not-allowed disabled:opacity-60 ${status === "sending" ? "animate-pulse" : ""}`}
            >
              {status === "sending"
                ? t("drawer.sending")
                : t("service.page.form.submit.email")}
            </button>
            <button
              type="button"
              onClick={handleWhatsAppSubmit}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-surface py-3 text-sm font-semibold text-slate-300 transition-all hover:border-emerald-500 hover:bg-emerald-600/10 hover:text-emerald-400"
            >
              <WhatsAppIcon />
              {t("service.page.form.submit.whatsapp")}
            </button>
          </div>

          <p className="text-center text-xs text-slate-500">
            {t("form.privacy.notice.prefix")}
            <a
              href={getRouteUrl(lang, "privacyPolicy")}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-slate-600 underline-offset-2 transition-colors hover:text-slate-300"
            >
              {t("form.privacy.notice.link")}
            </a>
            {t("form.privacy.notice.suffix")}
          </p>
        </form>
      </div>
    </section>
  );
};

export default ServiceQuoteForm;
