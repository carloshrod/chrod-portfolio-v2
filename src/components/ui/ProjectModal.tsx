import { useState } from "react";
import {
  CloseIcon,
  CodeIcon,
  ExternalLinkIcon,
  GithubIcon,
  ImagePlaceholderIcon,
  SearchIcon,
} from "./icons";
import type { Project } from "../../types/project";
import { ui } from "../../i18n/ui";
import type { Locale } from "../../i18n/ui";

interface Props {
  project: Project;
  onClose: () => void;
  lang?: Locale;
}

const ProjectModal = ({ project, onClose, lang = "en" }: Props) => {
  const t = (key: string) =>
    (ui[lang] as Record<string, string>)[key] ??
    (ui["en"] as Record<string, string>)[key] ??
    key;

  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const screenshots = project.screenshots ?? [];

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#080808]"
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#1a1a1a] bg-[#080808]/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-600/15 text-red-400">
              <CodeIcon />
            </div>
            <h2
              id="modal-project-title"
              className="text-xl font-bold text-slate-100"
            >
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("modal.close")}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-border hover:text-slate-200 cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
          {/* Two-column layout */}
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {/* Left column: screenshot + tech stack + links */}
            <div className="flex w-full shrink-0 flex-col gap-6 md:sticky md:top-18.25 md:w-[42%] md:self-start">
              {/* Screenshot */}
              {screenshots.length > 0 ? (
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setZoomedImage(screenshots[activeScreenshot])
                    }
                    aria-label={t("modal.zoom")}
                    className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-[#1a1a1a]"
                  >
                    <img
                      src={screenshots[activeScreenshot]}
                      alt={`${project.title} screenshot ${activeScreenshot + 1}`}
                      width={800}
                      height={450}
                      className="w-full object-contain max-h-72 bg-[#0a0a0a] transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30"
                      aria-hidden="true"
                    >
                      <span className="rounded-full bg-black/60 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <SearchIcon />
                      </span>
                    </div>
                  </button>
                  {screenshots.length > 1 && (
                    <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
                      {screenshots.map((src, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveScreenshot(i)}
                          aria-label={`Screenshot ${i + 1}`}
                          className={`shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                            i === activeScreenshot
                              ? "border-red-500"
                              : "border-[#1a1a1a] hover:border-[#333]"
                          }`}
                        >
                          <img
                            src={src}
                            alt={`Thumbnail ${i + 1}`}
                            width={112}
                            height={63}
                            className="h-12 w-20 object-contain bg-[#0a0a0a]"
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-[#1a1a1a] bg-[#0f0f0f]">
                  <div className="text-center text-slate-600">
                    <ImagePlaceholderIcon />
                    <p className="text-sm">{t("modal.no_screenshots")}</p>
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
                  {t("modal.tech")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-red-600/10 px-3 py-1.5 text-sm font-medium text-red-400 ring-1 ring-red-600/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {((project.githubRepos && project.githubRepos.length > 0) ||
                project.liveUrl ||
                project.websiteUrl) && (
                <div className="flex flex-wrap gap-3">
                  {(project.githubRepos ?? []).map((repo, i) => (
                    <a
                      key={i}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#111] px-4 py-2.5 text-sm font-medium text-slate-300 ring-1 ring-[#222] transition-colors hover:bg-[#161616] hover:text-slate-100"
                    >
                      <GithubIcon />
                      {repo.label ?? t("modal.github.default")}
                    </a>
                  ))}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
                    >
                      <ExternalLinkIcon />
                      {t("modal.live")}
                    </a>
                  )}
                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#111] px-4 py-2.5 text-sm font-medium text-slate-300 ring-1 ring-[#222] transition-colors hover:bg-[#161616] hover:text-slate-100"
                    >
                      <ExternalLinkIcon />
                      {t("modal.website")}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right column: description + key contributions */}
            <div className="flex flex-1 flex-col gap-6">
              {/* Meta info: role, company, year */}
              {(project.role || project.company || project.year) && (
                <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-[#1a1a1a] pb-4 text-sm">
                  {project.role && (
                    <div>
                      <span className="text-slate-500">
                        {t("modal.role")}:{" "}
                      </span>
                      <span className="font-medium text-slate-200">
                        {project.role}
                      </span>
                    </div>
                  )}
                  {project.company && (
                    <div>
                      <span className="text-slate-500">
                        {t("modal.company")}:{" "}
                      </span>
                      <span className="font-medium text-slate-200">
                        {project.company}
                      </span>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <span className="text-slate-500">
                        {t("modal.year")}:{" "}
                      </span>
                      <span className="font-medium text-slate-200">
                        {project.year}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
                  {t("modal.about")}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {project.longDescription ?? project.description}
                </p>
              </div>

              {project.keyContributions &&
                project.keyContributions.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
                      {t("modal.contributions")}
                    </h3>
                    <ul className="space-y-2">
                      {project.keyContributions.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"
                        >
                          <span
                            className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Zoom lightbox */}
      {zoomedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("modal.zoom.label")}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <button
            type="button"
            aria-label={t("modal.zoom.close")}
            className="absolute right-4 top-4 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-[#222] hover:text-slate-200 cursor-pointer"
            onClick={() => setZoomedImage(null)}
          >
            <CloseIcon />
          </button>
          <img
            src={zoomedImage}
            alt="Screenshot zoomed"
            className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
    </>
  );
};

export default ProjectModal;
