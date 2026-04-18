import { Store } from "@/core/store";

interface TestState extends Record<string, unknown> {
  count: number;
  name: string;
}

class TestStore extends Store<TestState> {
  constructor() {
    super({ count: 0, name: "initial" });
  }
}

describe("Store", () => {
  let store: TestStore;

  beforeEach(() => {
    store = new TestStore();
  });

  describe("getState", () => {
    it("should return the initial state", () => {
      expect(store.getState()).toEqual({ count: 0, name: "initial" });
    });

    it("should reflect updated values after setState", () => {
      store.setState({ count: 5 });
      expect(store.getState().count).toBe(5);
      expect(store.getState().name).toBe("initial");
    });
  });

  describe("get", () => {
    it("should return the value for the given key", () => {
      expect(store.get("count")).toBe(0);
      expect(store.get("name")).toBe("initial");
    });

    it("should return the updated value after setState", () => {
      store.setState({ count: 5 });
      expect(store.get("count")).toBe(5);
    });
  });

  describe("setState", () => {
    it("should update only the specified keys", () => {
      store.setState({ count: 10 });
      expect(store.getState()).toEqual({ count: 10, name: "initial" });
    });

    it("should update multiple keys at once", () => {
      store.setState({ count: 3, name: "updated" });
      expect(store.getState()).toEqual({ count: 3, name: "updated" });
    });

    it("should notify listeners for changed keys", () => {
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 7 });
      expect(mockListener).toHaveBeenCalledWith(7);
    });

    it("should not notify listeners when value does not change", () => {
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 0 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should only notify listeners for keys that actually changed", () => {
      const mockCountListener = jest.fn();
      const mockNameListener = jest.fn();
      store.subscribe("count", mockCountListener);
      store.subscribe("name", mockNameListener);
      store.setState({ count: 1 });
      expect(mockCountListener).toHaveBeenCalledTimes(1);
      expect(mockNameListener).not.toHaveBeenCalled();
    });
  });

  describe("subscribe", () => {
    it("should invoke the listener with the new value when the key changes", () => {
      const mockListener = jest.fn();
      store.subscribe("name", mockListener);
      store.setState({ name: "changed" });
      expect(mockListener).toHaveBeenCalledWith("changed");
    });

    it("should support multiple listeners for the same key", () => {
      const mockListenerA = jest.fn();
      const mockListenerB = jest.fn();
      store.subscribe("count", mockListenerA);
      store.subscribe("count", mockListenerB);
      store.setState({ count: 99 });
      expect(mockListenerA).toHaveBeenCalledWith(99);
      expect(mockListenerB).toHaveBeenCalledWith(99);
    });

    it("should return an unsubscribe function", () => {
      const mockListener = jest.fn();
      const unsubscribe = store.subscribe("count", mockListener);
      expect(typeof unsubscribe).toBe("function");
    });

    it("should stop notifying the listener after unsubscribing", () => {
      const mockListener = jest.fn();
      const unsubscribe = store.subscribe("count", mockListener);
      unsubscribe();
      store.setState({ count: 5 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should not affect other listeners when one unsubscribes", () => {
      const mockListenerA = jest.fn();
      const mockListenerB = jest.fn();
      const unsubscribeA = store.subscribe("count", mockListenerA);
      store.subscribe("count", mockListenerB);
      unsubscribeA();
      store.setState({ count: 42 });
      expect(mockListenerA).not.toHaveBeenCalled();
      expect(mockListenerB).toHaveBeenCalledWith(42);
    });

    it("should do nothing when unsubscribe is called multiple times", () => {
      const mockListener = jest.fn();
      const unsubscribe = store.subscribe("count", mockListener);
      unsubscribe();
      unsubscribe();
      store.setState({ count: 5 });
      expect(mockListener).not.toHaveBeenCalled();
    });
  });
});
