import { screen } from "@testing-library/dom";

import type { ItemLinkRepoProps } from "@/types/props";
import type { ItemLinkRepoComponent } from "@/types/components";

import ItemLinkRepo from "@/components/ItemLinkRepo/ItemLinkRepo";

const defaultProps: ItemLinkRepoProps = {
  name: "my-repo",
  href: "https://github.com/testuser/my-repo",
};

const renderComponent = (
  props: Partial<ItemLinkRepoProps> = {}
): ItemLinkRepoComponent => {
  const element = ItemLinkRepo({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("ItemLinkRepo", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render a list item", () => {
      renderComponent();
      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    it("should render a link with an accessible name", () => {
      renderComponent();
      expect(
        screen.getByRole("link", { name: /open my-repo repository on github/i })
      ).toBeInTheDocument();
    });

    it("should set the href on the anchor element", () => {
      renderComponent();
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "https://github.com/testuser/my-repo"
      );
    });

    it("should open the link in a new tab", () => {
      renderComponent();
      expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    });

    it("should have rel noopener noreferrer", () => {
      renderComponent();
      expect(screen.getByRole("link")).toHaveAttribute(
        "rel",
        "noopener noreferrer"
      );
    });

    it("should display the repo name as text content", () => {
      renderComponent();
      expect(screen.getByRole("link")).toHaveTextContent("my-repo");
    });
  });
});
