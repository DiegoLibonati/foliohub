import type { Repo } from "@/types/app";

import { mockRepoBase } from "@tests/__mocks__/repoBase.mock";

export const mockRepos: Repo[] = [
  {
    ...mockRepoBase,
    id: 1,
    name: "repo-1",
    full_name: "testuser/repo-1",
    html_url: "https://github.com/testuser/repo-1",
    url: "https://api.github.com/repos/testuser/repo-1",
  },
  {
    ...mockRepoBase,
    id: 2,
    name: "repo-2",
    full_name: "testuser/repo-2",
    html_url: "https://github.com/testuser/repo-2",
    url: "https://api.github.com/repos/testuser/repo-2",
  },
  {
    ...mockRepoBase,
    id: 3,
    name: "repo-3",
    full_name: "testuser/repo-3",
    html_url: "https://github.com/testuser/repo-3",
    url: "https://api.github.com/repos/testuser/repo-3",
  },
];
