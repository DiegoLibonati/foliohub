import { Profile } from "@src/entities/app";

import { apiUsers } from "@src/api/users";

export const getGithubProfile = async (profile: string): Promise<Profile> => {
  try {
    const request = await apiUsers.get(`/${profile}`);

    const response: Profile = await request.data;

    return response;
  } catch (error) {
    console.error("Error fetching Profile:", error);
    throw error;
  }
};
