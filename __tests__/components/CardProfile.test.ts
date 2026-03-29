import { screen } from "@testing-library/dom";

import type { CardProfileProps } from "@/types/props";
import type { CardProfileComponent } from "@/types/components";

import CardProfile from "@/components/CardProfile/CardProfile";

const renderComponent = (props: CardProfileProps): CardProfileComponent => {
  const container = CardProfile(props);
  document.body.appendChild(container);
  return container;
};

describe("CardProfile Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: CardProfileProps = {
    avatar_url: "https://avatars.githubusercontent.com/u/123456",
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

  it("should render card with correct structure", () => {
    renderComponent(defaultProps);

    const card = document.querySelector<HTMLDivElement>(".card-profile");
    expect(card).toBeInTheDocument();
  });

  it("should render avatar image", () => {
    renderComponent(defaultProps);

    const avatar = document.querySelector<HTMLImageElement>("#img-profile");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute(
      "src",
      "https://avatars.githubusercontent.com/u/123456"
    );
    expect(avatar).toHaveAttribute("alt", "John Doe's GitHub profile avatar");
  });

  it("should render user name", () => {
    renderComponent(defaultProps);

    const name = document.querySelector<HTMLHeadingElement>("#name-profile");
    expect(name).toBeInTheDocument();
    expect(name?.textContent).toBe("John Doe");
  });

  it("should render bio", () => {
    renderComponent(defaultProps);

    const bio = document.querySelector<HTMLParagraphElement>(
      "#description-profile"
    );
    expect(bio).toBeInTheDocument();
    expect(bio?.textContent).toBe("Software Developer");
  });

  it("should render followers count", () => {
    renderComponent(defaultProps);

    expect(screen.getByText(/100/)).toBeInTheDocument();
    expect(screen.getByText(/Followers/)).toBeInTheDocument();
  });

  it("should render following count", () => {
    renderComponent(defaultProps);

    expect(screen.getByText(/50/)).toBeInTheDocument();
    expect(screen.getByText(/Following/)).toBeInTheDocument();
  });

  it("should render repos count", () => {
    renderComponent(defaultProps);

    const reposCount =
      document.querySelector<HTMLHeadingElement>("#repos-profile");
    expect(reposCount).toBeInTheDocument();
    expect(reposCount?.textContent).toContain("25");
    expect(reposCount?.textContent).toContain("Repos");
  });

  it("should render repositories title", () => {
    renderComponent(defaultProps);

    expect(screen.getByText("Repositories")).toBeInTheDocument();
  });

  it("should render repository links", () => {
    renderComponent(defaultProps);

    expect(screen.getByText("repo-1")).toBeInTheDocument();
    expect(screen.getByText("repo-2")).toBeInTheDocument();
  });
});
