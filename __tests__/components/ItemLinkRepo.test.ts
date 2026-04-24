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
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a list item", () => {
      renderComponent();
      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    it("should render a link with an accessible name based on the repo name", () => {
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

    it("should apply the base CSS classes to the list item", () => {
      renderComponent();
      expect(screen.getByRole("listitem")).toHaveClass(
        "text-white",
        "bg-primary",
        "rounded-lg",
        "cursor-pointer"
      );
    });
  });

  describe("edge cases", () => {
    it("should update the aria-label when a different name is provided", () => {
      renderComponent({ name: "other-project" });
      expect(
        screen.getByRole("link", {
          name: /open other-project repository on github/i,
        })
      ).toBeInTheDocument();
    });

    it("should display the correct name as text content when a different name is provided", () => {
      renderComponent({ name: "other-project" });
      expect(screen.getByRole("link")).toHaveTextContent("other-project");
    });

    it("should use the correct href when a different href is provided", () => {
      renderComponent({ href: "https://github.com/testuser/other-project" });
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "https://github.com/testuser/other-project"
      );
    });
  });
});
