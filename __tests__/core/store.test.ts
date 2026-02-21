import { Store } from "@/core/store";

interface TestState extends Record<string, unknown> {
  counter: number;
  name: string;
}

class TestStore extends Store<TestState> {}

describe("Store", () => {
  let store: TestStore;

  beforeEach(() => {
    store = new TestStore({ counter: 0, name: "test" });
  });

  it("should initialize with initial state", () => {
    expect(store.getState()).toEqual({ counter: 0, name: "test" });
  });

  it("should get value by key", () => {
    expect(store.get("counter")).toBe(0);
    expect(store.get("name")).toBe("test");
  });

  it("should update state", () => {
    store.setState({ counter: 5 });

    expect(store.getState()).toEqual({ counter: 5, name: "test" });
  });

  it("should notify listeners when state changes", () => {
    const listener = jest.fn();

    store.subscribe("counter", listener);
    store.setState({ counter: 10 });

    expect(listener).toHaveBeenCalledWith(10);
  });

  it("should not notify listeners when value does not change", () => {
    const listener = jest.fn();

    store.subscribe("counter", listener);
    store.setState({ counter: 0 });

    expect(listener).not.toHaveBeenCalled();
  });

  it("should unsubscribe listener", () => {
    const listener = jest.fn();

    const unsubscribe = store.subscribe("counter", listener);
    unsubscribe();

    store.setState({ counter: 20 });

    expect(listener).not.toHaveBeenCalled();
  });
});
