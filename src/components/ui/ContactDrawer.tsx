import { useState, useEffect } from "react";

type FormState = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

export default function ContactDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

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
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Replace with your actual form endpoint (e.g. Formspree, Resend, etc.)
    await new Promise((res) => setTimeout(res, 1200));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Contact form"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[#0e0e1a] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-100">Get in touch</h2>
          <button
            onClick={close}
            aria-label="Close contact form"
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-border hover:text-slate-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {status === "sent" ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 text-red-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-100">
                Message sent!
              </h3>
              <p className="text-slate-400">
                Thanks for reaching out. I'll get back to you soon.
              </p>
              <button
                onClick={close}
                className="mt-4 rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <p className="text-sm text-slate-400">
                Fill out the form below and I'll respond as soon as possible.
              </p>

              <div className="space-y-1.5">
                <label
                  htmlFor="drawer-name"
                  className="block text-sm font-medium text-slate-300"
                >
                  Name
                </label>
                <input
                  id="drawer-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-border bg-[#171717] px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-red-600 focus:ring-2 focus:ring-red-600/30"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="drawer-email"
                  className="block text-sm font-medium text-slate-300"
                >
                  Email
                </label>
                <input
                  id="drawer-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-border bg-[#171717] px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-red-600 focus:ring-2 focus:ring-red-600/30"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="drawer-message"
                  className="block text-sm font-medium text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="drawer-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea…"
                  className="w-full resize-none rounded-lg border border-border bg-[#171717] px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-red-600 focus:ring-2 focus:ring-red-600/30"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-lg bg-red-600 py-3 text-sm font-semibold text-white transition-all hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
