import { screen } from "@testing-library/dom";

import { CardInit } from "@src/components/CardInit/CardInit";

type RenderComponent = {
  container: HTMLDivElement;
};

const renderComponent = (): RenderComponent => {
  const container = CardInit();

  document.body.appendChild(container);

  return {
    container: container,
  };
};

describe("CardInit", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests", () => {
    test("It should create a div element with correct structure", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toContain("card-init");
    });

    test("It should be accessible via screen query", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { level: 1 });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass("text-white", "text-center");
    });

    test("It should have correct base styling classes", () => {
      const { container } = renderComponent();

      expect(container.className).toContain("flex");
      expect(container.className).toContain("items-center");
      expect(container.className).toContain("justify-center");
      expect(container.className).toContain("bg-secondary");
      expect(container.className).toContain("rounded-lg");
      expect(container.className).toContain("p-2");
    });

    test("It should have correct responsive width classes", () => {
      const { container } = renderComponent();

      expect(container.className).toContain("w-[90%]");
      expect(container.className).toContain("md:w-[55%]");
      expect(container.className).toContain("xl:w-[40%]");
      expect(container.className).toContain("2xl:w-[35%]");
    });

    test("It should have full height class", () => {
      const { container } = renderComponent();

      expect(container.className).toContain("h-full");
    });
  });

  describe("Content rendering", () => {
    test("It should render the correct text content", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { level: 1 });

      expect(heading.textContent?.trim()).toBe(
        "Write the name of the GitHub Profile in the input ☝️."
      );
    });

    test("It should contain an h1 element", () => {
      const { container } = renderComponent();

      const h1 = container.querySelector<HTMLHeadingElement>("h1");

      expect(h1).not.toBeNull();
      expect(h1?.tagName).toBe("H1");
    });

    test("It should have correct heading styling", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { level: 1 });

      expect(heading.className).toContain("text-white");
      expect(heading.className).toContain("text-center");
    });

    test("It should render emoji in text content", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { level: 1 });

      expect(heading.textContent).toContain("☝️");
    });
  });

  describe("Structure validation", () => {
    test("It should have only one child element (h1)", () => {
      const { container } = renderComponent();

      expect(container.children.length).toBe(1);
      expect(container.children[0].tagName).toBe("H1");
    });

    test("It should be ready to append to document", () => {
      const container = CardInit();

      expect(() => document.body.appendChild(container)).not.toThrow();
      expect(document.body.contains(container)).toBe(true);
    });
  });
});
