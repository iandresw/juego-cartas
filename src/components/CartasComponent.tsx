import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useCartasContext } from "../provider/CartasProvider";
import { Carta } from "../models/Carta"; 


export default function CartasComponent() {
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<Carta[]>([]);
  const { agregarPartida } = useCartasContext();

  const generarCartas = () => {
    const valores = ["A", "B", "C", "D"];
    const duplicadas = [...valores, ...valores];
    const mezcladas = duplicadas
      .map((valor) => ({ valor, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((carta, i) => ({
        id: i,
        valor: carta.valor,
        visible: false,
        acertada: false,
      }));

    setCartas(mezcladas);
    setSeleccionadas([]);
  };

  useEffect(() => {
    generarCartas();
  }, []);

  const seleccionarCarta = (carta: Carta) => {
    if (carta.visible || carta.acertada || seleccionadas.length === 2) return;

    const nuevas = cartas.map((c) =>
      c.id === carta.id ? { ...c, visible: true } : c
    );
    const nuevasSeleccionadas = [...seleccionadas, { ...carta, visible: true }];

    setCartas(nuevas);
    setSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      const [c1, c2] = nuevasSeleccionadas;
      if (c1.valor === c2.valor) {
        const actualizadas = nuevas.map((c) =>
          c.valor === c1.valor ? { ...c, acertada: true } : c
        );
        setTimeout(() => {
          setCartas(actualizadas);
          setSeleccionadas([]);
          if (actualizadas.every((c) => c.acertada)) {
            Alert.alert("Ganaste", "Encontraste todos los pares");
            agregarPartida("Ganada");
          }
        }, 500);
      } else {
        setTimeout(() => {
          const ocultadas = nuevas.map((c) =>
            c.id === c1.id || c.id === c2.id ? { ...c, visible: false } : c
          );
          setCartas(ocultadas);
          setSeleccionadas([]);
          Alert.alert("Fallaste", "Las cartas no coinciden");
          agregarPartida("Perdida");
        }, 1000);
      }
    }
  };

  return (
    <View >
      {cartas.map((c) => (
        <TouchableOpacity
          key={c.id}
          onPress={() => seleccionarCarta(c)}
        >
          <Text style={{ fontSize: 24 }}>{c.visible || c.acertada ? c.valor : "?"}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
