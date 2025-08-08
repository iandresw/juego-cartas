import React from "react";
import { View, Text } from "react-native";
import { useCartasContext } from "../provider/CartasProvider";

export default function HistorialComponent() {
  const { partidas } = useCartasContext();

  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>Historial de partidas:</Text>
      {partidas.map((p) => (
        <Text key={p.id}>
          Partida #{p.id} - {p.resultado}
        </Text>
      ))}
    </View>
  );
}
