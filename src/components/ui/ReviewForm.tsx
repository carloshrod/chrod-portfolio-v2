import { useState } from "react";
import { useTranslations } from "../../i18n/utils";

interface ReviewFormProps {
  lang: "en" | "es";
  token: string;
}

interface FormState {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  linkedinUrl: string;
}

interface FormErrors {
  name?: string;
  text?: string;
  linkedinUrl?: string;
}

export default function ReviewForm({ lang, token }: ReviewFormProps) {
  const t = useTranslations(lang);

  const [form, setForm] = useState<FormState>({
    name: "",
    role: "",
    company: "",
    text: "",
    rating: 0,
    linkedinUrl: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [hoverRating, setHoverRating] = useState(0);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = t("review.error.required");
    if (!form.text.trim()) e.text = t("review.error.required");
    else if (form.text.trim().length < 50)
      e.text = t("review.error.text.short");
    if (
      form.linkedinUrl.trim() &&
      !form.linkedinUrl.trim().startsWith("https://") &&
      !form.linkedinUrl.trim().startsWith("http://")
    ) {
      e.linkedinUrl = t("review.error.linkedin.invalid");
    }
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          role: form.role || undefined,
          company: form.company || undefined,
          text: form.text,
          rating: form.rating > 0 ? form.rating : undefined,
          linkedinUrl: form.linkedinUrl || undefined,
          lang,
          accessToken: token,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full rounded-lg border bg-surface-alt px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-red-600 focus:ring-2 focus:ring-red-600/30";

  const inputClass = (hasError?: boolean) =>
    `${inputBase} ${hasError ? "border-red-500" : "border-border"}`;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/20 text-emerald-400 mb-6">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-3">
          {t("review.success.heading")}
        </h2>
        <p className="text-slate-400 max-w-sm leading-relaxed">
          {t("review.success.body")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="review-name"
          className="block text-sm font-medium text-slate-300"
        >
          {t("review.form.name")} <span className="text-red-400">*</span>
        </label>
        <input
          id="review-name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder={t("review.form.name.placeholder")}
          maxLength={100}
          autoComplete="name"
          className={inputClass(!!errors.name)}
        />
        {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
      </div>

      {/* Role + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="review-role"
            className="block text-sm font-medium text-slate-300"
          >
            {t("review.form.role")}
          </label>
          <input
            id="review-role"
            type="text"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder={t("review.form.role.placeholder")}
            maxLength={100}
            className={inputClass()}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="review-company"
            className="block text-sm font-medium text-slate-300"
          >
            {t("review.form.company")}
          </label>
          <input
            id="review-company"
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder={t("review.form.company.placeholder")}
            maxLength={100}
            className={inputClass()}
          />
        </div>
      </div>

      {/* Review Text */}
      <div className="space-y-1.5">
        <label
          htmlFor="review-text"
          className="block text-sm font-medium text-slate-300"
        >
          {t("review.form.text")} <span className="text-red-400">*</span>
        </label>
        <textarea
          id="review-text"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          placeholder={t("review.form.text.placeholder")}
          maxLength={2000}
          rows={5}
          className={`${inputClass(!!errors.text)} resize-none`}
        />
        <div className="flex justify-between items-start">
          {errors.text ? (
            <p className="text-xs text-red-400">{errors.text}</p>
          ) : (
            <p className="text-slate-600 text-xs">
              {t("review.form.text.hint")}
            </p>
          )}
          <span className="text-slate-600 text-xs ml-2 shrink-0">
            {form.text.length}/2000
          </span>
        </div>
      </div>

      {/* Star Rating */}
      <div className="space-y-1.5">
        <p className="block text-sm font-medium text-slate-300">
          {t("review.form.rating")}
        </p>
        <div
          className="flex gap-1.5"
          role="radiogroup"
          aria-label={t("review.form.rating")}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() =>
                setForm({ ...form, rating: form.rating === star ? 0 : star })
              }
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`${star} star${star !== 1 ? "s" : ""}`}
              aria-pressed={form.rating >= star}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 cursor-pointer rounded transition-transform hover:scale-110 active:scale-95"
            >
              <svg
                className={`w-7 h-7 transition-colors ${
                  (hoverRating || form.rating) >= star
                    ? "text-yellow-400"
                    : "text-slate-700"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>
        <p className="text-slate-600 text-xs">{t("review.form.rating.hint")}</p>
      </div>

      {/* LinkedIn */}
      <div className="space-y-1.5">
        <label
          htmlFor="review-linkedin"
          className="block text-sm font-medium text-slate-300"
        >
          {t("review.form.linkedin")}
        </label>
        <input
          id="review-linkedin"
          type="url"
          value={form.linkedinUrl}
          onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
          placeholder={t("review.form.linkedin.placeholder")}
          maxLength={300}
          className={inputClass(!!errors.linkedinUrl)}
        />
        {errors.linkedinUrl && (
          <p className="text-xs text-red-400">{errors.linkedinUrl}</p>
        )}
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-400">{t("review.error")}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={`w-full rounded-lg bg-red-600 py-3 text-sm font-semibold text-white transition-all hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
          status === "submitting" ? "animate-pulse" : ""
        }`}
      >
        {status === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {t("review.form.submitting")}
          </span>
        ) : (
          t("review.form.submit")
        )}
      </button>
    </form>
  );
}
