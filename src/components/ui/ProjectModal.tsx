import { useState } from "react";
import { CodeIcon, ExternalLinkIcon, GithubIcon } from "./project.icons";
import type { Project } from "./project.types";

interface Props {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: Props) => {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const screenshots = project.screenshots ?? [];

  return (
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
          aria-label="Close project details"
          className="rounded-full p-2 text-slate-500 transition-colors hover:bg-red-600/15 hover:text-slate-300 cursor-pointer"
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
      <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        {/* Screenshots */}
        {screenshots.length > 0 ? (
          <div className="mb-10">
            <div className="overflow-hidden rounded-xl border border-[#1a1a1a]">
              <img
                src={screenshots[activeScreenshot]}
                alt={`${project.title} screenshot ${activeScreenshot + 1}`}
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
            </div>
            {screenshots.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {screenshots.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveScreenshot(i)}
                    aria-label={`Screenshot ${i + 1}`}
                    className={`shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                      i === activeScreenshot
                        ? "border-red-500"
                        : "border-[#1a1a1a] hover:border-[#333]"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      className="h-16 w-28 object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-10 flex aspect-video w-full items-center justify-center rounded-xl border border-[#1a1a1a] bg-[#0f0f0f]">
            <div className="text-center text-slate-600">
              <svg
                className="mx-auto mb-2"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <p className="text-sm">No screenshots available</p>
            </div>
          </div>
        )}

        {/* About */}
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
            About the project
          </h3>
          <p className="text-base leading-relaxed text-slate-300">
            {project.longDescription ?? project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-500">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
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
          project.liveUrl) && (
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
                {repo.label ?? "View on GitHub"}
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
                Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
