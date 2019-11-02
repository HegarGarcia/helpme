import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default function LoginScreen() {
  function LoginHandler() {
    console.log("Handle login events and sht");
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image source={require("./assets/icon.png")} />
      </View>
      <View>
        <TouchableOpacity style={styles.googleContainer} onPress={LoginHandler}>
          <Image
            style={styles.googleLogo}
            source={require("./assets/icon.png")}
          />
          <Text>{"\t"} Iniciar con google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={{ textAlign: "center" }}>Iniciar con tu cuenta</Text>
        <TextInput style={styles.inputText} placeholder='Usuario' />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputText} placeholder='Contraseña' />
      </View>
      <View>
        <Button title='Iniciar Sesión' onPress={LoginHandler} />
      </View>
      <Text style={{ textAlign: "center" }}>{"\n"}Registrarse</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30
  },
  googleContainer: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1
  },
  googleLogo: {
    width: 48,
    height: 48
  },
  inputContainer: {
    paddingVertical: 10
  },
  inputText: {
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  logoContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  loginButton: {
    borderRadius: 20,
    width: "wrap_content"
  }
});
