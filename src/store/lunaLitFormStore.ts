import { createStore } from "../lib/luna/luna-core";

export enum Genero {
  Masculino = "Masculino",
  Femenino = "Femenino",
}

export type Contacto = {
  dni: string;
  ciudad: string;
};

export type State = {
  nombre: string;
  errorNombre: string;
  genero: Genero;
  edad: number;
  mascotas: string[];
  contacto: Contacto;
};

export type Actions = {
  // Setters
  setNombre: (nombre: string) => void;
  setGenero: (genero: Genero) => void;
  setEdad: (edad: number) => void;
  setMascotas: (mascotas: string[]) => void;
  setContacto: (contacto: Contacto) => void;
  // Getters
  getNombre: () => string;
};

const initialState: State = {
  nombre: "",
  errorNombre: "",
  genero: Genero.Masculino,
  edad: 0,
  mascotas: ["", ""],
  contacto: {
    ciudad: "",
    dni: "",
  },
};

export const lunaLitFormStore = createStore<State & Actions>((set, get) => ({
  ...initialState,
  setNombre(nombre) {
    if (nombre.length > 15) {
      set({
        errorNombre:
          "El nombre debe de tener como máximo 15 caracteres. Se guardará con el valor: " +
          get().nombre,
      });
      return;
    }
    set({ nombre });
    set({ errorNombre: "" });
  },
  setGenero(genero: Genero) {
    set({ genero });
  },
  setEdad(edad: number) {
    set({ edad });
  },
  setMascotas(mascotas: string[]) {
    set({ mascotas });
  },
  setContacto(contacto: Contacto) {
    set({ contacto });
  },
  getNombre() {
    return get().nombre;
  },
}));
