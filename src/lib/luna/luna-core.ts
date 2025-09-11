export type Listener = () => void;
export type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
export type GetState<T> = () => T;

export interface StoreApi<T> {
  getState: GetState<T>;
  setState: SetState<T>;
  subscribe: (listener: Listener) => () => void;
  extend: (extension: Partial<T>) => void;
}

export function createStore<T>(
  initializer: (set: SetState<T>, get: GetState<T>) => T
): StoreApi<T> {
  let state: T;
  const listeners = new Set<Listener>();

  const getState: GetState<T> = () => state;

  const setState: SetState<T> = (partial) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    state = { ...state, ...nextState };
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const extend = (extension: Partial<T>) => {
    state = { ...state, ...extension };
    listeners.forEach((listener) => listener());
  };

  state = initializer(setState, getState);

  return { getState, setState, subscribe, extend };
}
