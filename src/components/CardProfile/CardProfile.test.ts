import { screen } from "@testing-library/dom";

import { CardProfileProps } from "@src/entities/props";
import { RepoFlat } from "@src/entities/app";

import { CardProfile } from "@src/components/CardProfile/CardProfile";

type RenderComponent = {
  props: CardProfileProps;
  container: HTMLDivElement;
};

const renderComponent = (
  avatar_url: string,
  name: string,
  bio: string,
  followers: number,
  following: number,
  public_repos: number,
  repos: RepoFlat[]
): RenderComponent => {
  const props: CardProfileProps = {
    avatar_url: avatar_url,
    name: name,
    bio: bio,
    followers: followers,
    following: following,
    public_repos: public_repos,
    repos: repos,
  };

  const container = CardProfile({
    avatar_url: props.avatar_url,
    name: props.name,
    bio: props.bio,
    followers: props.followers,
    following: props.following,
    public_repos: props.public_repos,
    repos: props.repos,
  });

  document.body.appendChild(container);

  return {
    props: props,
    container: container,
  };
};

describe("CardProfile.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests", () => {
    const mockProps = {
      avatar_url: "https://example.com/avatar.jpg",
      name: "John Doe",
      bio: "Software Developer",
      followers: 100,
      following: 50,
      public_repos: 25,
      repos: [
        { name: "repo-1", html_url: "https://github.com/user/repo-1" },
        { name: "repo-2", html_url: "https://github.com/user/repo-2" },
      ],
    };

    test("It should create a div element with correct structure", () => {
      const { container } = renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toContain("card-profile");
    });

    test("It should have correct base styling classes", () => {
      const { container } = renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      expect(container.className).toContain("flex");
      expect(container.className).toContain("flex-col");
      expect(container.className).toContain("items-center");
      expect(container.className).toContain("justify-center");
      expect(container.className).toContain("bg-secondary");
      expect(container.className).toContain("rounded-lg");
      expect(container.className).toContain("p-4");
    });

    test("It should have correct responsive width classes", () => {
      const { container } = renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      expect(container.className).toContain("w-[90%]");
      expect(container.className).toContain("md:w-[55%]");
      expect(container.className).toContain("xl:w-[40%]");
      expect(container.className).toContain("2xl:w-[35%]");
    });

    test("It should contain card__content element", () => {
      const { container } = renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      const cardContent = container.querySelector(".card__content");

      expect(cardContent).toBeInTheDocument();
    });
  });

  describe("Profile image rendering", () => {
    const mockProps = {
      avatar_url: "https://example.com/avatar.jpg",
      name: "Jane Smith",
      bio: "Designer",
      followers: 200,
      following: 100,
      public_repos: 15,
      repos: [],
    };

    test("It should render profile image with correct attributes", () => {
      renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      const img = screen.getByRole("img", { name: mockProps.name });

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", mockProps.avatar_url);
      expect(img).toHaveAttribute("alt", mockProps.name);
      expect(img).toHaveAttribute("id", "img-profile");
    });

    test("It should have correct image styling classes", () => {
      renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      const img = screen.getByRole("img");

      expect(img.className).toContain("h-32");
      expect(img.className).toContain("w-32");
      expect(img.className).toContain("rounded-full");
      expect(img.className).toContain("object-cover");
    });
  });

  describe("Profile information rendering", () => {
    const mockProps = {
      avatar_url: "https://example.com/avatar.jpg",
      name: "Alice Developer",
      bio: "Full Stack Engineer with passion for open source",
      followers: 500,
      following: 250,
      public_repos: 42,
      repos: [],
    };

    test("It should render name correctly", () => {
      renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      const nameElement = screen.getByRole("heading", { level: 2 });

      expect(nameElement).toBeInTheDocument();
      expect(nameElement.textContent).toBe(mockProps.name);
      expect(nameElement).toHaveAttribute("id", "name-profile");
    });

    test("It should render bio correctly", () => {
      const { container } = renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      const bioElement = container.querySelector("#description-profile");

      expect(bioElement).toBeInTheDocument();
      expect(bioElement?.textContent).toBe(mockProps.bio);
    });

    test("It should have correct name styling classes", () => {
      renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      const nameElement = screen.getByRole("heading", { level: 2 });

      expect(nameElement.className).toContain("text-white");
      expect(nameElement.className).toContain("text-2xl");
      expect(nameElement.className).toContain("font-semibold");
    });
  });

  describe("Statistics rendering", () => {
    const mockProps = {
      avatar_url: "https://example.com/avatar.jpg",
      name: "Bob Coder",
      bio: "Developer",
      followers: 1500,
      following: 300,
      public_repos: 78,
      repos: [],
    };

    test("It should render followers count", () => {
      const { container } = renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      const followersElement = container.querySelector("#followers-profile");

      expect(followersElement).toBeInTheDocument();
      expect(followersElement?.textContent).toContain(
        mockProps.followers.toString()
      );
      expect(followersElement?.textContent).toContain("Followers");
    });

    test("It should render following count", () => {
      const { container } = renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      const followingElement = container.querySelector("#following-profile");

      expect(followingElement).toBeInTheDocument();
      expect(followingElement?.textContent).toContain(
        mockProps.following.toString()
      );
      expect(followingElement?.textContent).toContain("Following");
    });

    test("It should render public repos count", () => {
      const { container } = renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      const reposElement = container.querySelector("#repos-profile");

      expect(reposElement).toBeInTheDocument();
      expect(reposElement?.textContent).toContain(
        mockProps.public_repos.toString()
      );
      expect(reposElement?.textContent).toContain("Repos");
    });

    test("It should contain stats container", () => {
      const { container } = renderComponent(
        mockProps.avatar_url,
        mockProps.name,
        mockProps.bio,
        mockProps.followers,
        mockProps.following,
        mockProps.public_repos,
        mockProps.repos
      );

      const statsContainer = container.querySelector(".card__content-stats");

      expect(statsContainer).toBeInTheDocument();
    });
  });

  describe("Repositories rendering", () => {
    const mockRepos = [
      {
        name: "awesome-project",
        html_url: "https://github.com/user/awesome-project",
      },
      {
        name: "cool-library",
        html_url: "https://github.com/user/cool-library",
      },
      { name: "demo-app", html_url: "https://github.com/user/demo-app" },
    ];

    test("It should render repositories heading", () => {
      renderComponent(
        "https://example.com/avatar.jpg",
        "Test User",
        "Bio",
        100,
        50,
        3,
        mockRepos
      );

      const heading = screen.getByRole("heading", {
        level: 3,
        name: /repositories/i,
      });

      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe("Repositories");
    });

    test("It should render correct number of repositories", () => {
      const { container } = renderComponent(
        "https://example.com/avatar.jpg",
        "Test User",
        "Bio",
        100,
        50,
        3,
        mockRepos
      );

      const reposList = container.querySelector(".card__repos-list");
      const repoItems = reposList?.children;

      expect(repoItems?.length).toBe(mockRepos.length);
    });

    test("It should render repositories list container", () => {
      const { container } = renderComponent(
        "https://example.com/avatar.jpg",
        "Test User",
        "Bio",
        100,
        50,
        3,
        mockRepos
      );

      const reposList = container.querySelector(".card__repos-list");

      expect(reposList).toBeInTheDocument();
      expect(reposList?.tagName).toBe("UL");
    });

    test("It should render empty repositories list when no repos provided", () => {
      const { container } = renderComponent(
        "https://example.com/avatar.jpg",
        "Test User",
        "Bio",
        100,
        50,
        0,
        []
      );

      const reposList = container.querySelector(".card__repos-list");

      expect(reposList?.children.length).toBe(0);
    });

    test("It should contain card__repos container", () => {
      const { container } = renderComponent(
        "https://example.com/avatar.jpg",
        "Test User",
        "Bio",
        100,
        50,
        3,
        mockRepos
      );

      const reposContainer = container.querySelector(".card__repos");

      expect(reposContainer).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    test("It should handle zero stats", () => {
      const { container } = renderComponent(
        "https://example.com/avatar.jpg",
        "New User",
        "Just started",
        0,
        0,
        0,
        []
      );

      const followersElement = container.querySelector("#followers-profile");
      const followingElement = container.querySelector("#following-profile");
      const reposElement = container.querySelector("#repos-profile");

      expect(followersElement?.textContent).toContain("0");
      expect(followingElement?.textContent).toContain("0");
      expect(reposElement?.textContent).toContain("0");
    });

    test("It should handle large numbers", () => {
      const { container } = renderComponent(
        "https://example.com/avatar.jpg",
        "Popular User",
        "Very popular",
        999999,
        888888,
        777,
        []
      );

      const followersElement = container.querySelector("#followers-profile");
      const followingElement = container.querySelector("#following-profile");
      const reposElement = container.querySelector("#repos-profile");

      expect(followersElement?.textContent).toContain("999999");
      expect(followingElement?.textContent).toContain("888888");
      expect(reposElement?.textContent).toContain("777");
    });

    test("It should handle empty bio", () => {
      const { container } = renderComponent(
        "https://example.com/avatar.jpg",
        "User Name",
        "",
        10,
        5,
        2,
        []
      );

      const bioElement = container.querySelector("#description-profile");

      expect(bioElement).toBeInTheDocument();
      expect(bioElement?.textContent).toBe("");
    });

    test("It should handle special characters in name and bio", () => {
      const specialName = "User <>&\"'";
      const specialBio = "Bio with <script>alert('xss')</script>";

      renderComponent(
        "https://example.com/avatar.jpg",
        specialName,
        specialBio,
        10,
        5,
        2,
        []
      );

      const nameElement = screen.getByRole("heading", { level: 2 });

      expect(nameElement).toBeInTheDocument();
    });
  });
});
