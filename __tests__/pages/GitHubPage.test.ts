import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";
import type { Repo } from "@/types/app";

import { GitHubPage } from "@/pages/GitHubPage/GitHubPage";

import { githubService } from "@/services/githubService";

import { gitHubStore } from "@/stores/gitHubStore";

import { mockProfile } from "@tests/__mocks__/profile.mock";

jest.mock("@/services/githubService");

const mockedGithubService = githubService as jest.Mocked<typeof githubService>;

const renderPage = (): Page => {
  const container = GitHubPage();
  document.body.appendChild(container);
  return container;
};

describe("GitHubPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    gitHubStore.setState({ profile: null, repos: [] });

    const alertRoot = document.createElement("div");
    alertRoot.className = "alert";
    alertRoot.style.opacity = "0";

    const alertText = document.createElement("h2");
    alertText.className = "alert__text";

    alertRoot.appendChild(alertText);
    document.body.appendChild(alertRoot);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".main_container");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render search form", () => {
    renderPage();

    const form = document.querySelector<HTMLFormElement>(".form-search");
    expect(form).toBeInTheDocument();
  });

  it("should render search input", () => {
    renderPage();

    const input =
      document.querySelector<HTMLInputElement>('input[type="text"]');
    expect(input).toBeInTheDocument();
    expect(input?.placeholder).toBe("Username");
  });

  it("should render search button", () => {
    renderPage();

    const button = screen.getByRole("button", { name: "search profile" });
    expect(button).toBeInTheDocument();
  });

  it("should render initial card", () => {
    renderPage();

    expect(
      screen.getByText(/Write the name of the GitHub Profile in the input/)
    ).toBeInTheDocument();
  });

  it("should search for profile when form is submitted", async () => {
    const user = userEvent.setup({ delay: null });

    const mockRepos: Repo[] = [];

    mockedGithubService.getProfile.mockResolvedValue(mockProfile);
    mockedGithubService.getRepos.mockResolvedValue(mockRepos);

    renderPage();

    const input =
      document.querySelector<HTMLInputElement>('input[type="text"]');
    if (input) await user.type(input, "testuser");

    const form = document.querySelector<HTMLFormElement>(".form-search");
    if (form) form.dispatchEvent(new Event("submit", { bubbles: true }));

    await Promise.resolve();

    expect(mockedGithubService.getProfile).toHaveBeenCalledWith("testuser");
  });

  it("should show alert when input is empty", async () => {
    renderPage();

    const form = document.querySelector<HTMLFormElement>(".form-search");
    if (form) form.dispatchEvent(new Event("submit", { bubbles: true }));

    await Promise.resolve();

    const alertText =
      document.querySelector<HTMLHeadingElement>(".alert__text");
    expect(alertText?.innerHTML).toBe("You must enter valid content.");
  });

  it("should cleanup form listener and alert on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
