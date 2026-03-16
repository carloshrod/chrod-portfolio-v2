export interface GitHubRepo {
  url: string;
  label?: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  role?: string;
  company?: string;
  year?: string;
  techStack: string[];
  keyContributions?: string[];
  githubRepos?: GitHubRepo[];
  liveUrl?: string;
  websiteUrl?: string;
  screenshots?: string[];
}
