export interface GitHubRepo {
  url: string;
  label?: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubRepos?: GitHubRepo[];
  liveUrl?: string;
  screenshots?: string[];
}
