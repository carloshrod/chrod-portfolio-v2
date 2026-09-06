import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, SearchIcon } from "../../ui/icons";
import { useTranslations } from "../../../i18n/utils";
import type { Locale } from "../../../i18n/ui";
import type { Project } from "../../../types/project";

interface Props {
  project: Project;
  lang?: Locale;
}

function PrevArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function NextArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function ProjectGallery({ project, lang = "en" }: Props) {
  const t = useTranslations(lang);
  const screenshots = project.screenshots ?? [];
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  // The zoom overlay is rendered through a portal (see below), which needs
  // a real document — so it only mounts on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (screenshots.length === 0 && !project.videoUrl) return null;

  const hasMultiple = screenshots.length > 1;

  const goPrev = () => {
    setActive((i) => (i - 1 + screenshots.length) % screenshots.length);
  };

  const goNext = () => {
    setActive((i) => (i + 1) % screenshots.length);
  };

  return (
    <div>
      {screenshots.length > 0 && (
        <div>
          <div className="group relative h-70 w-full overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] sm:h-90 md:h-125">
            <button
              type="button"
              onClick={() => setZoomed(true)}
              aria-label={t("project.page.gallery.zoom")}
              className="absolute inset-0 flex cursor-zoom-in items-center justify-center"
            >
              <img
                src={screenshots[active]}
                alt={`${project.title} screenshot ${active + 1}`}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="rounded-full bg-black/60 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <SearchIcon />
                </span>
              </div>
            </button>

            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous screenshot"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80 cursor-pointer"
                >
                  <PrevArrowIcon />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next screenshot"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80 cursor-pointer"
                >
                  <NextArrowIcon />
                </button>
              </>
            )}
          </div>
          {screenshots.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {screenshots.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Screenshot ${i + 1}`}
                  className={`shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-colors ${
                    i === active
                      ? "border-red-500"
                      : "border-[#1a1a1a] hover:border-[#333]"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    className="h-14 w-24 bg-[#0a0a0a] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {project.videoUrl && (
        <div className={screenshots.length > 0 ? "mt-8" : ""}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
            {t("project.page.gallery.video")}
          </h2>
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-[#1a1a1a] bg-black">
            <iframe
              src={project.videoUrl}
              title={`${project.title} demo video`}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Rendered into document.body so the overlay is always positioned
          against the viewport. In place, any ancestor with a transform,
          filter, clip-path or containment would silently become its
          containing block and misplace/clip it — this gallery sits inside
          decorated page wrappers, so that is a live risk. */}
      {mounted &&
        zoomed &&
        screenshots.length > 0 &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("project.page.gallery.zoom.label")}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 cursor-zoom-out"
            onClick={() => setZoomed(false)}
          >
            <button
              type="button"
              aria-label={t("project.page.gallery.zoom.close")}
              className="absolute right-4 top-4 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-[#222] hover:text-slate-200 cursor-pointer"
              onClick={() => setZoomed(false)}
            >
              <CloseIcon />
            </button>

            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  aria-label="Previous screenshot"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80 cursor-pointer sm:left-4"
                >
                  <PrevArrowIcon />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label="Next screenshot"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80 cursor-pointer sm:right-4"
                >
                  <NextArrowIcon />
                </button>
              </>
            )}

            <img
              src={screenshots[active]}
              alt="Screenshot zoomed"
              className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
              loading="lazy"
              decoding="async"
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
