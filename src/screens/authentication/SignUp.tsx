import React, { FC, useState } from "react";
import { Text, ImageBackground } from "react-native";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import GoogleAuthButton from "../../components/GoogleAuthButton";

import { Colors } from "../../styles/base";
import styles from "./styles";

const BackgroundImage = require("../../../assets/help_hands.jpg");

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
        onPress={() => {}}
      />

      <Button
        title='Iniciar sesión'
        backgroundColor={Colors.secondaryLigth}
        onPress={() => props.navigation.navigate("SignIn")}
      />

      <GoogleAuthButton title='Sign Up with Google' onPress={() => {}} />
    </ImageBackground>
  );
};

export default SignUpScreen;
