import axios from "axios";

import type { Profile, Repo } from "@/types/app";

import { apiUsers } from "@/services/axios";

export const githubService = {
  getProfile: async (profile: string): Promise<Profile> => {
    try {
      const request = await apiUsers.get<Profile>(`/${profile}`);
      return request.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(
          `HTTP error! status: ${e.response?.status} - ${e.message}`
        );
      }
      throw e;
    }
  },

  getRepos: async (username: string): Promise<Repo[]> => {
    try {
      const request = await apiUsers.get<Repo[]>(`/${username}/repos`);
      return request.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(
          `HTTP error! status: ${e.response?.status} - ${e.message}`
        );
      }
      throw e;
    }
  },
};
