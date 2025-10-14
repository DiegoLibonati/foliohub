import { Repo } from "@src/entities/app";

import { apiUsers } from "@src/api/users";

export const getGithubProfileRepos = async (
  username: string
): Promise<Repo[]> => {
  try {
    const request = await apiUsers.get(`/${username}/repos`);

    const response: Repo[] = await request.data;

    return response;
  } catch (error) {
    console.error("Error fetching Profile repos:", error);
    throw error;
  }
};
