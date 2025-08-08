import { createContext } from "react";
import { Partida } from "../models/Partida";

export const cartasContext = createContext({
  partidas: [] as Partida[],
  agregarPartida: (resultado: "Ganada" | "Perdida") => {},
});
