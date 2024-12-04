import axios from "axios";

import { Profile } from "../entities/vite-env";

export const getGithubProfile = async (
  profile: string
): Promise<Profile | null> => {
  const request = await axios.get(`/users/${profile}`);

  if (request.status !== 200) return null;

  const response: Profile = await request.data;

  return response;
};
