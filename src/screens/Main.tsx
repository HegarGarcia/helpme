import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { AppLoading } from "expo";
import { AppNavigator, AuthNavigator } from "../navigation/Navigator";
import { apps, auth, initializeApp } from "firebase";
import firebaseConfig from "../config/firebase";
import { UserContext } from "../authentication/userContext";

const Main = () => {
  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (apps.length <= 0) {
      initializeApp(firebaseConfig);
      setIsFirebaseLoaded(true);
    }
  }, []);

  useEffect(() => {
    auth().onAuthStateChanged(authData => {
      setIsLoggedIn(!!authData);
      setUser(authData);
    });
  }, []);

  return isFirebaseLoaded ? (
    <View style={styles.container}>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </View>
  ) : (
    <AppLoading />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default Main;
