import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import FoliohubPage from "@/pages/FoliohubPage/FoliohubPage";

import githubService from "@/services/githubService";

import { gitHubStore } from "@/stores/gitHubStore";

import { mockProfile } from "@tests/__mocks__/profile.mock";
import { mockRepos } from "@tests/__mocks__/repos.mock";

const mockGetProfile = jest.mocked(githubService.getProfile);
const mockGetRepos = jest.mocked(githubService.getRepos);

let page: Page;

jest.mock("@/services/githubService");

const setupAlertDOM = (): void => {
  const alertRoot = document.createElement("div");
  alertRoot.className = "alert";
  const alertText = document.createElement("h2");
  alertText.className = "alert__text";
  alertRoot.appendChild(alertText);
  document.body.appendChild(alertRoot);
};

const renderPage = (): Page => {
  page = FoliohubPage();
  document.body.appendChild(page);
  return page;
};

describe("FoliohubPage", () => {
  beforeEach(() => {
    gitHubStore.setState({ profile: null, repos: [] });
    mockGetRepos.mockResolvedValue(mockRepos);
    setupAlertDOM();
  });

  afterEach(() => {
    page.cleanup?.();
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a search form", () => {
      renderPage();
      expect(
        screen.getByRole("form", { name: /search github profiles/i })
      ).toBeInTheDocument();
    });

    it("should render a username text input", () => {
      renderPage();
      expect(
        screen.getByRole("textbox", { name: /github username/i })
      ).toBeInTheDocument();
    });

    it("should render a search submit button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: /search github profile/i })
      ).toBeInTheDocument();
    });

    it("should render CardInit on initial load", () => {
      renderPage();
      expect(
        document.querySelector<HTMLDivElement>(".card-init")
      ).toBeInTheDocument();
    });

    it("should not render CardProfile on initial load", () => {
      renderPage();
      expect(
        document.querySelector<HTMLDivElement>(".card-profile")
      ).not.toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should not call getProfile when input is empty", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(
        screen.getByRole("button", { name: /search github profile/i })
      );
      expect(mockGetProfile).not.toHaveBeenCalled();
    });

    it("should not call getProfile when input contains only whitespace", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.type(
        screen.getByRole("textbox", { name: /github username/i }),
        "   "
      );
      await user.click(
        screen.getByRole("button", { name: /search github profile/i })
      );
      expect(mockGetProfile).not.toHaveBeenCalled();
    });

    it("should show an alert when input is empty on submit", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(
        screen.getByRole("button", { name: /search github profile/i })
      );
      expect(
        document.querySelector<HTMLHeadingElement>(".alert__text")?.innerHTML
      ).toBe("You must enter valid content.");
    });

    it("should call getProfile with the trimmed input value on submit", async () => {
      const user = userEvent.setup();
      mockGetProfile.mockResolvedValue(mockProfile);
      renderPage();
      await user.type(
        screen.getByRole("textbox", { name: /github username/i }),
        "testuser"
      );
      await user.click(
        screen.getByRole("button", { name: /search github profile/i })
      );
      await waitFor(() => {
        expect(mockGetProfile).toHaveBeenCalledWith("testuser");
      });
    });

    it("should render CardProfile after a successful profile fetch", async () => {
      const user = userEvent.setup();
      mockGetProfile.mockResolvedValue(mockProfile);
      renderPage();
      await user.type(
        screen.getByRole("textbox", { name: /github username/i }),
        "testuser"
      );
      await user.click(
        screen.getByRole("button", { name: /search github profile/i })
      );
      await waitFor(() => {
        expect(
          document.querySelector<HTMLDivElement>(".card-profile")
        ).toBeInTheDocument();
      });
    });

    it("should render CardInit after a failed profile fetch", async () => {
      const user = userEvent.setup();
      mockGetProfile.mockRejectedValue(new Error("Not Found"));
      renderPage();
      await user.type(
        screen.getByRole("textbox", { name: /github username/i }),
        "nonexistent"
      );
      await user.click(
        screen.getByRole("button", { name: /search github profile/i })
      );
      await waitFor(() => {
        expect(
          document.querySelector<HTMLDivElement>(".card-init")
        ).toBeInTheDocument();
      });
    });

    it("should show the success alert after a successful profile fetch", async () => {
      const user = userEvent.setup();
      mockGetProfile.mockResolvedValue(mockProfile);
      renderPage();
      await user.type(
        screen.getByRole("textbox", { name: /github username/i }),
        "testuser"
      );
      await user.click(
        screen.getByRole("button", { name: /search github profile/i })
      );
      await waitFor(() => {
        expect(
          document.querySelector<HTMLHeadingElement>(".alert__text")?.innerHTML
        ).toBe("The profile exists ✅");
      });
    });

    it("should show the error alert after a failed profile fetch", async () => {
      const user = userEvent.setup();
      mockGetProfile.mockRejectedValue(new Error("Not Found"));
      renderPage();
      await user.type(
        screen.getByRole("textbox", { name: /github username/i }),
        "nonexistent"
      );
      await user.click(
        screen.getByRole("button", { name: /search github profile/i })
      );
      await waitFor(() => {
        expect(
          document.querySelector<HTMLHeadingElement>(".alert__text")?.innerHTML
        ).toBe("The profile doesn't exist 😔");
      });
    });
  });

  describe("cleanup", () => {
    it("should expose a cleanup method", () => {
      const p = renderPage();
      expect(typeof p.cleanup).toBe("function");
    });

    it("should remove the form submit listener after cleanup", async () => {
      const user = userEvent.setup();
      mockGetProfile.mockResolvedValue(mockProfile);
      const p = renderPage();
      p.cleanup?.();
      await user.type(
        screen.getByRole("textbox", { name: /github username/i }),
        "testuser"
      );
      await user.click(
        screen.getByRole("button", { name: /search github profile/i })
      );
      expect(mockGetProfile).not.toHaveBeenCalled();
    });

    it("should not re-render when store profile changes after cleanup", async () => {
      mockGetProfile.mockResolvedValue(mockProfile);
      const p = renderPage();
      p.cleanup?.();
      await gitHubStore.setProfile(mockProfile);
      expect(
        document.querySelector<HTMLDivElement>(".card-profile")
      ).toBeNull();
    });
  });
});
