import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";

function Separator() {
  return <View style={styles.separator} />;
}

export default function signUp() {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image source={require("./assets/icon.png")} />
        </View>

        <View style={styles.googleContainer}>
          <Image
            style={styles.googleLogo}
            source={require("./assets/icon.png")}
          />
          <Text>Regístrate con Google</Text>
        </View>

        <Separator />

        <View style={styles.inputContainer}>
          <Text style={{ textAlign: "center" }}>Correo</Text>
          <TextInput style={styles.inputText} placeholder='Correo' />
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ textAlign: "center" }}>Nombre de Usuario</Text>
          <TextInput style={styles.inputText} placeholder='Usuario' />
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ textAlign: "center" }}>Contraseña</Text>
          <TextInput style={styles.inputText} placeholder='Contraseña' />
        </View>

        <View style={styles.inputContainer}>
          <Text style={{ textAlign: "center" }}>Verificar Contraseña</Text>
          <TextInput style={styles.inputText} placeholder='Contraseña' />
        </View>

        <View>
          <Button
            title='Registrarme'
            onPress={() => Alert.alert("Button with adjusted color pressed")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30
  },
  googleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
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
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
