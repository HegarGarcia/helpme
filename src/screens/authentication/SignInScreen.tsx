import React, { FC, useState } from "react";
import { Text, ImageBackground } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { signInWithEmailAndPassword } from "../../authentication/authenticateWithEmailAndPassword";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

import { Colors } from "../../styles/base";
import styles from "./styles";

const BackgroundImage = require("../../../assets/images/help_hands.jpg");

interface LoginScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const SignInScreen: FC<LoginScreenProps> = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => signInWithEmailAndPassword({ email, password });
  const navigateToSignUp = () => props.navigation.navigate("SignUp");

  return (
    <ImageBackground
      style={styles.container}
      blurRadius={8}
      source={BackgroundImage}>
      <Text style={styles.title}>Iniciar con tu cuenta</Text>

      <TextInput onChangeText={setEmail} placeholder='Email' />
      <TextInput
        secureTextEntry={true}
        onChangeText={setPassword}
        placeholder='Contraseña'
      />

      <Button
        title='Iniciar Sesión'
        style={{ backgroundColor: Colors.secondaryLigth }}
        onPress={signIn}
      />

      <Button
        title='Registrarme como filántropo'
        style={{ backgroundColor: Colors.secondaryLigth }}
        onPress={navigateToSignUp}
      />
    </ImageBackground>
  );
};

export default SignInScreen;
