import React, { FC, useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";

import { signUpWithEmailAndPassword } from "../../authentication/authenticateWithEmailAndPassword";
import styles from "./styles";

const SignUpScreen: FC<any> = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Registro</Title>

      <TextInput
        autoCompleteType='name'
        mode='outlined'
        style={styles.textInput}
        value={username}
        onChangeText={setUsername}
        label='Nombre de Usuario'
      />
      <TextInput
        autoCompleteType='email'
        mode='outlined'
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
        label='Email'
      />
      <TextInput
        autoCompleteType='off'
        mode='outlined'
        secureTextEntry={true}
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        label='Contraseña'
      />

      <Button
        mode='contained'
        style={styles.textInput}
        onPress={() =>
          signUpWithEmailAndPassword({ email, password, username })
        }>
        Registrarme
      </Button>

      <Button
        mode='contained'
        style={styles.textInput}
        onPress={() => props.navigation.navigate("SignIn")}>
        Iniciar sesión
      </Button>
    </View>
  );
};

export default SignUpScreen;
