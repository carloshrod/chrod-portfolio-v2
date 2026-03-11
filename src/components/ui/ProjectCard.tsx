import { CodeIcon, ExternalLinkIcon, GithubIcon } from "./project.icons";
import type { Project } from "./project.types";

interface Props {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View details of ${project.title}`}
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-red-500/50 hover:border-red-600/40 hover:shadow-xl hover:shadow-red-900/10"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />

      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/15 text-red-400">
          <CodeIcon />
        </div>
        <div className="flex gap-1.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${project.title} GitHub repository`}
              className="rounded-md p-1.5 text-slate-500 transition-colors hover:text-slate-300"
            >
              <GithubIcon />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${project.title} live demo`}
              className="rounded-md p-1.5 text-slate-500 transition-colors hover:text-slate-300"
            >
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-slate-100">
        {project.title}
      </h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-[#13131f] px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-[#1c1c2e]"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-600 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span>View details</span>
      </div>
    </button>
  );
}
