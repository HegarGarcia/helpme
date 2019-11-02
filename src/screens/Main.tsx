import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { AppNavigator, AuthNavigator } from "../navigation/Navigator";

import { auth } from "firebase";
import { UserContext } from "../authentication/userContext";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    auth().onAuthStateChanged(authData => {
      setIsLoggedIn(!!authData);
      setUser(authData);
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight
  }
});

export default Main;
