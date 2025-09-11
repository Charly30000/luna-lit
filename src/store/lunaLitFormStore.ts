import { createStore } from "../lib/luna/luna-core";

export type Genero = "Masculino" | "Femenino";

export type Contacto = {
  dni: string;
  ciudad: string;
};

export type State = {
  nombre: string;
  genero: Genero;
  edad: number;
  mascotas: string[];
  contacto: Contacto;
};

export type Actions = {
  setNombre: (nombre: string) => void;
  setGenero: (genero: Genero) => void;
  setEdad: (edad: number) => void;
  setMascotas: (mascotas: string[]) => void;
  setContacto: (contacto: Contacto) => void;
};

const initialState: State = {
  nombre: "",
  genero: "Masculino",
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
    if (nombre.length > 20) {
      nombre = get().nombre;
      return;
    }
    set({ nombre });
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
}));
