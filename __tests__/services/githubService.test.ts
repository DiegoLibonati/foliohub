import { githubService } from "@/services/githubService";
import { apiUsers } from "@/services/axios";

import { mockRepos } from "@tests/__mocks__/repos.mock";
import { mockProfile } from "@tests/__mocks__/profile.mock";

jest.mock("@/services/axios");

const mockedApiUsers = apiUsers as jest.Mocked<typeof apiUsers>;

describe("githubService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProfile", () => {
    it("should fetch profile data successfully", async () => {
      mockedApiUsers.get.mockResolvedValue({ data: mockProfile });

      const result = await githubService.getProfile("testuser");

      expect(result).toEqual(mockProfile);
      expect(mockedApiUsers.get).toHaveBeenCalledWith("/testuser");
    });

    it("should throw error when profile fetch fails", async () => {
      mockedApiUsers.get.mockRejectedValue(new Error("Network error"));

      await expect(githubService.getProfile("testuser")).rejects.toThrow();
    });
  });

  describe("getRepos", () => {
    it("should fetch repos data successfully", async () => {
      mockedApiUsers.get.mockResolvedValue({ data: mockRepos });

      const result = await githubService.getRepos("testuser");

      expect(result).toEqual(mockRepos);
      expect(mockedApiUsers.get).toHaveBeenCalledWith("/testuser/repos");
    });

    it("should throw error when repos fetch fails", async () => {
      mockedApiUsers.get.mockRejectedValue(new Error("Network error"));

      await expect(githubService.getRepos("testuser")).rejects.toThrow();
    });
  });
});
