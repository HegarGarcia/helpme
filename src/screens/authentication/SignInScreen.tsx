import React, { FC, useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";

import { signInWithEmailAndPassword } from "../../authentication/authenticateWithEmailAndPassword";

import styles from "./styles";

interface LoginScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const SignInScreen: FC<LoginScreenProps> = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => signInWithEmailAndPassword({ email, password });
  const goToSignUp = () => props.navigation.navigate("SignUp");

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Iniciar con tu cuenta</Title>

      <TextInput
        autoCompleteType='email'
        mode='outlined'
        style={styles.textInput}
        onChangeText={setEmail}
        value={email}
        label='Email'
      />

      <TextInput
        autoCompleteType='off'
        mode='outlined'
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
        label='Contraseña'
      />

      <Button mode='contained' style={styles.actionButton} onPress={signIn}>
        Iniciar Sesión
      </Button>

      <Button mode='contained' style={styles.actionButton} onPress={goToSignUp}>
        Registrate
      </Button>
    </View>
  );
};

export default SignInScreen;
