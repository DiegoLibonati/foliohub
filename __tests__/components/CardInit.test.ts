import { screen } from "@testing-library/dom";

import type { CardInitComponent } from "@/types/components";

import CardInit from "@/components/CardInit/CardInit";

const renderComponent = (): CardInitComponent => {
  const container = CardInit();
  document.body.appendChild(container);
  return container;
};

describe("CardInit Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render card with correct structure", () => {
    renderComponent();

    const card = document.querySelector<HTMLDivElement>(".card-init");
    expect(card).toBeInTheDocument();
  });

  it("should render instruction message", () => {
    renderComponent();

    expect(
      screen.getByText(/Write the name of the GitHub Profile in the input/)
    ).toBeInTheDocument();
  });
});
