import React, { FC, useState } from "react";
import { Text, ImageBackground } from "react-native";

import { signUpWithEmailAndPassword } from "../../authentication/authenticateWithEmailAndPassword";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

import { Colors } from "../../styles/base";
import styles from "./styles";

const BackgroundImage = require("../../../assets/images/help_hands.jpg");

const SignUpScreen: FC<any> = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <ImageBackground
      style={styles.container}
      blurRadius={8}
      source={BackgroundImage}>
      <Text style={styles.title}>Registro</Text>

      <TextInput onChangeText={setUsername} placeholder='Nombre de Usuario' />
      <TextInput onChangeText={setEmail} placeholder='Email' />
      <TextInput
        secureTextEntry={true}
        onChangeText={setPassword}
        placeholder='Contraseña'
      />

      <Button
        title='Registrarme'
        backgroundColor={Colors.secondaryLigth}
        onPress={() =>
          signUpWithEmailAndPassword({ email, password, username })
        }
      />

      <Button
        title='Iniciar sesión'
        backgroundColor={Colors.secondaryLigth}
        onPress={() => props.navigation.navigate("SignIn")}
      />
    </ImageBackground>
  );
};

export default SignUpScreen;
