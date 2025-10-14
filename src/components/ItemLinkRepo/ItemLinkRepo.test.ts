import { screen } from "@testing-library/dom";

import { ItemLinkRepoProps } from "@src/entities/props";

import { ItemLinkRepo } from "@src/components/ItemLinkRepo/ItemLinkRepo";

type RenderComponent = {
  props: ItemLinkRepoProps;
  container: HTMLLIElement;
};

const renderComponent = (name: string, href: string): RenderComponent => {
  const props: ItemLinkRepoProps = {
    name: name,
    href: href,
  };

  const container = ItemLinkRepo({
    name: props.name,
    href: props.href,
  });

  document.body.appendChild(container);

  return {
    props: props,
    container: container,
  };
};

describe("ItemLinkRepo.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests", () => {
    const mockProps = {
      name: "awesome-repo",
      href: "https://github.com/user/awesome-repo",
    };

    test("It should create a li element with correct structure", () => {
      const { container } = renderComponent(mockProps.name, mockProps.href);

      expect(container).toBeInstanceOf(HTMLLIElement);
      expect(container.tagName).toBe("LI");
    });

    test("It should have correct base styling classes", () => {
      const { container } = renderComponent(mockProps.name, mockProps.href);

      expect(container.className).toContain("text-white");
      expect(container.className).toContain("bg-primary");
      expect(container.className).toContain("rounded-lg");
      expect(container.className).toContain("cursor-pointer");
    });

    test("It should have correct padding classes", () => {
      const { container } = renderComponent(mockProps.name, mockProps.href);

      expect(container.className).toContain("py-[.2rem]");
      expect(container.className).toContain("px-[.3rem]");
    });

    test("It should have correct margin classes", () => {
      const { container } = renderComponent(mockProps.name, mockProps.href);

      expect(container.className).toContain("mr-[.3rem]");
      expect(container.className).toContain("mt-[.3rem]");
    });
  });

  describe("Link rendering", () => {
    const mockProps = {
      name: "my-project",
      href: "https://github.com/user/my-project",
    };

    test("It should render link with correct href", () => {
      renderComponent(mockProps.name, mockProps.href);

      const link = screen.getByRole("link", {
        name: `go to ${mockProps.name}`,
      });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", mockProps.href);
    });

    test("It should render link with correct aria-label", () => {
      renderComponent(mockProps.name, mockProps.href);

      const link = screen.getByRole("link", {
        name: `go to ${mockProps.name}`,
      });

      expect(link).toHaveAttribute("aria-label", `go to ${mockProps.name}`);
    });

    test("It should render link with target blank", () => {
      renderComponent(mockProps.name, mockProps.href);

      const link = screen.getByRole("link");

      expect(link).toHaveAttribute("target", "_blank");
    });

    test("It should display repository name as link text", () => {
      renderComponent(mockProps.name, mockProps.href);

      const link = screen.getByRole("link");

      expect(link.textContent?.trim()).toBe(mockProps.name);
    });

    test("It should contain an anchor element", () => {
      const { container } = renderComponent(mockProps.name, mockProps.href);

      const anchor = container.querySelector("a");

      expect(anchor).not.toBeNull();
      expect(anchor?.tagName).toBe("A");
    });
  });

  describe("Content rendering", () => {
    test("It should render repository name correctly", () => {
      const repoName = "cool-library";
      const { container } = renderComponent(
        repoName,
        "https://github.com/user/cool-library"
      );

      expect(container.textContent?.trim()).toBe(repoName);
    });

    test("It should render with different repository names", () => {
      const repos = [
        { name: "repo-1", href: "https://github.com/user/repo-1" },
        { name: "repo-2", href: "https://github.com/user/repo-2" },
        { name: "repo-3", href: "https://github.com/user/repo-3" },
      ];

      repos.forEach((repo) => {
        document.body.innerHTML = "";
        renderComponent(repo.name, repo.href);

        const link = screen.getByRole("link");

        expect(link.textContent?.trim()).toBe(repo.name);
        expect(link).toHaveAttribute("href", repo.href);
      });
    });

    test("It should handle repository names with hyphens", () => {
      const repoName = "my-awesome-project-2024";
      renderComponent(
        repoName,
        "https://github.com/user/my-awesome-project-2024"
      );

      const link = screen.getByRole("link");

      expect(link.textContent?.trim()).toBe(repoName);
    });

    test("It should handle repository names with dots", () => {
      const repoName = "package.name.v2";
      renderComponent(repoName, "https://github.com/user/package.name.v2");

      const link = screen.getByRole("link");

      expect(link.textContent?.trim()).toBe(repoName);
    });
  });

  describe("Structure validation", () => {
    test("It should have only one child element (anchor)", () => {
      const { container } = renderComponent(
        "test-repo",
        "https://github.com/user/test-repo"
      );

      const children = Array.from(container.children).filter(
        (child) => child.nodeType === Node.ELEMENT_NODE
      );

      expect(children.length).toBe(1);
      expect(children[0].tagName).toBe("A");
    });

    test("It should be ready to append to document", () => {
      const li = ItemLinkRepo({
        name: "test-repo",
        href: "https://github.com/user/test-repo",
      });

      expect(() => document.body.appendChild(li)).not.toThrow();
      expect(document.body.contains(li)).toBe(true);
    });

    test("It should be ready to append to ul element", () => {
      const ul = document.createElement("ul");
      const li = ItemLinkRepo({
        name: "test-repo",
        href: "https://github.com/user/test-repo",
      });

      expect(() => ul.appendChild(li)).not.toThrow();
      expect(ul.contains(li)).toBe(true);
    });
  });

  describe("Edge cases", () => {
    test("It should handle empty repository name", () => {
      const { container } = renderComponent("", "https://github.com/user/repo");

      const link = container.querySelector("a");

      expect(link).toBeInTheDocument();
      expect(link?.textContent?.trim()).toBe("");
    });

    test("It should handle special characters in repository name", () => {
      const specialName = "repo_name-v1.0.0";
      renderComponent(specialName, "https://github.com/user/repo_name-v1.0.0");

      const link = screen.getByRole("link");

      expect(link.textContent?.trim()).toBe(specialName);
    });

    test("It should handle different URL formats", () => {
      const urls = [
        "https://github.com/user/repo",
        "https://github.com/org/project",
        "https://gitlab.com/user/repo",
        "https://bitbucket.org/user/repo",
      ];

      urls.forEach((url) => {
        document.body.innerHTML = "";
        renderComponent("test-repo", url);

        const link = screen.getByRole("link");

        expect(link).toHaveAttribute("href", url);
      });
    });

    test("It should handle very long repository names", () => {
      const longName = "a".repeat(100);
      renderComponent(longName, "https://github.com/user/long-repo");

      const link = screen.getByRole("link");

      expect(link.textContent?.trim()).toBe(longName);
    });

    test("It should handle URLs with query parameters", () => {
      const href = "https://github.com/user/repo?tab=readme";
      renderComponent("repo", href);

      const link = screen.getByRole("link");

      expect(link).toHaveAttribute("href", href);
    });

    test("It should handle repository names with numbers", () => {
      const repoName = "project-2024-v2";
      renderComponent(repoName, "https://github.com/user/project-2024-v2");

      const link = screen.getByRole("link");

      expect(link.textContent?.trim()).toBe(repoName);
    });
  });

  describe("Accessibility", () => {
    test("It should be accessible via screen.getByRole", () => {
      renderComponent(
        "accessible-repo",
        "https://github.com/user/accessible-repo"
      );

      const link = screen.getByRole("link");

      expect(link).toBeInTheDocument();
    });

    test("It should have descriptive aria-label", () => {
      const repoName = "my-repo";
      renderComponent(repoName, "https://github.com/user/my-repo");

      const link = screen.getByRole("link");

      expect(link).toHaveAttribute("aria-label", `go to ${repoName}`);
    });

    test("It should be keyboard accessible", () => {
      renderComponent("keyboard-repo", "https://github.com/user/keyboard-repo");

      const link = screen.getByRole("link");

      link.focus();

      expect(document.activeElement).toBe(link);
    });
  });
});
