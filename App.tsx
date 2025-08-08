import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import CartasProvider from "./src/provider/CartasProvider";
import CartasComponent from "./src/components/CartasComponent";
import HistorialComponent from "./src/components/HistorialComponent";
import InicioComponent from "./src/components/InicioComponent";
import { useState } from "react";

export default function App() {
  const [jugar, setJugar] = useState(false);

  return (
    <View style={styles.container}>
      <CartasProvider>
        {!jugar && <InicioComponent onIniciar={() => setJugar(true)} />}
        {jugar && (
          <>
            <CartasComponent />
            <HistorialComponent />
          </>
        )}
        <StatusBar style="auto" />
      </CartasProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});


