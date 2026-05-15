import { http, HttpResponse } from "msw";

import type { Profile, Repo } from "@/types/app";

import githubService from "@/services/githubService";

import { mockProfile } from "@tests/__mocks__/profile.mock";
import { mockMswServer } from "@tests/__mocks__/mswServer.mock";
import { mockRepos } from "@tests/__mocks__/repos.mock";

describe("githubService", () => {
  describe("getProfile", () => {
    it("should return profile data on success", async () => {
      const result: Profile = await githubService.getProfile("testuser");

      expect(result).toEqual(mockProfile);
    });

    it("should request the correct endpoint", async () => {
      let capturedUrl: string | undefined;

      mockMswServer.use(
        http.get("http://localhost/users/:username", ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json(mockProfile);
        })
      );

      await githubService.getProfile("testuser");

      expect(capturedUrl).toBe("http://localhost/users/testuser");
    });

    it("should throw an HTTP error when the server responds with 404", async () => {
      mockMswServer.use(
        http.get("http://localhost/users/:username", () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      await expect(githubService.getProfile("nonexistent")).rejects.toThrow(
        "HTTP error! status: 404 - Request failed with status code 404"
      );
    });

    it("should throw an HTTP error with undefined status on network failure", async () => {
      mockMswServer.use(
        http.get("http://localhost/users/:username", () => {
          return HttpResponse.error();
        })
      );

      await expect(githubService.getProfile("testuser")).rejects.toThrow(
        "HTTP error! status: undefined"
      );
    });
  });

  describe("getRepos", () => {
    it("should return repos data on success", async () => {
      const result: Repo[] = await githubService.getRepos("testuser");

      expect(result).toEqual(mockRepos);
    });

    it("should request the correct endpoint", async () => {
      let capturedUrl: string | undefined;

      mockMswServer.use(
        http.get("http://localhost/users/:username/repos", ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json(mockRepos);
        })
      );

      await githubService.getRepos("testuser");

      expect(capturedUrl).toBe("http://localhost/users/testuser/repos");
    });

    it("should throw an HTTP error when the server responds with 403", async () => {
      mockMswServer.use(
        http.get("http://localhost/users/:username/repos", () => {
          return new HttpResponse(null, { status: 403 });
        })
      );

      await expect(githubService.getRepos("testuser")).rejects.toThrow(
        "HTTP error! status: 403 - Request failed with status code 403"
      );
    });

    it("should throw an HTTP error with undefined status on network failure", async () => {
      mockMswServer.use(
        http.get("http://localhost/users/:username/repos", () => {
          return HttpResponse.error();
        })
      );

      await expect(githubService.getRepos("testuser")).rejects.toThrow(
        "HTTP error! status: undefined"
      );
    });
  });
});
