import { GetGithubProfileReposResponse } from "@src/entities/responses";

import { apiUsers } from "@src/api/users";

export const getGithubProfileRepos = async (
  username: string
): Promise<GetGithubProfileReposResponse> => {
  try {
    const request = await apiUsers.get(`/${username}/repos`);

    const response: GetGithubProfileReposResponse = await request.data;

    return response;
  } catch (error) {
    console.error("Error fetching Profile repos:", error);
    throw error;
  }
};
