import { useState, useEffect, useCallback } from "react";
import { ProjectCard } from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "./project.types";
import type { Locale } from "../../i18n/ui";

export type { Project };

export default function ProjectsGrid({
  projects,
  lang = "en",
}: {
  projects: Project[];
  lang?: Locale;
}) {
  const [selected, setSelected] = useState<Project | null>(null);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) {
      document.body.style.overflow = "";
      return;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>
      {selected && (
        <ProjectModal project={selected} onClose={close} lang={lang} />
      )}
    </>
  );
}
