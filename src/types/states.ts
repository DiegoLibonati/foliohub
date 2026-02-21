import type { Profile, Repo } from "@/types/app";

export interface GitHubState extends Record<string, unknown> {
  profile: Profile | null;
  repos: Repo[];
}
