import { ReactiveController, ReactiveControllerHost } from "lit";

export class LunaController<T, U> implements ReactiveController {
  private unsubscribe!: () => void;
  public value!: U;
  private host: ReactiveControllerHost;
  private store: { getState: () => T; subscribe: (cb: () => void) => () => void };
  private selector: (state: T) => U;

  constructor(
    host: ReactiveControllerHost,
    store: { getState: () => T; subscribe: (cb: () => void) => () => void },
    selector: (state: T) => U
  ) {
    this.host = host;
    this.store = store;
    this.selector = selector;

    this.value = this.selector(this.store.getState());
    this.unsubscribe = this.store.subscribe(() => {
      this.value = this.selector(this.store.getState());
      this.host.requestUpdate();
    });
    this.host.addController(this);
  }

  hostDisconnected() {
    this.unsubscribe();
  }
}
