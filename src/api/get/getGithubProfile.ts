import { GetGithubProfileResponse } from "@src/entities/responses";

import { apiUsers } from "@src/api/users";

export const getGithubProfile = async (
  profile: string
): Promise<GetGithubProfileResponse> => {
  try {
    const request = await apiUsers.get(`/${profile}`);

    const response: GetGithubProfileResponse = await request.data;

    return response;
  } catch (error) {
    console.error("Error fetching Profile:", error);
    throw error;
  }
};
