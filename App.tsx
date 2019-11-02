import React, { useState } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { StyleSheet, View, StatusBar } from "react-native";
import Navigator from "./src/navigation/Navigator";

let statusBarHeight = StatusBar.currentHeight;

const App = props => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  return !isLoadingComplete && !props.skipLoadingScreen ? (
    <AppLoading
      startAsync={loadResourcesAsync}
      onError={handleLoadingError}
      onFinish={() => handleFinishLoading(setLoadingComplete)}
    />
  ) : (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
};

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([require("./assets/images/help_hands.jpg")])
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: statusBarHeight
  }
});

export default App;
