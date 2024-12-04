import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { OFFICIAL_BODY } from "./tests/jest.setup";
import { createServer } from "./tests/msw/server";
import {
  PROFILE_REPOS_REQUEST_MOCK,
  PROFILE_REQUEST_MOCK,
} from "./tests/constants/constants";

createServer([
  {
    path: "/users/:profile",
    method: "get",
    res: () => {
      return PROFILE_REQUEST_MOCK;
    },
  },
  {
    path: `/users/:username/repos`,
    method: "get",
    res: () => {
      return PROFILE_REPOS_REQUEST_MOCK;
    },
  },
]);

beforeEach(() => {
  document.body.innerHTML = OFFICIAL_BODY;

  require("./index.ts");
  document.dispatchEvent(new Event("DOMContentLoaded"));
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the search input and the submit button.", () => {
  const inputText = screen.getByPlaceholderText("Username");
  const btnSubmit = screen.getByRole("button", { name: /search profile/i });

  expect(inputText).toBeInTheDocument();
  expect(btnSubmit).toBeInTheDocument();
});

test("It must render the initial message when the page is initialized.", () => {
  const headingMessage = screen.getByRole("heading", {
    name: "Write the name of the GitHub Profile in the input ☝️.",
  });

  expect(headingMessage).toBeInTheDocument();
});

test("A profile should be rendered when you enter the profile name in the input and click submit.", async () => {
  const inputText = screen.getByPlaceholderText("Username");
  const btnSubmit = screen.getByRole("button", { name: /search profile/i });

  expect(inputText).toBeInTheDocument();
  expect(btnSubmit).toBeInTheDocument();

  await user.clear(inputText);
  await user.click(inputText);
  await user.keyboard(PROFILE_REQUEST_MOCK.login);

  await user.click(btnSubmit);

  const img = screen.getByRole("img");
  const name = screen.getByRole("heading", {
    name: PROFILE_REQUEST_MOCK.name,
  });
  const description = screen.getByText(PROFILE_REQUEST_MOCK.bio);
  const headingTitle = screen.getByRole("heading", { name: /repositories/i });
  const followers = screen.getByRole("heading", { name: /6 followers/i });
  const following = screen.getByRole("heading", { name: /2 following/i });
  const repos = screen.getByRole("heading", { name: /72 repos/i });
  const listRepos = screen.getByRole("list");

  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", PROFILE_REQUEST_MOCK.avatar_url);
  expect(img).toHaveAttribute("alt", PROFILE_REQUEST_MOCK.name);
  expect(name).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(headingTitle).toBeInTheDocument();
  expect(followers).toBeInTheDocument();
  expect(repos).toBeInTheDocument();
  expect(following).toBeInTheDocument();
  expect(listRepos).toBeInTheDocument();
  expect(listRepos.children).toHaveLength(PROFILE_REPOS_REQUEST_MOCK.length);
});
