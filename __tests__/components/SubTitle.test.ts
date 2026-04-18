import { screen } from "@testing-library/dom";

import type { SubTitleProps } from "@/types/props";
import type { SubTitleComponent } from "@/types/components";

import SubTitle from "@/components/SubTitle/SubTitle";

const defaultProps: SubTitleProps = {
  id: "subtitle-test",
  children: "Hello World",
  className: "font-bold",
};

const renderComponent = (
  props: Partial<SubTitleProps> = {}
): SubTitleComponent => {
  const element = SubTitle({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("SubTitle", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render an h3 element", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    });

    it("should set the id attribute", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 3 })).toHaveAttribute(
        "id",
        "subtitle-test"
      );
    });

    it("should apply className alongside the base class", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 3 })).toHaveClass(
        "text-white",
        "font-bold"
      );
    });

    it("should render children as text content", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Hello World"
      );
    });

    it("should render children with HTML markup", () => {
      renderComponent({
        children: '100 <span class="font-semibold"> Followers</span>',
      });
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent("100");
      expect(heading).toHaveTextContent("Followers");
    });
  });

  describe("edge cases", () => {
    it("should render empty content when children is not provided", () => {
      const element = SubTitle({ id: defaultProps.id });
      document.body.appendChild(element);
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("");
    });

    it("should still apply the base class when className is undefined", () => {
      renderComponent({ className: undefined });
      expect(screen.getByRole("heading", { level: 3 })).toHaveClass(
        "text-white"
      );
    });
  });
});
