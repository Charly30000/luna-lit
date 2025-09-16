import { createStore } from "../lib/luna/luna-core";
import { withPersistence } from "../lib/luna/persist-middleware";

export enum Color {
  Rojo = "Rojo",
  Azul = "Azul",
  Plateado = "Plateado",
  Dorado = "Dorado",
}

export type State = {
  color: Color;
  rpm: number;
  marca: string;
  caracteristicas: {
    puertas: number;
    ruedas: number;
    electrico: boolean;
  };
  propietarios: string[];
};

export type Actions = {
  setColor: (color: Color) => void;
  setRpm: (rpm: number) => void;
  setMarca: (marca: string) => void;
  setCaracteristicas: (caracteristicas: State["caracteristicas"]) => void;
  setPropietarios: (propietarios: string[]) => void;
};

const initialState: State = {
  color: Color.Rojo,
  rpm: 0,
  marca: "",
  caracteristicas: {
    puertas: 0,
    ruedas: 0,
    electrico: false,
  },
  propietarios: ["", ""],
};

const getState = (restoredState: Partial<State>) => ({
  color: restoredState.color ?? initialState.color,
  rpm: restoredState.rpm ?? initialState.rpm,
  marca: restoredState.marca ?? initialState.marca,
  caracteristicas: {
    puertas:
      restoredState.caracteristicas?.puertas ??
      initialState.caracteristicas.puertas,
    ruedas:
      restoredState.caracteristicas?.ruedas ??
      initialState.caracteristicas.ruedas,
    electrico:
      restoredState.caracteristicas?.electrico ??
      initialState.caracteristicas.electrico,
  },
  propietarios: restoredState.propietarios ?? initialState.propietarios,
});

export const lunaLitFormPersistanceStore = createStore<State & Actions>(
  withPersistence(
    (set, get, restoredState) => ({
      ...getState(restoredState),
      setColor: (color) => set({ color }),
      setRpm: (rpm) => set({ rpm }),
      setMarca: (marca) => set({ marca }),
      setCaracteristicas: (caracteristicas) => set({ caracteristicas }),
      setPropietarios: (propietarios) => set({ propietarios }),
    }),
    {
      key: "luna-lit-form-store", // Clave con la que se almacena en el Storage
      version: 1, // Version del Store
      storage: sessionStorage, // Por defecto en el sessionStorage (elegir entre sessionStorage o localStorage)
      expiresIn: 1000 * 60 * 60 * 24, // 1 día en milisegundos (Almacenar tiempo de vida en milisegundos)
    }
  )
);
