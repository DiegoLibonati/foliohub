import { http, HttpResponse } from "msw";

import { mockProfile } from "@tests/__mocks__/profile.mock";
import { mockRepos } from "@tests/__mocks__/repos.mock";

export const mockMswHandlers = [
  http.get("http://localhost/users/:username", () => {
    return HttpResponse.json(mockProfile);
  }),
  http.get("http://localhost/users/:username/repos", () => {
    return HttpResponse.json(mockRepos);
  }),
];
