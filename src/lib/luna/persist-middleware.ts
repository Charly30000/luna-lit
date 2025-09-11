import { SetState, GetState } from "./luna-core";

export interface PersistOptions<T> {
  key: string;
  version: number;
  storage?: Storage; // localStorage o sessionStorage
  migrate?: (persistedState: any, version: number) => T;
  expiresIn?: number; // milisegundos
}

interface PersistedData<T> {
  state: Partial<T>;
  version: number;
  timestamp: number;
}

export function withPersistence<T>(
  initializer: (
    set: SetState<T>,
    get: GetState<T>,
    initialState: Partial<T>
  ) => T,
  options: PersistOptions<T>
) {
  const storage = options.storage || sessionStorage;

  return (set: SetState<T>, get: GetState<T>): T => {
    let persistedState: Partial<T> = {};

    try {
      const saved = storage.getItem(options.key);
      if (saved) {
        const parsed: PersistedData<T> = JSON.parse(saved);

        const isExpired =
          options.expiresIn &&
          Date.now() - parsed.timestamp > options.expiresIn;

        if (isExpired) {
          storage.removeItem(options.key);
        } else if (options.migrate) {
          persistedState = options.migrate(parsed.state, parsed.version);
          const toSave: PersistedData<T> = {
            state: persistedState,
            version: options.version || 1,
            timestamp: Date.now(),
          };
          try {
            storage.setItem(options.key, JSON.stringify(toSave));
          } catch (err) {
            console.error("No se pudo guardar el estado migrado:", err);
          }
        } else {
          persistedState = parsed.state;
        }
      }
    } catch (err) {
      console.error("No se pudo leer el estado persistido:", err);
    }

    const setState: SetState<T> = (partial) => {
      const nextState =
        typeof partial === "function" ? partial(get()) : partial;
      const merged = { ...get(), ...nextState };

      const toSave: PersistedData<T> = {
        state: merged,
        version: options.version || 1,
        timestamp: Date.now(),
      };

      try {
        storage.setItem(options.key, JSON.stringify(toSave));
      } catch (err) {
        console.error("No se pudo guardar el estado:", err);
      }

      set(nextState);
    };

    return initializer(setState, get, persistedState);
  };
}
