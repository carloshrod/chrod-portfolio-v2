import { createClient } from "@sanity/client";
import type { Project } from "../components/ui/project.types";

const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

export async function getProjects(
  lang: "en" | "es" = "en",
): Promise<Project[]> {
  const isEs = lang === "es";

  const raw = await sanityClient.fetch<SanityProject[]>(
    `
    *[_type == "project"] | order(order asc) {
      "title": select(
        $isEs && defined(titleEs) => titleEs,
        title
      ),
      "description": select(
        $isEs && defined(descriptionEs) => descriptionEs,
        description
      ),
      "longDescription": select(
        $isEs && defined(longDescriptionEs) => longDescriptionEs,
        longDescription
      ),
      "role": select(
        $isEs && defined(roleEs) => roleEs,
        role
      ),
      "company": select(
        $isEs && defined(companyEs) => companyEs,
        company
      ),
      year,
      techStack,
      "keyContributions": select(
        $isEs && defined(keyContributionsEs) => keyContributionsEs,
        keyContributions
      ),
      githubRepos,
      liveUrl,
      websiteUrl,
      "screenshots": screenshots[].asset->url
    }
  `,
    { isEs },
  );

  return raw.map((p: SanityProject) => ({
    title: p.title,
    description: p.description,
    longDescription: p.longDescription,
    role: p.role,
    company: p.company,
    year: p.year,
    techStack: p.techStack ?? [],
    keyContributions: p.keyContributions,
    githubRepos: p.githubRepos,
    liveUrl: p.liveUrl,
    websiteUrl: p.websiteUrl,
    screenshots: p.screenshots ?? [],
  }));
}

interface SanityProject {
  title: string;
  description: string;
  longDescription?: string;
  role?: string;
  company?: string;
  year?: string;
  techStack: string[];
  keyContributions?: string[];
  githubRepos?: { url: string; label?: string }[];
  liveUrl?: string;
  websiteUrl?: string;
  screenshots: string[];
}
