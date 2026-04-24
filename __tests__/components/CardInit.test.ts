import { screen } from "@testing-library/dom";

import type { CardInitComponent } from "@/types/components";

import CardInit from "@/components/CardInit/CardInit";

const renderComponent = (): CardInitComponent => {
  const element = CardInit();
  document.body.appendChild(element);
  return element;
};

describe("CardInit", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a div with the card-init class", () => {
      const element = renderComponent();
      expect(element).toHaveClass("card-init");
    });

    it("should apply the base CSS classes", () => {
      const element = renderComponent();
      expect(element).toHaveClass("bg-secondary", "rounded-lg");
    });

    it("should render an h1 heading", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("should display the instruction message in the heading", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Write the name of the GitHub Profile in the input"
      );
    });
  });
});
