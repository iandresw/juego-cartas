import React from "react";
import { View, Button } from "react-native";

type Props = {
  onIniciar: () => void;
};

export default function InicioComponent({ onIniciar }: Props) {
  return (
    <View>
      <Button title="Iniciar a jugar" onPress={onIniciar} />
    </View>
  );
}
