import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Navigator from "./src/navigation/Navigator";

let statusBarHeight = StatusBar.currentHeight;

function App() {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: statusBarHeight
  }
});

export default App;
