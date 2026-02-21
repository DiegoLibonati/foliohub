import { screen } from "@testing-library/dom";

import type { ItemLinkRepoProps } from "@/types/props";
import type { ItemLinkRepoComponent } from "@/types/components";

import { ItemLinkRepo } from "@/components/ItemLinkRepo/ItemLinkRepo";

const renderComponent = (props: ItemLinkRepoProps): ItemLinkRepoComponent => {
  const container = ItemLinkRepo(props);
  document.body.appendChild(container);
  return container;
};

describe("ItemLinkRepo Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: ItemLinkRepoProps = {
    name: "test-repo",
    href: "https://github.com/user/test-repo",
  };

  it("should render li with correct structure", () => {
    renderComponent(defaultProps);

    const listItem = document.querySelector<HTMLLIElement>("li");
    expect(listItem).toBeInTheDocument();
  });

  it("should render link with correct attributes", () => {
    renderComponent(defaultProps);

    const link = screen.getByRole("link", { name: "go to test-repo" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/user/test-repo");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("should display repository name", () => {
    renderComponent(defaultProps);

    expect(screen.getByText("test-repo")).toBeInTheDocument();
  });
});
