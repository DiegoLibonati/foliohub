import fs from "fs";
import path from "path";

import { Profile, Repo } from "../src/entities/vite-env";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf8"
);

export const OFFICIAL_BODY = INITIAL_HTML.match(
  /<body[^>]*>([\s\S]*?)<\/body>/i
)![1];

export const mockProfileRequest: Profile = {
  login: "DiegoLibonati",
  id: 99032604,
  node_id: "U_kgDOBeceHA",
  avatar_url: "https://avatars.githubusercontent.com/u/99032604?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/DiegoLibonati",
  html_url: "https://github.com/DiegoLibonati",
  followers_url: "https://api.github.com/users/DiegoLibonati/followers",
  following_url:
    "https://api.github.com/users/DiegoLibonati/following{/other_user}",
  gists_url: "https://api.github.com/users/DiegoLibonati/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/DiegoLibonati/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/DiegoLibonati/subscriptions",
  organizations_url: "https://api.github.com/users/DiegoLibonati/orgs",
  repos_url: "https://api.github.com/users/DiegoLibonati/repos",
  events_url: "https://api.github.com/users/DiegoLibonati/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/DiegoLibonati/received_events",
  type: "User",
  user_view_type: "public",
  site_admin: false,
  name: "Diego Martin Libonati",
  blog: "",
  location: "Argentina, CABA",
  bio: "bio",
  public_repos: 72,
  public_gists: 0,
  followers: 6,
  following: 2,
  created_at: "2022-02-04T15:00:09Z",
  updated_at: "2023-02-22T15:27:50Z",
};

export const mockProfileReposRequest: Repo[] = [
  {
    id: 780108466,
    node_id: "R_kgDOLn-Csg",
    name: "CutTube",
    full_name: "DiegoLibonati/CutTube",
    private: false,
    owner: {
      login: "DiegoLibonati",
      id: 99032604,
      node_id: "U_kgDOBeceHA",
      avatar_url: "https://avatars.githubusercontent.com/u/99032604?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/DiegoLibonati",
      html_url: "https://github.com/DiegoLibonati",
      followers_url: "https://api.github.com/users/DiegoLibonati/followers",
      following_url:
        "https://api.github.com/users/DiegoLibonati/following{/other_user}",
      gists_url: "https://api.github.com/users/DiegoLibonati/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/DiegoLibonati/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/DiegoLibonati/subscriptions",
      organizations_url: "https://api.github.com/users/DiegoLibonati/orgs",
      repos_url: "https://api.github.com/users/DiegoLibonati/repos",
      events_url: "https://api.github.com/users/DiegoLibonati/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/DiegoLibonati/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
    },
    html_url: "https://github.com/DiegoLibonati/CutTube",
    description:
      "I made a web application that allows to clip youtube videos through a start and end time, passing a custom clip name and a link from video to clip.",
    fork: false,
    url: "https://api.github.com/repos/DiegoLibonati/CutTube",
    forks_url: "https://api.github.com/repos/DiegoLibonati/CutTube/forks",
    keys_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/keys{/key_id}",
    collaborators_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/collaborators{/collaborator}",
    teams_url: "https://api.github.com/repos/DiegoLibonati/CutTube/teams",
    hooks_url: "https://api.github.com/repos/DiegoLibonati/CutTube/hooks",
    issue_events_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/issues/events{/number}",
    events_url: "https://api.github.com/repos/DiegoLibonati/CutTube/events",
    assignees_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/assignees{/user}",
    branches_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/branches{/branch}",
    tags_url: "https://api.github.com/repos/DiegoLibonati/CutTube/tags",
    blobs_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/git/blobs{/sha}",
    git_tags_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/git/tags{/sha}",
    git_refs_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/git/refs{/sha}",
    trees_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/git/trees{/sha}",
    statuses_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/statuses/{sha}",
    languages_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/languages",
    stargazers_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/stargazers",
    contributors_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/contributors",
    subscribers_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/subscribers",
    subscription_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/subscription",
    commits_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/commits{/sha}",
    git_commits_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/git/commits{/sha}",
    comments_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/comments{/number}",
    issue_comment_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/issues/comments{/number}",
    contents_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/contents/{+path}",
    compare_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/compare/{base}...{head}",
    merges_url: "https://api.github.com/repos/DiegoLibonati/CutTube/merges",
    archive_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/{archive_format}{/ref}",
    downloads_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/downloads",
    issues_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/issues{/number}",
    pulls_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/pulls{/number}",
    milestones_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/notifications{?since,all,participating}",
    labels_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/labels{/name}",
    releases_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/releases{/id}",
    deployments_url:
      "https://api.github.com/repos/DiegoLibonati/CutTube/deployments",
    created_at: "2024-03-31T18:02:34Z",
    updated_at: "2024-09-19T19:07:32Z",
    pushed_at: "2024-09-19T19:07:28Z",
    git_url: "git://github.com/DiegoLibonati/CutTube.git",
    ssh_url: "git@github.com:DiegoLibonati/CutTube.git",
    clone_url: "https://github.com/DiegoLibonati/CutTube.git",
    svn_url: "https://github.com/DiegoLibonati/CutTube",
    homepage: "",
    size: 24,
    stargazers_count: 0,
    watchers_count: 0,
    language: "TypeScript",
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: false,
    has_discussions: false,
    forks_count: 0,

    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: {
      key: "mit",
      name: "MIT License",
      spdx_id: "MIT",
      url: "https://api.github.com/licenses/mit",
      node_id: "MDc6TGljZW5zZTEz",
    },
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [
      "docker",
      "flask",
      "python",
      "reactjs",
      "tailwindcss",
      "typescript",
    ],
    visibility: "public",
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: "main",
  },
];
