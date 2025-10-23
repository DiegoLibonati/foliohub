import { setAlert } from "@src/helpers/setAlert";

describe("setAlert.ts", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    document.body.innerHTML = `
      <div class="alert" style="opacity: 0;">
        <h2 class="alert__text"></h2>
      </div>
    `;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    document.body.innerHTML = "";
  });

  describe("Alert display", () => {
    test("It should display alert message", () => {
      const message = "Test alert message";
      const alertText = document.querySelector<HTMLHeadingElement>(".alert__text");

      setAlert(message);

      expect(alertText?.innerHTML).toBe(message);
    });

    test("It should set alert opacity to 100", () => {
      const message = "Test message";
      const alertRoot = document.querySelector<HTMLDivElement>(".alert");

      setAlert(message);

      expect(alertRoot?.style.opacity).toBe("100");
    });

    test("It should display different messages", () => {
      const alertText = document.querySelector<HTMLHeadingElement>(".alert__text");

      setAlert("First message");
      expect(alertText?.innerHTML).toBe("First message");

      setAlert("Second message");
      expect(alertText?.innerHTML).toBe("Second message");
    });

    test("It should display message with HTML entities", () => {
      const message = "User not found ❌";
      const alertText = document.querySelector<HTMLHeadingElement>(".alert__text");

      setAlert(message);

      expect(alertText?.innerHTML).toBe(message);
    });

    test("It should display empty message", () => {
      const alertText = document.querySelector<HTMLHeadingElement>(".alert__text");

      setAlert("");

      expect(alertText?.innerHTML).toBe("");
    });
  });

  describe("Alert timeout", () => {
    test("It should hide alert after 2000ms", () => {
      const alertRoot = document.querySelector<HTMLDivElement>(".alert");

      setAlert("Test message");

      expect(alertRoot?.style.opacity).toBe("100");

      jest.advanceTimersByTime(2000);

      expect(alertRoot?.style.opacity).toBe("0");
    });

    test("It should not hide alert before 2000ms", () => {
      const alertRoot = document.querySelector<HTMLDivElement>(".alert");

      setAlert("Test message");

      expect(alertRoot?.style.opacity).toBe("100");

      jest.advanceTimersByTime(1999);

      expect(alertRoot?.style.opacity).toBe("100");
    });

    test("It should hide alert exactly at 2000ms", () => {
      const alertRoot = document.querySelector<HTMLDivElement>(".alert");

      setAlert("Test message");

      jest.advanceTimersByTime(1999);
      expect(alertRoot?.style.opacity).toBe("100");

      jest.advanceTimersByTime(1);
      expect(alertRoot?.style.opacity).toBe("0");
    });
  });

  describe("Multiple alerts", () => {
    test("It should handle consecutive alerts", () => {
      const alertRoot = document.querySelector<HTMLDivElement>(".alert");
      const alertText = document.querySelector<HTMLHeadingElement>(".alert__text");

      setAlert("First alert");
      expect(alertText?.innerHTML).toBe("First alert");
      expect(alertRoot?.style.opacity).toBe("100");

      jest.advanceTimersByTime(1000);

      setAlert("Second alert");
      expect(alertText?.innerHTML).toBe("Second alert");
      expect(alertRoot?.style.opacity).toBe("100");

      jest.advanceTimersByTime(2000);
      expect(alertRoot?.style.opacity).toBe("0");
    });

    test("It should keep all timers active without clearTimeout", () => {
      const alertRoot = document.querySelector<HTMLDivElement>(".alert");

      setAlert("First alert");
      expect(alertRoot?.style.opacity).toBe("100");

      jest.advanceTimersByTime(1500);

      setAlert("Second alert");
      expect(alertRoot?.style.opacity).toBe("100");

      jest.advanceTimersByTime(500);
      expect(alertRoot?.style.opacity).toBe("0");
    });

    test("It should handle rapid consecutive calls", () => {
      const alertRoot = document.querySelector<HTMLDivElement>(".alert");
      const alertText = document.querySelector<HTMLHeadingElement>(".alert__text");

      setAlert("Alert 1");
      setAlert("Alert 2");
      setAlert("Alert 3");

      expect(alertText?.innerHTML).toBe("Alert 3");
      expect(alertRoot?.style.opacity).toBe("100");

      jest.advanceTimersByTime(2000);
      expect(alertRoot?.style.opacity).toBe("0");
    });
  });

  describe("DOM manipulation", () => {
    test("It should not throw error when alert elements exist", () => {
      expect(() => {
        setAlert("Test message");
      }).not.toThrow();
    });

    test("It should update innerHTML property", () => {
      const alertText = document.querySelector<HTMLHeadingElement>(".alert__text");
      const initialHTML = alertText?.innerHTML;

      setAlert("New message");

      expect(alertText?.innerHTML).not.toBe(initialHTML);
      expect(alertText?.innerHTML).toBe("New message");
    });

    test("It should update opacity style property", () => {
      const alertRoot = document.querySelector<HTMLDivElement>(".alert");

      setAlert("Test");

      expect(alertRoot?.style.opacity).toBe("100");
    });
  });

  describe("Edge cases", () => {
    test("It should handle special characters with innerHTML escaping", () => {
      const alertText = document.querySelector<HTMLHeadingElement>(".alert__text");
      const message = "Special: <>&\"'";

      setAlert(message);

      expect(alertText?.innerHTML).toBe("Special: &lt;&gt;&amp;\"'");
    });

    test("It should handle long messages", () => {
      const alertText = document.querySelector<HTMLHeadingElement>(".alert__text");
      const longMessage = "A".repeat(1000);

      setAlert(longMessage);

      expect(alertText?.innerHTML).toBe(longMessage);
    });

    test("It should handle messages with line breaks", () => {
      const alertText = document.querySelector<HTMLHeadingElement>(".alert__text");
      const message = "Line 1\nLine 2";

      setAlert(message);

      expect(alertText?.innerHTML).toBe(message);
    });

    test("It should handle unicode characters", () => {
      const alertText = document.querySelector<HTMLHeadingElement>(".alert__text");
      const message = "✅ Success! 🎉";

      setAlert(message);

      expect(alertText?.innerHTML).toBe(message);
    });
  });

  describe("Timer management", () => {
    test("It should create setTimeout", () => {
      const setTimeoutSpy = jest.spyOn(global, "setTimeout");

      setAlert("Test");

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 2000);

      setTimeoutSpy.mockRestore();
    });

    test("It should execute callback after timeout", () => {
      const alertRoot = document.querySelector<HTMLDivElement>(".alert");

      setAlert("Test message");
      expect(alertRoot?.style.opacity).toBe("100");

      jest.runAllTimers();

      expect(alertRoot?.style.opacity).toBe("0");
    });

    test("It should create multiple pending timers without clearing", () => {
      setAlert("First");
      setAlert("Second");
      setAlert("Third");

      expect(jest.getTimerCount()).toBe(3);
    });
  });
});
