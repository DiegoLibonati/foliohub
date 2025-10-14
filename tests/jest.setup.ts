import "@testing-library/jest-dom";

jest.mock("@src/constants/envs", () => {
  return { __esModule: true, default: { API_URL: "https://api.github.com" } };
});
