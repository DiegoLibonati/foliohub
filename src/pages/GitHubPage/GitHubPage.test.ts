import { screen, waitFor } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { GitHubPage } from "@src/pages/GitHubPage/GitHubPage";

import { gitHubStore } from "@src/stores/gitHubStore";

import { createServer } from "@tests/msw/server";
import { mockProfile, mockRepos } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = GitHubPage();

  document.body.appendChild(container);

  return {
    container: container,
  };
};

createServer([
  {
    path: "/users/:username",
    method: "get",
    res: ({ request }) => {
      const url = new URL(request.url);
      const username = url.pathname.split("/").pop();

      if (username === "testuser") {
        return mockProfile;
      }

      throw new Error("User not found");
    },
  },
  {
    path: "/users/:username/repos",
    method: "get",
    res: ({ request }) => {
      const url = new URL(request.url);
      const pathParts = url.pathname.split("/");
      const username = pathParts[pathParts.length - 2];

      if (username === "testuser") {
        return mockRepos;
      }

      return [];
    },
  },
]);

describe("GitHubPage.ts", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="alert" style="opacity: 0;">
        <h2 class="alert__text"></h2>
      </div>
    `;

    gitHubStore.setState({ profile: null, repos: [] });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests", () => {
    test("It should create a main element with correct structure", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.tagName).toBe("MAIN");
    });

    test("It should have correct base styling classes", () => {
      const { container } = renderComponent();

      expect(container.className).toContain("flex");
      expect(container.className).toContain("flex-col");
      expect(container.className).toContain("items-center");
      expect(container.className).toContain("justify-center");
      expect(container.className).toContain("w-full");
      expect(container.className).toContain("min-h-screen");
      expect(container.className).toContain("main_container");
    });

    test("It should have correct margin classes", () => {
      const { container } = renderComponent();

      expect(container.className).toContain("my-2");
      expect(container.className).toContain("md:my-0");
    });

    test("It should contain form-search element", () => {
      const { container } = renderComponent();

      const formSearch = container.querySelector(".form-search");

      expect(formSearch).toBeInTheDocument();
      expect(formSearch?.tagName).toBe("FORM");
    });

    test("It should contain card section", () => {
      const { container } = renderComponent();

      const card = container.querySelector(".card");

      expect(card).toBeInTheDocument();
      expect(card?.tagName).toBe("SECTION");
    });
  });

  describe("Form rendering", () => {
    test("It should render search form with correct structure", () => {
      const { container } = renderComponent();

      const form = container.querySelector(".form-search");

      expect(form).toBeInTheDocument();
      expect(form?.tagName).toBe("FORM");
    });

    test("It should have correct form styling classes", () => {
      const { container } = renderComponent();

      const form = container.querySelector(".form-search");

      expect(form?.className).toContain("mb-2");
      expect(form?.className).toContain("p-2");
      expect(form?.className).toContain("rounded-lg");
      expect(form?.className).toContain("bg-secondary");
    });

    test("It should render input field", () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });

    test("It should have correct input styling classes", () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");

      expect(input.className).toContain("bg-secondary");
      expect(input.className).toContain("text-white");
      expect(input.className).toContain("outline-none");
    });

    test("It should render submit button", () => {
      renderComponent();

      const button = screen.getByRole("button", { name: /search profile/i });

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "submit");
    });

    test("It should have correct button styling classes", () => {
      renderComponent();

      const button = screen.getByRole("button", { name: /search profile/i });

      expect(button.className).toContain("bg-transparent");
      expect(button.className).toContain("text-white");
      expect(button.className).toContain("cursor-pointer");
    });

    test("It should render search icon in button", () => {
      const { container } = renderComponent();

      const icon = container.querySelector(".fa-magnifying-glass");

      expect(icon).toBeInTheDocument();
      expect(icon?.classList.contains("fa-solid")).toBe(true);
    });
  });

  describe("Initial state", () => {
    test("It should render CardInit on mount", () => {
      renderComponent();

      const heading = screen.getByRole("heading", {
        level: 1,
        name: /write the name of the github profile/i,
      });

      expect(heading).toBeInTheDocument();
    });

    test("It should have card-init class on initial render", () => {
      const { container } = renderComponent();

      const cardInit = container.querySelector(".card-init");

      expect(cardInit).toBeInTheDocument();
    });

    test("It should not render CardProfile on mount", () => {
      const { container } = renderComponent();

      const cardProfile = container.querySelector(".card-profile");

      expect(cardProfile).not.toBeInTheDocument();
    });
  });

  describe("Form submission", () => {
    test("It should show alert when submitting empty input", async () => {
      renderComponent();

      const button = screen.getByRole("button", { name: /search profile/i });
      const alertText = document.querySelector(".alert__text");

      await user.click(button);

      expect(alertText?.textContent).toBe("You must enter valid content.");
    });

    test("It should show alert when submitting whitespace only", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });
      const alertText = document.querySelector(".alert__text");

      await user.type(input, "   ");
      await user.click(button);

      expect(alertText?.textContent).toBe("You must enter valid content.");
    });

    test("It should fetch and display profile on valid username", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        const profileName = screen.getByRole("heading", {
          level: 2,
          name: mockProfile.name,
        });
        expect(profileName).toBeInTheDocument();
      });
    });

    test("It should show success alert when profile exists", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });
      const alertText = document.querySelector(".alert__text");

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        expect(alertText?.textContent).toBe("The profile exist ✅");
      });
    });

    test("It should show error alert when profile does not exist", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });
      const alertText = document.querySelector(".alert__text");

      await user.type(input, "nonexistentuser");
      await user.click(button);

      await waitFor(() => {
        expect(alertText?.textContent).toBe("The profile dosen´t exist 😔");
      });
    });

    test("It should render CardInit when profile does not exist", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "nonexistentuser");
      await user.click(button);

      await waitFor(() => {
        const heading = screen.getByRole("heading", {
          level: 1,
          name: /write the name of the github profile/i,
        });
        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("Profile display", () => {
    test("It should display profile information correctly", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        const profileName = screen.getByRole("heading", {
          level: 2,
          name: mockProfile.name,
        });
        expect(profileName).toBeInTheDocument();
      });

      const profileImage = screen.getByRole("img", { name: mockProfile.name });
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute("src", mockProfile.avatar_url);
    });

    test("It should display profile bio", async () => {
      const { container } = renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        const bio = container.querySelector("#description-profile");
        expect(bio?.textContent).toBe(mockProfile.bio);
      });
    });

    test("It should display profile statistics", async () => {
      const { container } = renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        const followers = container.querySelector("#followers-profile");
        const following = container.querySelector("#following-profile");
        const repos = container.querySelector("#repos-profile");

        expect(followers?.textContent).toContain(
          mockProfile.followers.toString()
        );
        expect(following?.textContent).toContain(
          mockProfile.following.toString()
        );
        expect(repos?.textContent).toContain(
          mockProfile.public_repos.toString()
        );
      });
    });

    test("It should display repositories list", async () => {
      const { container } = renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        const reposList = container.querySelector(".card__repos-list");
        expect(reposList?.children.length).toBe(mockRepos.length);
      });
    });

    test("It should render CardProfile with correct class", async () => {
      const { container } = renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        const cardProfile = container.querySelector(".card-profile");
        expect(cardProfile).toBeInTheDocument();
      });
    });

    test("It should remove CardInit when profile is loaded", async () => {
      const { container } = renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        const cardInit = container.querySelector(".card-init");
        expect(cardInit).not.toBeInTheDocument();
      });
    });
  });

  describe("Input behavior", () => {
    test("It should trim whitespace from input value", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "  testuser  ");
      await user.click(button);

      await waitFor(() => {
        const profileName = screen.getByRole("heading", {
          level: 2,
          name: mockProfile.name,
        });
        expect(profileName).toBeInTheDocument();
      });
    });

    test("It should allow typing in input field", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username") as HTMLInputElement;

      await user.type(input, "testuser");

      expect(input.value).toBe("testuser");
    });

    test("It should clear and resubmit with different username", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username") as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        const profileName = screen.getByRole("heading", {
          level: 2,
          name: mockProfile.name,
        });
        expect(profileName).toBeInTheDocument();
      });

      await user.clear(input);
      await user.type(input, "anotheruser");
      await user.click(button);

      await waitFor(() => {
        const alertText = document.querySelector(".alert__text");
        expect(alertText?.textContent).toBe("The profile dosen´t exist 😔");
      });
    });
  });

  describe("Store integration", () => {
    test("It should update store when profile is found", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        const state = gitHubStore.getState();
        expect(state.profile).not.toBeNull();
        expect(state.profile?.login).toBe(mockProfile.login);
      });
    });

    test("It should update store repos when profile is found", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        const state = gitHubStore.getState();
        expect(state.repos.length).toBe(mockRepos.length);
      });
    });

    test("It should set profile to null when user not found", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "nonexistentuser");
      await user.click(button);

      await waitFor(() => {
        const state = gitHubStore.getState();
        expect(state.profile).toBeNull();
      });
    });

    test("It should subscribe to store profile changes", () => {
      const subscribeSpy = jest.spyOn(gitHubStore, "subscribe");

      renderComponent();

      expect(subscribeSpy).toHaveBeenCalled();

      subscribeSpy.mockRestore();
    });
  });

  describe("Edge cases", () => {
    test("It should handle rapid form submissions", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);
      await user.click(button);
      await user.click(button);

      await waitFor(() => {
        const profileName = screen.getByRole("heading", {
          level: 2,
          name: mockProfile.name,
        });
        expect(profileName).toBeInTheDocument();
      });
    });

    test("It should handle form submission via Enter key", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");

      await user.type(input, "testuser{Enter}");

      await waitFor(() => {
        const profileName = screen.getByRole("heading", {
          level: 2,
          name: mockProfile.name,
        });
        expect(profileName).toBeInTheDocument();
      });
    });

    test("It should handle special characters in username", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });
      const alertText = document.querySelector(".alert__text");

      await user.type(input, "user@#$%");
      await user.click(button);

      await waitFor(() => {
        expect(alertText?.textContent).toBe("The profile dosen´t exist 😔");
      });
    });
  });

  describe("Card section", () => {
    test("It should have correct card section styling", () => {
      const { container } = renderComponent();

      const card = container.querySelector(".card");

      expect(card?.className).toContain("flex");
      expect(card?.className).toContain("flex-col");
      expect(card?.className).toContain("items-center");
      expect(card?.className).toContain("justify-center");
      expect(card?.className).toContain("w-full");
      expect(card?.className).toContain("h-auto");
    });

    test("It should replace card content when switching from CardInit to CardProfile", async () => {
      const { container } = renderComponent();

      const cardInitBefore = container.querySelector(".card-init");
      expect(cardInitBefore).toBeInTheDocument();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        const cardInitAfter = container.querySelector(".card-init");
        const cardProfile = container.querySelector(".card-profile");

        expect(cardInitAfter).not.toBeInTheDocument();
        expect(cardProfile).toBeInTheDocument();
      });
    });

    test("It should replace card content when switching from CardProfile to CardInit", async () => {
      const { container } = renderComponent();

      const input = screen.getByPlaceholderText("Username");
      const button = screen.getByRole("button", { name: /search profile/i });

      await user.type(input, "testuser");
      await user.click(button);

      await waitFor(() => {
        const cardProfile = container.querySelector(".card-profile");
        expect(cardProfile).toBeInTheDocument();
      });

      await user.clear(input);
      await user.type(input, "nonexistentuser");
      await user.click(button);

      await waitFor(() => {
        const cardInit = container.querySelector(".card-init");
        const cardProfile = container.querySelector(".card-profile");

        expect(cardInit).toBeInTheDocument();
        expect(cardProfile).not.toBeInTheDocument();
      });
    });
  });
});
