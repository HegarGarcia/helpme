import React, { FC, useState } from "react";
import { View, Alert } from "react-native";
import {
  Button,
  TextInput,
  Title,
  HelperText,
  Avatar
} from "react-native-paper";

import { signUpWithEmailAndPassword } from "../../authentication/authenticateWithEmailAndPassword";
import styles from "./styles";
import Validator from "validator";
import { NavigationScreenProp } from "react-navigation";
import { Spacing } from "../../styles/base";

interface SignUpScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const SignUpScreen: FC<SignUpScreenProps> = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [username, setUsername] = useState("");

  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [doesPasswordMatch, setDoesPasswordMatch] = useState(true);

  const signUp = () => {
    const doesPasswordsMatch = password === passwordConfirmation;

    if (isValidEmail && doesPasswordsMatch) {
      signUpWithEmailAndPassword({ email, password, username });
    } else {
      setPasswordConfirmation("");
      setIsValidPassword(true);
      Alert.alert("Error", "Las contraseñas no coinciden");
    }
  };

  const validateUsername = () => setIsValidUsername(username.length > 0);
  const valdateEmail = () => setIsValidEmail(Validator.isEmail(email));
  const validatePasswordMatch = () =>
    setDoesPasswordMatch(password === passwordConfirmation);
  const validatePassword = () => setIsValidPassword(password.length >= 8);

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={200}
        style={{ alignSelf: "center", marginBottom: Spacing.md }}
        source={require("../../../assets/icon.png")}
      />

      <Title style={styles.title}>Crea tu cuenta</Title>
      <TextInput
        autoCompleteType='name'
        mode='outlined'
        style={styles.textInput}
        value={username}
        onChangeText={setUsername}
        onEndEditing={validateUsername}
        label='Nombre de Usuario'
      />

      <HelperText type='error' visible={!isValidUsername}>
        El nombre de usuario es obligatorio
      </HelperText>

      <TextInput
        autoCompleteType='email'
        mode='outlined'
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
        onEndEditing={valdateEmail}
        label='Email'
      />

      <HelperText type='error' visible={!isValidEmail}>
        ¡El email no es válido!
      </HelperText>

      <TextInput
        autoCompleteType='off'
        mode='outlined'
        secureTextEntry={true}
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
        onEndEditing={validatePassword}
        label='Contraseña'
      />

      <HelperText type='error' visible={!isValidPassword}>
        La contraseña debe tener mínimo 8 caracteres
      </HelperText>

      <TextInput
        autoCompleteType='off'
        mode='outlined'
        secureTextEntry={true}
        style={styles.textInput}
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        onEndEditing={validatePasswordMatch}
        label='Confirma tu contraseña'
      />
      <HelperText type='error' visible={!doesPasswordMatch}>
        ¡La contraseña no coincide!
      </HelperText>

      <Button mode='contained' style={styles.textInput} onPress={signUp}>
        Registrarme
      </Button>

      <Button
        mode='text'
        style={styles.textInput}
        onPress={() => props.navigation.navigate("SignIn")}>
        Iniciar sesión
      </Button>
    </View>
  );
};

export default SignUpScreen;
