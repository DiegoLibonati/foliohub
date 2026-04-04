import { GitHubStore } from "@/stores/gitHubStore";

import githubService from "@/services/githubService";

import { mockRepos } from "@tests/__mocks__/repos.mock";
import { mockProfile } from "@tests/__mocks__/profile.mock";

const mockedGithubService = githubService as jest.Mocked<typeof githubService>;

jest.mock("@/services/githubService");

describe("GitHubStore", () => {
  let store: GitHubStore;

  beforeEach(() => {
    store = new GitHubStore({
      profile: null,
      repos: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with null profile and empty repos", () => {
    const state = store.getState();

    expect(state.profile).toBeNull();
    expect(state.repos).toEqual([]);
  });

  it("should set profile and fetch repos", async () => {
    mockedGithubService.getRepos.mockResolvedValue(mockRepos);

    await store.setProfile(mockProfile);

    const state = store.getState();
    expect(state.profile).toEqual(mockProfile);
    expect(state.repos).toEqual(mockRepos);
    expect(mockedGithubService.getRepos).toHaveBeenCalledWith("testuser");
  });

  it("should set profile to null with empty repos", async () => {
    await store.setProfile(null);

    const state = store.getState();
    expect(state.profile).toBeNull();
    expect(state.repos).toEqual([]);
    expect(mockedGithubService.getRepos).not.toHaveBeenCalled();
  });

  it("should notify listeners when profile changes", async () => {
    const mockListener = jest.fn();

    mockedGithubService.getRepos.mockResolvedValue([]);

    store.subscribe("profile", mockListener);
    await store.setProfile(mockProfile);

    expect(mockListener).toHaveBeenCalledWith(mockProfile);
  });
});
