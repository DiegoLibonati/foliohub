import { setAlert, clearAlert } from "@/helpers/setAlert";

describe("setAlert and clearAlert", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    const alertRoot = document.createElement("div");
    alertRoot.className = "alert";
    alertRoot.style.opacity = "0";

    const alertText = document.createElement("h2");
    alertText.className = "alert__text";

    alertRoot.appendChild(alertText);
    document.body.appendChild(alertRoot);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe("setAlert", () => {
    it("should display alert message", () => {
      setAlert("Test message");

      const alertText =
        document.querySelector<HTMLHeadingElement>(".alert__text");
      const alertRoot = document.querySelector<HTMLDivElement>(".alert");

      expect(alertText?.innerHTML).toBe("Test message");
      expect(alertRoot?.style.opacity).toBe("100");
    });

    it("should hide alert after timeout", () => {
      setAlert("Test message");

      const alertRoot = document.querySelector<HTMLDivElement>(".alert");
      expect(alertRoot?.style.opacity).toBe("100");

      jest.advanceTimersByTime(2000);

      expect(alertRoot?.style.opacity).toBe("0");
    });

    it("should replace previous alert message", () => {
      setAlert("First message");
      setAlert("Second message");

      const alertText =
        document.querySelector<HTMLHeadingElement>(".alert__text");
      expect(alertText?.innerHTML).toBe("Second message");
    });

    it("should not throw error when alert elements do not exist", () => {
      document.body.innerHTML = "";

      expect(() => {
        setAlert("Test message");
      }).not.toThrow();
    });
  });

  describe("clearAlert", () => {
    it("should clear alert message and opacity", () => {
      setAlert("Test message");

      const alertText =
        document.querySelector<HTMLHeadingElement>(".alert__text");
      const alertRoot = document.querySelector<HTMLDivElement>(".alert");

      expect(alertText?.innerHTML).toBe("Test message");
      expect(alertRoot?.style.opacity).toBe("100");

      clearAlert();

      expect(alertText?.innerHTML).toBe("");
      expect(alertRoot?.style.opacity).toBe("0");
    });

    it("should clear timeout when clearing alert", () => {
      const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

      setAlert("Test message");
      clearAlert();

      expect(clearTimeoutSpy).toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
    });

    it("should not throw error when alert elements do not exist", () => {
      document.body.innerHTML = "";

      expect(() => {
        clearAlert();
      }).not.toThrow();
    });
  });
});
