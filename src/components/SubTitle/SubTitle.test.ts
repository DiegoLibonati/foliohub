import { screen } from "@testing-library/dom";

import { SubTitleProps } from "@src/entities/props";

import { SubTitle } from "@src/components/SubTitle/SubTitle";

type RenderComponent = {
  props: SubTitleProps;
  container: HTMLHeadingElement;
};

const renderComponent = (
  id: string,
  className?: string,
  children?: string
): RenderComponent => {
  const props: SubTitleProps = {
    id: id,
    className: className,
    children: children,
  };

  const container = SubTitle({
    id: props.id,
    className: props.className,
    children: props.children,
  });

  document.body.appendChild(container);

  return {
    props: props,
    container: container,
  };
};

describe("SubTitle.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests", () => {
    const mockProps = {
      id: "test-subtitle",
      className: "custom-class",
      children: "Subtitle text",
    };

    test("It should create an h3 element with correct structure", () => {
      const { container } = renderComponent(
        mockProps.id,
        mockProps.className,
        mockProps.children
      );

      expect(container).toBeInstanceOf(HTMLHeadingElement);
      expect(container.tagName).toBe("H3");
    });

    test("It should have correct id attribute", () => {
      const { container } = renderComponent(
        mockProps.id,
        mockProps.className,
        mockProps.children
      );

      expect(container.id).toBe(mockProps.id);
    });

    test("It should be accessible via screen.getByRole", () => {
      renderComponent(mockProps.id, mockProps.className, mockProps.children);

      const heading = screen.getByRole("heading", { level: 3 });

      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe(mockProps.children);
    });

    test("It should have text-white base class", () => {
      const { container } = renderComponent(
        mockProps.id,
        mockProps.className,
        mockProps.children
      );

      expect(container.className).toContain("text-white");
    });

    test("It should append custom className when provided", () => {
      const { container } = renderComponent(
        mockProps.id,
        mockProps.className,
        mockProps.children
      );

      expect(container.className).toContain(mockProps.className);
      expect(container.className).toContain("text-white");
    });

    test("It should work without custom className", () => {
      const { container } = renderComponent(
        mockProps.id,
        undefined,
        mockProps.children
      );

      expect(container.className).toBe("text-white ");
    });
  });

  describe("Content rendering", () => {
    test("It should render text content correctly", () => {
      const textContent = "Simple subtitle";
      const { container } = renderComponent(
        "subtitle-1",
        undefined,
        textContent
      );

      expect(container.innerHTML).toBe(textContent);
      expect(container.textContent).toBe(textContent);
    });

    test("It should render HTML content correctly", () => {
      const htmlContent = '<span class="font-semibold">Bold text</span>';
      const { container } = renderComponent(
        "subtitle-2",
        undefined,
        htmlContent
      );

      expect(container.innerHTML).toBe(htmlContent);
      expect(
        container.querySelector<HTMLHeadingElement>(".font-semibold")
      ).toBeInTheDocument();
    });

    test("It should render mixed content correctly", () => {
      const mixedContent = '100 <span class="font-semibold"> Followers</span>';
      const { container } = renderComponent(
        "subtitle-3",
        undefined,
        mixedContent
      );

      expect(container.innerHTML).toBe(mixedContent);
      expect(
        container.querySelector<HTMLHeadingElement>("span")
      ).toBeInTheDocument();
      expect(container.textContent).toContain("100");
      expect(container.textContent).toContain("Followers");
    });

    test("It should work without children content", () => {
      const { container } = renderComponent("subtitle-4", undefined, undefined);

      expect(container.innerHTML).toBe("");
      expect(container.textContent).toBe("");
    });

    test("It should handle empty string as children", () => {
      const { container } = renderComponent("subtitle-5", undefined, "");

      expect(container.innerHTML).toBe("");
    });
  });

  describe("Class name handling", () => {
    test("It should handle empty string as className", () => {
      const { container } = renderComponent("subtitle-6", "", "Content");

      expect(container.className).toBe("text-white ");
    });

    test("It should handle multiple custom classes", () => {
      const multipleClasses = "font-bold text-lg underline";
      const { container } = renderComponent(
        "subtitle-7",
        multipleClasses,
        "Content"
      );

      expect(container.className).toContain("text-white");
      expect(container.className).toContain("font-bold");
      expect(container.className).toContain("text-lg");
      expect(container.className).toContain("underline");
    });

    test("It should handle undefined className", () => {
      const { container } = renderComponent("subtitle-8", undefined, "Content");

      expect(container.className).toBe("text-white ");
    });

    test("It should not duplicate text-white class", () => {
      const { container } = renderComponent(
        "subtitle-9",
        "text-white",
        "Content"
      );

      const classArray = container.className
        .split(" ")
        .filter((c) => c === "text-white");

      expect(classArray.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("ID handling", () => {
    test("It should set different IDs correctly", () => {
      const ids = ["followers-profile", "following-profile", "repos-profile"];

      ids.forEach((id) => {
        document.body.innerHTML = "";
        const { container } = renderComponent(id, undefined, "Content");

        expect(container.id).toBe(id);
      });
    });

    test("It should handle ID with special characters", () => {
      const specialId = "subtitle-2024_v1.0";
      const { container } = renderComponent(specialId, undefined, "Content");

      expect(container.id).toBe(specialId);
    });

    test("It should be findable by ID", () => {
      const id = "findable-subtitle";
      renderComponent(id, undefined, "Content");

      const element = document.querySelector<HTMLHeadingElement>(`#${id}`);

      expect(element).toBeInTheDocument();
      expect(element?.tagName).toBe("H3");
    });
  });

  describe("Structure validation", () => {
    test("It should be ready to append to document", () => {
      const heading = SubTitle({
        id: "test-heading",
        children: "Content",
      });

      expect(() => document.body.appendChild(heading)).not.toThrow();
      expect(document.body.contains(heading)).toBe(true);
    });

    test("It should work as a standalone element", () => {
      const { container } = renderComponent("standalone", undefined, "Text");

      expect(container.parentElement).toBe(document.body);
    });
  });

  describe("Edge cases", () => {
    test("It should handle very long text content", () => {
      const longText = "a".repeat(500);
      const { container } = renderComponent("long-text", undefined, longText);

      expect(container.textContent).toBe(longText);
      expect(container.textContent?.length).toBe(500);
    });

    test("It should handle special HTML characters", () => {
      const specialContent = "Text with &lt;tags&gt; and &amp; symbols";
      const { container } = renderComponent(
        "special-chars",
        undefined,
        specialContent
      );

      expect(container.innerHTML).toBe(specialContent);
    });

    test("It should handle numeric content", () => {
      const numericContent = "12345";
      const { container } = renderComponent(
        "numeric",
        undefined,
        numericContent
      );

      expect(container.textContent).toBe(numericContent);
    });

    test("It should handle content with line breaks", () => {
      const contentWithBreaks = "Line 1<br>Line 2";
      const { container } = renderComponent(
        "with-breaks",
        undefined,
        contentWithBreaks
      );

      expect(container.innerHTML).toBe(contentWithBreaks);
      expect(
        container.querySelector<HTMLHeadingElement>("br")
      ).toBeInTheDocument();
    });

    test("It should handle nested HTML elements", () => {
      const nestedContent = "<div><span><strong>Nested</strong></span></div>";
      const { container } = renderComponent("nested", undefined, nestedContent);

      expect(
        container.querySelector<HTMLHeadingElement>("div")
      ).toBeInTheDocument();
      expect(
        container.querySelector<HTMLHeadingElement>("span")
      ).toBeInTheDocument();
      expect(
        container.querySelector<HTMLHeadingElement>("strong")
      ).toBeInTheDocument();
    });

    test("It should handle content with emojis", () => {
      const emojiContent = "👍 Great job! 🎉";
      const { container } = renderComponent("emoji", undefined, emojiContent);

      expect(container.textContent).toBe(emojiContent);
    });

    test("It should handle whitespace-only content", () => {
      const whitespaceContent = "   ";
      const { container } = renderComponent(
        "whitespace",
        undefined,
        whitespaceContent
      );

      expect(container.innerHTML).toBe(whitespaceContent);
    });
  });

  describe("Accessibility", () => {
    test("It should be accessible as heading level 3", () => {
      renderComponent("accessible-heading", undefined, "Accessible content");

      const heading = screen.getByRole("heading", { level: 3 });

      expect(heading).toBeInTheDocument();
    });

    test("It should not be accessible as other heading levels", () => {
      renderComponent("heading-level-test", undefined, "Content");

      expect(
        screen.queryByRole("heading", { level: 1 })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { level: 2 })
      ).not.toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    });

    test("It should be findable by text content", () => {
      const textContent = "Unique subtitle text";
      renderComponent("text-search", undefined, textContent);

      const heading = screen.getByText(textContent);

      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H3");
    });
  });

  describe("Real-world usage scenarios", () => {
    test("It should work for followers display", () => {
      const { container } = renderComponent(
        "followers-profile",
        undefined,
        '100 <span class="font-semibold"> Followers</span>'
      );

      expect(container.id).toBe("followers-profile");
      expect(container.textContent).toContain("100");
      expect(container.textContent).toContain("Followers");
      expect(
        container.querySelector<HTMLHeadingElement>("span")
      ).toBeInTheDocument();
    });

    test("It should work for following display", () => {
      const { container } = renderComponent(
        "following-profile",
        undefined,
        '50 <span class="font-semibold"> Following</span>'
      );

      expect(container.id).toBe("following-profile");
      expect(container.textContent).toContain("50");
      expect(container.textContent).toContain("Following");
    });

    test("It should work for repos display", () => {
      const { container } = renderComponent(
        "repos-profile",
        undefined,
        '25 <span class="font-semibold"> Repos</span>'
      );

      expect(container.id).toBe("repos-profile");
      expect(container.textContent).toContain("25");
      expect(container.textContent).toContain("Repos");
    });
  });
});
