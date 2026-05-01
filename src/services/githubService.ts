import axios from "axios";

import type { Profile, Repo } from "@/types/app";
import type { ResponseDirect } from "@/types/responses";

import { apiUsers } from "@/services/axios";

const githubService = {
  getProfile: async (profile: string): Promise<ResponseDirect<Profile>> => {
    try {
      const request = await apiUsers.get<ResponseDirect<Profile>>(
        `/${profile}`
      );
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

  getRepos: async (username: string): Promise<ResponseDirect<Repo[]>> => {
    try {
      const request = await apiUsers.get<ResponseDirect<Repo[]>>(
        `/${username}/repos`
      );
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

export default githubService;
