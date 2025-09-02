import "@testing-library/jest-dom";

jest.mock("../src/constants/config.ts", () => ({
  get CONFIG() {
    return {
      API_URL: "https://api.github.com",
    };
  },
}));
