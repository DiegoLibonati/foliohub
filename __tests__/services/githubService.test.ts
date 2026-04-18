import axios from "axios";

import type { Profile, Repo } from "@/types/app";

import githubService from "@/services/githubService";
import { apiUsers } from "@/services/axios";

import { mockProfile } from "@tests/__mocks__/profile.mock";
import { mockRepos } from "@tests/__mocks__/repos.mock";

const mockApiGet = apiUsers.get as jest.Mock;
const mockIsAxiosError = axios.isAxiosError as unknown as jest.Mock;

jest.mock("@/services/axios", () => ({
  apiUsers: {
    get: jest.fn(),
  },
}));

jest.mock("axios");

describe("githubService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProfile", () => {
    it("should return profile data on success", async () => {
      mockApiGet.mockResolvedValue({ data: mockProfile });
      const result: Profile = await githubService.getProfile("testuser");
      expect(result).toEqual(mockProfile);
    });

    it("should call apiUsers.get with the correct path", async () => {
      mockApiGet.mockResolvedValue({ data: mockProfile });
      await githubService.getProfile("testuser");
      expect(mockApiGet).toHaveBeenCalledWith("/testuser");
    });

    it("should throw an HTTP error message when an axios error occurs", async () => {
      const axiosError = { response: { status: 404 }, message: "Not Found" };
      mockApiGet.mockRejectedValue(axiosError);
      mockIsAxiosError.mockReturnValue(true);
      await expect(githubService.getProfile("nonexistent")).rejects.toThrow(
        "HTTP error! status: 404 - Not Found"
      );
    });

    it("should handle missing response status in the axios error", async () => {
      const axiosError = { response: undefined, message: "Request failed" };
      mockApiGet.mockRejectedValue(axiosError);
      mockIsAxiosError.mockReturnValue(true);
      await expect(githubService.getProfile("testuser")).rejects.toThrow(
        "HTTP error! status: undefined - Request failed"
      );
    });

    it("should re-throw non-axios errors as-is", async () => {
      const error = new Error("Network Error");
      mockApiGet.mockRejectedValue(error);
      mockIsAxiosError.mockReturnValue(false);
      await expect(githubService.getProfile("testuser")).rejects.toThrow(
        "Network Error"
      );
    });
  });

  describe("getRepos", () => {
    it("should return repos data on success", async () => {
      mockApiGet.mockResolvedValue({ data: mockRepos });
      const result: Repo[] = await githubService.getRepos("testuser");
      expect(result).toEqual(mockRepos);
    });

    it("should call apiUsers.get with the correct path", async () => {
      mockApiGet.mockResolvedValue({ data: mockRepos });
      await githubService.getRepos("testuser");
      expect(mockApiGet).toHaveBeenCalledWith("/testuser/repos");
    });

    it("should throw an HTTP error message when an axios error occurs", async () => {
      const axiosError = { response: { status: 403 }, message: "Forbidden" };
      mockApiGet.mockRejectedValue(axiosError);
      mockIsAxiosError.mockReturnValue(true);
      await expect(githubService.getRepos("testuser")).rejects.toThrow(
        "HTTP error! status: 403 - Forbidden"
      );
    });

    it("should re-throw non-axios errors as-is", async () => {
      const error = new Error("Unexpected Error");
      mockApiGet.mockRejectedValue(error);
      mockIsAxiosError.mockReturnValue(false);
      await expect(githubService.getRepos("testuser")).rejects.toThrow(
        "Unexpected Error"
      );
    });
  });
});
