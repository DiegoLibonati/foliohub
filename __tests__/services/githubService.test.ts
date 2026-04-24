import { isAxiosError } from "axios";

import type { Profile, Repo } from "@/types/app";

import githubService from "@/services/githubService";

import { apiUsers } from "@/services/axios";

import { mockProfile } from "@tests/__mocks__/profile.mock";
import { mockRepos } from "@tests/__mocks__/repos.mock";

const mockApiGet = jest.mocked(apiUsers.get);
const mockIsAxiosError = jest.mocked(isAxiosError);

jest.mock("axios", () => ({
  ...(jest.requireActual("axios") as unknown as object),
  isAxiosError: jest.fn(),
}));
jest.mock("@/services/axios", () => ({
  apiUsers: {
    get: jest.fn(),
  },
}));

const mockAxiosSuccess = (data: unknown): void => {
  mockApiGet.mockResolvedValue({ data });
};

const mockAxiosError = (status: number | undefined, message: string): void => {
  mockApiGet.mockRejectedValue({
    response: status !== undefined ? { status } : undefined,
    message,
  });
  mockIsAxiosError.mockReturnValue(true);
};

const mockAxiosNetworkError = (message = "Network error"): void => {
  mockApiGet.mockRejectedValue(new Error(message));
  mockIsAxiosError.mockReturnValue(false);
};

describe("githubService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProfile", () => {
    it("should return profile data on success", async () => {
      mockAxiosSuccess(mockProfile);
      const result: Profile = await githubService.getProfile("testuser");
      expect(result).toEqual(mockProfile);
    });

    it("should call apiUsers.get with the correct path", async () => {
      mockAxiosSuccess(mockProfile);
      await githubService.getProfile("testuser");
      expect(mockApiGet).toHaveBeenCalledWith("/testuser");
    });

    it("should throw an HTTP error message when an axios error occurs", async () => {
      mockAxiosError(404, "Not Found");
      await expect(githubService.getProfile("nonexistent")).rejects.toThrow(
        "HTTP error! status: 404 - Not Found"
      );
    });

    it("should handle missing response status in the axios error", async () => {
      mockAxiosError(undefined, "Request failed");
      await expect(githubService.getProfile("testuser")).rejects.toThrow(
        "HTTP error! status: undefined - Request failed"
      );
    });

    it("should re-throw non-axios errors as-is", async () => {
      mockAxiosNetworkError("Network Error");
      await expect(githubService.getProfile("testuser")).rejects.toThrow(
        "Network Error"
      );
    });
  });

  describe("getRepos", () => {
    it("should return repos data on success", async () => {
      mockAxiosSuccess(mockRepos);
      const result: Repo[] = await githubService.getRepos("testuser");
      expect(result).toEqual(mockRepos);
    });

    it("should call apiUsers.get with the correct path", async () => {
      mockAxiosSuccess(mockRepos);
      await githubService.getRepos("testuser");
      expect(mockApiGet).toHaveBeenCalledWith("/testuser/repos");
    });

    it("should throw an HTTP error message when an axios error occurs", async () => {
      mockAxiosError(403, "Forbidden");
      await expect(githubService.getRepos("testuser")).rejects.toThrow(
        "HTTP error! status: 403 - Forbidden"
      );
    });

    it("should re-throw non-axios errors as-is", async () => {
      mockAxiosNetworkError("Unexpected Error");
      await expect(githubService.getRepos("testuser")).rejects.toThrow(
        "Unexpected Error"
      );
    });
  });
});
