import { Listener } from "@src/entities/store";

export abstract class Store<T extends Record<string, unknown>> {
  protected state: T;
  protected listeners: { [K in keyof T]: Listener<T[K]>[] };

  constructor(initialState: T) {
    this.state = initialState;

    this.listeners = Object.keys(initialState).reduce((acc, key) => {
      acc[key as keyof T] = [];
      return acc;
    }, {} as { [K in keyof T]: Listener<T[K]>[] });
  }

  public getState(): Readonly<T> {
    return this.state;
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.state[key];
  }

  public setState(newState: Partial<T>): void {
    const prevState = this.state;
    this.state = { ...this.state, ...newState };

    (Object.keys(newState) as (keyof T)[]).forEach(
      <K extends keyof T>(key: K) => {
        const oldValue = prevState[key];
        const newValue = this.state[key];
        if (oldValue !== newValue) {
          this.listeners[key].forEach((listener) => listener(newValue));
        }
      }
    );
  }

  public subscribe<K extends keyof T>(
    key: K,
    listener: Listener<T[K]>
  ): () => void {
    this.listeners[key].push(listener);

    return () => {
      const arr = this.listeners[key];
      const index = arr.indexOf(listener);
      if (index !== -1) arr.splice(index, 1);
    };
  }
}