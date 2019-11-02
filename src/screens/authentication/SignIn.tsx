import React, { FC, useState } from "react";
import { Text, ImageBackground } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import GoogleAuthButton from "../../components/GoogleAuthButton";

import { Colors } from "../../styles/base";
import styles from "./styles";

const BackgroundImage = require("../../../assets/images/help_hands.jpg");

interface LoginScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const SignInScreen: FC<LoginScreenProps> = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        backgroundColor={Colors.secondaryLigth}
        onPress={() => {}}
      />

      <Button
        title='Registrarme como filántropo'
        backgroundColor={Colors.secondaryLigth}
        onPress={() => props.navigation.navigate("SignUp")}
      />

      <GoogleAuthButton title='Sign In with Google' onPress={() => {}} />
    </ImageBackground>
  );
};

export default SignInScreen;
