import "@testing-library/jest-dom";

const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]): void => {
  if (
    String(args[0]).includes(
      "Not implemented: HTMLFormElement.prototype.requestSubmit"
    )
  )
    return;
  originalConsoleError(...args);
};
