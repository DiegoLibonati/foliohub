import type { Profile, Repo } from "@/types/app";
import type { GitHubState } from "@/types/states";

import { githubService } from "@/services/githubService";

import { Store } from "@/core/store";

export class GitHubStore extends Store<GitHubState> {
  // constructor(initialState: GitHubState) {
  //   super(initialState);
  // }

  public async setProfile(profile: Profile | null): Promise<void> {
    let repos: Repo[] = [];

    if (profile) repos = await githubService.getRepos(profile.login);

    this.setState({ profile: profile, repos: repos });
  }
}

export const gitHubStore = new GitHubStore({
  profile: null,
  repos: [],
});
