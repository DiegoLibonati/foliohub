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
  });

  describe("rendering", () => {
    it("should render a div with the card-init class", () => {
      renderComponent();
      expect(
        document.querySelector<HTMLDivElement>(".card-init")
      ).toBeInTheDocument();
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
