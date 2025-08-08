import React, { useContext, useState } from "react";
import { cartasContext } from "../context/CartasContext";
import { Partida } from "../models/Partida";

export default function CartasProvider({ children }: { children: React.ReactNode }) {
  const [partidas, setPartidas] = useState<Partida[]>([]);

  const agregarPartida = (resultado: "Ganada" | "Perdida") => {
    const nueva: Partida = {
      id: partidas.length + 1,
      resultado,
    };
    setPartidas([...partidas, nueva]);
  };

  return (
    <cartasContext.Provider value={{ partidas, agregarPartida }}>
      {children}
    </cartasContext.Provider>
  );
}

export function useCartasContext() {
  return useContext(cartasContext);
}
