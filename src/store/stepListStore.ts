import { createStore } from "../lib/luna/luna-core";
import { withPersistence } from "../lib/luna/persist-middleware";

export type Formulario = "lunaLit" | "lunaLitPersistance" | "lunaLitMigrate" | "lunaJsMigrate";

export type State = {
  formulario: Formulario;
};

export type Actions = {
  setFormulario: (formulario: Formulario) => void;
};

const initialState: State = {
  formulario: "lunaLit",
};

const getState = (restoredState: Partial<State>) => ({
  formulario: restoredState.formulario ?? initialState.formulario,
});

export const lunaStepListStore = createStore<State & Actions>(
  withPersistence(
    (set, _, restoredState) => ({
      ...getState(restoredState),
      setFormulario: (formulario) => set({ formulario }),
    }),
    {
      key: "luna-stepList",
      version: 1,
      expiresIn: 1000 * 60 * 60 * 24,
    }
  )
);
