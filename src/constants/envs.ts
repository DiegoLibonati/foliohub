import type { Envs } from "@/types/constants";

const envs: Envs = {
  API_URL: import.meta.env.VITE_API_URL as string,
};

export default envs;
