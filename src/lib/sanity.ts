import { createClient } from "@sanity/client";
import type { Project } from "../types/project";
import type { Review } from "../types/review";

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

  const raw = await sanityClient.fetch<Project[]>(
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

  return raw.map((p: Project) => ({
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

export async function getReviews(lang: "en" | "es" = "en"): Promise<Review[]> {
  const isEs = lang === "es";

  const raw = await sanityClient.fetch<Review[]>(
    `
    *[_type == "review"] | order(order asc) {
      name,
      "role": select(
        $isEs && defined(roleEs) => roleEs,
        role
      ),
      company,
      avatar,
      "text": select(
        $isEs && defined(textEs) => textEs,
        text
      ),
      source,
      sourceLabel,
      rating,
      sourceUrl,
      linkedinUrl,
      "companyLogo": companyLogo.asset->url
    }
  `,
    { isEs },
  );

  return raw.map((r: Review) => ({
    name: r.name,
    role: r.role ?? "",
    company: r.company ?? "",
    avatar: r.avatar ?? r.name.slice(0, 2).toUpperCase(),
    text: r.text,
    source: r.source,
    sourceLabel: r.sourceLabel,
    rating: r.rating,
    sourceUrl: r.sourceUrl,
    linkedinUrl: r.linkedinUrl,
    companyLogo: r.companyLogo,
  }));
}
