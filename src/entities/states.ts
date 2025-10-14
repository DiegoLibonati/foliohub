import { Profile, Repo } from "@src/entities/app";

export type GitHubState = {
  profile: Profile | null;
  repos: Repo[];
};
