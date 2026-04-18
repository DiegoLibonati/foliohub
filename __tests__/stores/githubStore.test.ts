import { GitHubStore, gitHubStore } from "@/stores/gitHubStore";
import githubService from "@/services/githubService";

import { mockProfile } from "@tests/__mocks__/profile.mock";
import { mockRepos } from "@tests/__mocks__/repos.mock";

jest.mock("@/services/githubService");

const mockGetRepos = githubService.getRepos as jest.Mock;

describe("githubStore", () => {
  let store: GitHubStore;

  beforeEach(() => {
    store = new GitHubStore({ profile: null, repos: [] });
    mockGetRepos.mockResolvedValue(mockRepos);
  });

  describe("initial state", () => {
    it("should have null profile", () => {
      expect(store.getState().profile).toBeNull();
    });

    it("should have empty repos", () => {
      expect(store.getState().repos).toEqual([]);
    });
  });

  describe("setProfile", () => {
    it("should set the profile and fetch repos when a profile is provided", async () => {
      await store.setProfile(mockProfile);
      const state = store.getState();
      expect(state.profile).toEqual(mockProfile);
      expect(state.repos).toEqual(mockRepos);
    });

    it("should call getRepos with the profile login", async () => {
      await store.setProfile(mockProfile);
      expect(mockGetRepos).toHaveBeenCalledWith(mockProfile.login);
    });

    it("should set profile to null and repos to empty when null is passed", async () => {
      await store.setProfile(mockProfile);
      await store.setProfile(null);
      const state = store.getState();
      expect(state.profile).toBeNull();
      expect(state.repos).toEqual([]);
    });

    it("should not call getRepos when profile is null", async () => {
      await store.setProfile(null);
      expect(mockGetRepos).not.toHaveBeenCalled();
    });

    it("should notify profile subscribers when the profile changes", async () => {
      const mockProfileListener = jest.fn();
      store.subscribe("profile", mockProfileListener);
      await store.setProfile(mockProfile);
      expect(mockProfileListener).toHaveBeenCalledWith(mockProfile);
    });

    it("should notify repos subscribers when repos change", async () => {
      const mockReposListener = jest.fn();
      store.subscribe("repos", mockReposListener);
      await store.setProfile(mockProfile);
      expect(mockReposListener).toHaveBeenCalledWith(mockRepos);
    });

    it("should notify profile subscribers with null when null is passed", async () => {
      await store.setProfile(mockProfile);
      const mockProfileListener = jest.fn();
      store.subscribe("profile", mockProfileListener);
      await store.setProfile(null);
      expect(mockProfileListener).toHaveBeenCalledWith(null);
    });
  });

  describe("gitHubStore singleton", () => {
    it("should be an instance of GitHubStore", () => {
      expect(gitHubStore).toBeInstanceOf(GitHubStore);
    });

    it("should expose a getState method", () => {
      expect(typeof gitHubStore.getState).toBe("function");
    });

    it("should expose a setState method", () => {
      expect(typeof gitHubStore.setState).toBe("function");
    });

    it("should expose a subscribe method", () => {
      expect(typeof gitHubStore.subscribe).toBe("function");
    });
  });
});
