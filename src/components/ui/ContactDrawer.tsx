import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ui } from "../../i18n/ui";
import type { Locale } from "../../i18n/ui";
import { CloseIcon, ErrorIcon, SuccessIcon } from "./icons";

const EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env
  .PUBLIC_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY as string;

type FormState = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const ContactDrawer = ({ lang = "en" }: { lang?: Locale }) => {
  const t = (key: string) =>
    (ui[lang] as Record<string, string>)[key] ??
    (ui["en"] as Record<string, string>)[key] ??
    key;
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const handler = () => setIsOpen(true);
    document.addEventListener("open-contact-drawer", handler);
    return () => document.removeEventListener("open-contact-drawer", handler);
  }, []);

  // Trap focus & block body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setStatus("idle");
    setErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = t("drawer.error.name.required");
    if (!form.email.trim()) {
      errs.email = t("drawer.error.email.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = t("drawer.error.email.invalid");
    }
    if (!form.message.trim()) {
      errs.message = t("drawer.error.message.required");
    } else if (form.message.trim().length < 10) {
      errs.message = t("drawer.error.message.short");
    }
    return errs;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          reply_to: form.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-60 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("drawer.title")}
        className={`fixed inset-y-0 right-0 z-70 flex w-full max-w-md flex-col bg-[#0e0e1a] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src="/chrod-logo.png"
              alt="chrod logo"
              className="h-8 w-auto"
            />
            <h2 className="text-lg font-semibold text-slate-100">
              {t("drawer.title")}
            </h2>
          </div>
          <button
            onClick={close}
            aria-label={t("drawer.close.label")}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-border hover:text-slate-200 cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {status === "sent" ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/20 text-emerald-400">
                <SuccessIcon />
              </div>
              <h3 className="text-xl font-semibold text-slate-100">
                {t("drawer.success.title")}
              </h3>
              <p className="text-slate-400">{t("drawer.success.body")}</p>
              <button
                onClick={close}
                className="mt-4 rounded-lg bg-surface-alt border border-border px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-surface-raised hover:border-border-muted cursor-pointer"
              >
                {t("drawer.success.close")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <p className="text-sm text-slate-400">{t("drawer.form.intro")}</p>

              <div className="space-y-1.5">
                <label
                  htmlFor="drawer-name"
                  className="block text-sm font-medium text-slate-300"
                >
                  {t("drawer.name.label")}
                </label>
                <input
                  id="drawer-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("drawer.name.placeholder")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "error-name" : undefined}
                  className={`w-full rounded-lg border ${
                    errors.name ? "border-red-500" : "border-border"
                  } bg-surface-alt px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-red-600 focus:ring-2 focus:ring-red-600/30`}
                />
                {errors.name && (
                  <p id="error-name" className="mt-1 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="drawer-email"
                  className="block text-sm font-medium text-slate-300"
                >
                  {t("drawer.email.label")}
                </label>
                <input
                  id="drawer-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("drawer.email.placeholder")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "error-email" : undefined}
                  className={`w-full rounded-lg border ${
                    errors.email ? "border-red-500" : "border-border"
                  } bg-surface-alt px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-red-600 focus:ring-2 focus:ring-red-600/30`}
                />
                {errors.email && (
                  <p id="error-email" className="mt-1 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="drawer-message"
                  className="block text-sm font-medium text-slate-300"
                >
                  {t("drawer.message.label")}
                </label>
                <textarea
                  id="drawer-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("drawer.message.placeholder")}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "error-message" : undefined
                  }
                  className={`w-full resize-none rounded-lg border ${
                    errors.message ? "border-red-500" : "border-border"
                  } bg-surface-alt px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-red-600 focus:ring-2 focus:ring-red-600/30`}
                />
                {errors.message && (
                  <p id="error-message" className="mt-1 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {status === "error" && (
                <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                  <ErrorIcon />
                  <p className="text-sm text-red-400">{t("drawer.error")}</p>
                </div>
              )}

              <button
                id="contact-form-btn"
                type="submit"
                disabled={status === "sending"}
                className={`w-full rounded-lg bg-red-600 py-3 text-sm font-semibold text-white transition-all hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${status === "sending" ? "animate-pulse" : ""}`}
              >
                {status === "sending"
                  ? t("drawer.sending")
                  : t("drawer.submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactDrawer;
