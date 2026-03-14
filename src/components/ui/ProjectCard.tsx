import { CodeIcon, ExternalLinkIcon, GithubIcon, SearchIcon } from "./icons";
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
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-red-500/50 hover:border-red-600/40"
    >
      {/* Glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(220,38,38,0.07), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/15 text-red-400">
          <CodeIcon />
        </div>
        <div className="flex items-center gap-1.5">
          {(project.githubRepos ?? []).map((repo, i) => (
            <a
              key={i}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={
                repo.label
                  ? `${project.title} ${repo.label} repository`
                  : `${project.title} GitHub repository`
              }
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-slate-500 transition-colors hover:text-slate-300"
            >
              <GithubIcon />
              {repo.label && (
                <span className="text-[10px] font-medium leading-none">
                  {repo.label}
                </span>
              )}
            </a>
          ))}
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
        <SearchIcon />
        <span>View details</span>
      </div>
    </button>
  );
}
