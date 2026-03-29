import type { SubTitleProps } from "@/types/props";
import type { SubTitleComponent } from "@/types/components";

import SubTitle from "@/components/SubTitle/SubTitle";

const renderComponent = (props: SubTitleProps): SubTitleComponent => {
  const container = SubTitle(props);
  document.body.appendChild(container);
  return container;
};

describe("SubTitle Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: SubTitleProps = {
    id: "test-subtitle",
    children: "Test Content",
  };

  it("should render h3 with correct attributes", () => {
    renderComponent(defaultProps);

    const heading = document.querySelector<HTMLHeadingElement>("h3");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute("id", "test-subtitle");
    expect(heading).toHaveClass("text-white");
    expect(heading?.innerHTML).toBe("Test Content");
  });

  it("should apply additional className when provided", () => {
    const propsWithClass: SubTitleProps = {
      ...defaultProps,
      className: "custom-class",
    };

    renderComponent(propsWithClass);

    const heading = document.querySelector<HTMLHeadingElement>("h3");
    expect(heading).toHaveClass("text-white", "custom-class");
  });

  it("should render HTML content", () => {
    const propsWithHTML: SubTitleProps = {
      id: "test",
      children: '10 <span class="font-semibold">Followers</span>',
    };

    renderComponent(propsWithHTML);

    const heading = document.querySelector<HTMLHeadingElement>("h3");
    expect(heading?.innerHTML).toContain("Followers");
    expect(heading?.querySelector<HTMLSpanElement>("span")).toHaveClass(
      "font-semibold"
    );
  });
});
