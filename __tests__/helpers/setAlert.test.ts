import { setAlert, clearAlert } from "@/helpers/setAlert";

const setupDOM = (): {
  alertRoot: HTMLDivElement;
  alertText: HTMLHeadingElement;
} => {
  const alertRoot = document.createElement("div");
  alertRoot.className = "alert";
  alertRoot.style.opacity = "0";
  const alertText = document.createElement("h2");
  alertText.className = "alert__text";
  alertRoot.appendChild(alertText);
  document.body.appendChild(alertRoot);
  return { alertRoot, alertText };
};

describe("setAlert", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    clearAlert();
    document.body.innerHTML = "";
    jest.useRealTimers();
  });

  describe("setAlert", () => {
    it("should set the innerHTML of the alert text element", () => {
      const { alertText } = setupDOM();
      setAlert("Test message");
      expect(alertText.innerHTML).toBe("Test message");
    });

    it("should set the opacity of the alert root to 100", () => {
      const { alertRoot } = setupDOM();
      setAlert("Test message");
      expect(alertRoot.style.opacity).toBe("1");
    });

    it("should reset opacity to 0 after 2000ms", () => {
      const { alertRoot } = setupDOM();
      setAlert("Test message");
      jest.advanceTimersByTime(2000);
      expect(alertRoot.style.opacity).toBe("0");
    });

    it("should cancel the previous timeout when called again before it expires", () => {
      const { alertRoot, alertText } = setupDOM();
      setAlert("First message");
      jest.advanceTimersByTime(1000);
      setAlert("Second message");
      expect(alertText.innerHTML).toBe("Second message");
      expect(alertRoot.style.opacity).toBe("1");
      jest.advanceTimersByTime(2000);
      expect(alertRoot.style.opacity).toBe("0");
    });

    it("should not throw when DOM elements are absent", () => {
      expect(() => {
        setAlert("No DOM");
      }).not.toThrow();
    });

    it("should not update the DOM when alertRoot is missing but alertText exists", () => {
      const alertText = document.createElement("h2");
      alertText.className = "alert__text";
      document.body.appendChild(alertText);
      expect(() => {
        setAlert("No root");
      }).not.toThrow();
    });
  });

  describe("clearAlert", () => {
    it("should clear the innerHTML of the alert text", () => {
      const { alertText } = setupDOM();
      setAlert("Some message");
      clearAlert();
      expect(alertText.innerHTML).toBe("");
    });

    it("should set the opacity to 0", () => {
      const { alertRoot } = setupDOM();
      setAlert("Some message");
      clearAlert();
      expect(alertRoot.style.opacity).toBe("0");
    });

    it("should cancel the pending timeout", () => {
      const { alertRoot } = setupDOM();
      setAlert("Some message");
      clearAlert();
      jest.advanceTimersByTime(2000);
      expect(alertRoot.style.opacity).toBe("0");
    });

    it("should not throw when called with no pending timeout", () => {
      setupDOM();
      expect(() => {
        clearAlert();
      }).not.toThrow();
    });

    it("should not throw when DOM elements are absent", () => {
      expect(() => {
        clearAlert();
      }).not.toThrow();
    });
  });
});
