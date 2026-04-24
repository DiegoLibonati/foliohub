import { screen } from "@testing-library/dom";

import type { CardProfileProps } from "@/types/props";
import type { CardProfileComponent } from "@/types/components";

import CardProfile from "@/components/CardProfile/CardProfile";

import { mockRepoFlat } from "@tests/__mocks__/repoFlat.mock";

const defaultProps: CardProfileProps = {
  avatar_url: "https://example.com/avatar.jpg",
  name: "Test User",
  bio: "Test bio",
  followers: 100,
  following: 50,
  public_repos: 25,
  repos: mockRepoFlat,
};

const renderComponent = (
  props: Partial<CardProfileProps> = {}
): CardProfileComponent => {
  const element = CardProfile({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("CardProfile", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render the card with card-profile class", () => {
      renderComponent();
      expect(
        document.querySelector<HTMLDivElement>(".card-profile")
      ).toBeInTheDocument();
    });

    it("should render the avatar image with correct src", () => {
      renderComponent();
      const img = screen.getByAltText("Test User's GitHub profile avatar");
      expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
    });

    it("should render the profile name as an h2", () => {
      renderComponent();
      expect(
        screen.getByRole("heading", { name: "Test User", level: 2 })
      ).toBeInTheDocument();
    });

    it("should render the bio text", () => {
      renderComponent();
      expect(
        document.querySelector<HTMLParagraphElement>("#description-profile")
      ).toHaveTextContent("Test bio");
    });

    it("should render the followers count and label", () => {
      renderComponent();
      const el =
        document.querySelector<HTMLHeadingElement>("#followers-profile");
      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent("100");
      expect(el).toHaveTextContent("Followers");
    });

    it("should render the following count and label", () => {
      renderComponent();
      const el =
        document.querySelector<HTMLHeadingElement>("#following-profile");
      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent("50");
      expect(el).toHaveTextContent("Following");
    });

    it("should render the public repos count and label", () => {
      renderComponent();
      const el = document.querySelector<HTMLHeadingElement>("#repos-profile");
      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent("25");
      expect(el).toHaveTextContent("Repos");
    });

    it("should render a link for each repo", () => {
      renderComponent();
      expect(screen.getAllByRole("link")).toHaveLength(2);
    });

    it("should render repo links with correct hrefs", () => {
      renderComponent();
      expect(
        screen.getByRole("link", { name: /open repo-1 repository on github/i })
      ).toHaveAttribute("href", "https://github.com/testuser/repo-1");
      expect(
        screen.getByRole("link", { name: /open repo-2 repository on github/i })
      ).toHaveAttribute("href", "https://github.com/testuser/repo-2");
    });

    it("should render the repository list with an accessible name", () => {
      renderComponent();
      expect(
        screen.getByRole("list", { name: /repository list/i })
      ).toBeInTheDocument();
    });

    it("should render the profile statistics container", () => {
      renderComponent();
      const statsSection = document.querySelector<HTMLDivElement>(
        ".card__content-stats"
      );
      expect(statsSection).toBeInTheDocument();
      expect(statsSection).toHaveAttribute("aria-label", "Profile statistics");
    });
  });

  describe("edge cases", () => {
    it("should render no repo links when repos is empty", () => {
      renderComponent({ repos: [] });
      expect(screen.queryAllByRole("link")).toHaveLength(0);
    });

    it("should render a single repo link when repos has one item", () => {
      renderComponent({
        repos: [
          {
            name: "solo-repo",
            html_url: "https://github.com/testuser/solo-repo",
          },
        ],
      });
      expect(screen.getAllByRole("link")).toHaveLength(1);
    });
  });
});
