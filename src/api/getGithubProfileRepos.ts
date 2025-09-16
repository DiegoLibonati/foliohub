import axios from "axios";

import { Repo } from "@src/entities/vite-env";

export const getGithubProfileRepos = async (
  username: string
): Promise<Repo[] | null> => {
  const request = await axios.get(`/users/${username}/repos`);

  if (request.status !== 200) return null;

  const response: Repo[] = await request.data;

  return response;
};
