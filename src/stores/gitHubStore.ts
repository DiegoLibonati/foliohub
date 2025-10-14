import { Profile, Repo } from "@src/entities/app";
import { GitHubState } from "@src/entities/states";

import { getGithubProfileRepos } from "@src/api/get/getGithubProfileRepos";

import { Store } from "@src/stores/store";

export class GitHubStore extends Store<GitHubState> {
  constructor(initialState: GitHubState) {
    super(initialState);
  }

  public async setProfile(profile: Profile | null): Promise<void> {
    let repos: Repo[] = [];

    if (profile) repos = await getGithubProfileRepos(profile.login);

    this.setState({ profile: profile, repos: repos });
  }
}

export const gitHubStore = new GitHubStore({
  profile: null,
  repos: [],
});
