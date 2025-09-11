import { createStore } from "../lib/luna/luna-core";
import { withPersistence } from "../lib/luna/persist-middleware";

export type StateV1 = {
  nombreTelefono: string;
  marcaTelefono: string;
  caracteristicas: {
    pulgadas: number;
    pixelesCamara: number;
    dualSIM: boolean;
  };
  accesorios: string[];
};

export type ActionsV1 = {
  setNombreTelefono: (nombreTelefono: string) => void;
  setMarcaTelefono: (marcaTelefono: string) => void;
  setCaracteristicas: (caracteristicas: StateV1["caracteristicas"]) => void;
  setAccesorios: (accesorios: string[]) => void;
};

export type StateV2 = {
  nombre: string;
  marca: string;
  caracteristicas: {
    centimetros: number;
    pixelesCamara: number;
    dualSIM: boolean;
  };
  accesorios: string[];
};

export type ActionsV2 = {
  setNombre: (nombre: string) => void;
  setMarca: (marca: string) => void;
  setCaracteristicas: (caracteristicas: StateV2["caracteristicas"]) => void;
  setAccesorios: (accesorios: string[]) => void;
};

const initialState: StateV2 = {
  nombre: "",
  marca: "",
  caracteristicas: {
    centimetros: 0,
    pixelesCamara: 0,
    dualSIM: false,
  },
  accesorios: [],
};

const getState = (restoredState: Partial<StateV2>) => ({
  nombre: restoredState.nombre ?? initialState.nombre,
  marca: restoredState.marca ?? initialState.marca,
  caracteristicas: {
    centimetros:
      restoredState.caracteristicas?.centimetros ??
      initialState.caracteristicas.centimetros,
    pixelesCamara:
      restoredState.caracteristicas?.pixelesCamara ??
      initialState.caracteristicas.pixelesCamara,
    dualSIM:
      restoredState.caracteristicas?.dualSIM ??
      initialState.caracteristicas.dualSIM,
  },
  accesorios: restoredState.accesorios ?? initialState.accesorios,
});

export const lunaLitFormPersistanceMigrateStore = createStore<
  StateV2 & ActionsV2
>(
  withPersistence(
    (set, get, restoredState) => ({
      ...getState(restoredState),
      setNombre(nombre) {
        set({ nombre });
      },
      setMarca(marca) {
        set({ marca });
      },
      setCaracteristicas(caracteristicas) {
        set({ caracteristicas });
      },
      setAccesorios(accesorios) {
        set({ accesorios });
      },
    }),
    {
      key: "luna-lit-form-persistance-store", // Clave con la que se almacena en el Storage
      version: 2, // Version del Store
      storage: localStorage, // Por defecto en el sessionStorage (elegir entre sessionStorage o localStorage)
      expiresIn: 1000 * 60 * 60 * 24, // 1 día en milisegundos (Almacenar tiempo de vida en milisegundos)
      migrate(persistedState, version) {
        // Mantener estructura de migracion de datos
        let state = { ...persistedState };

        if (version < 2) {
          const v2: StateV2 = {
            nombre: (state as StateV1).nombreTelefono,
            marca: (state as StateV1).marcaTelefono,
            caracteristicas: {
              centimetros: (state as StateV1).caracteristicas.pulgadas * 2.54,
              pixelesCamara: (state as StateV1).caracteristicas.pixelesCamara,
              dualSIM: (state as StateV1).caracteristicas.dualSIM,
            },
            accesorios: (state as StateV1).accesorios,
          };
          // Importante introducir para que se actualice la version y el estado correctamente
          version = 2;
          state = v2;
        }

        return state;
      },
    }
  )
);
