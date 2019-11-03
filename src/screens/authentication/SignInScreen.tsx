import React, { FC, useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Title, HelperText } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";

import { signInWithEmailAndPassword } from "../../authentication/authenticateWithEmailAndPassword";
import Validator from "validator";
import styles from "./styles";

interface SignInScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const SignInScreen: FC<SignInScreenProps> = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const valdateEmail = () => setIsValidEmail(Validator.isEmail(email));
  const validatePassword = () => setIsValidPassword(password.length >= 8);

  const goToSignUp = () => props.navigation.navigate("SignUp");
  const goToPasswordReset = () => props.navigation.navigate("PasswordReset");

  const signIn = () => {
    if (isValidEmail && isValidPassword) {
      signInWithEmailAndPassword({ email, password });
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Iniciar con tu cuenta</Title>

      <TextInput
        autoCompleteType='email'
        mode='outlined'
        style={styles.textInput}
        onChangeText={setEmail}
        onEndEditing={valdateEmail}
        value={email}
        label='Email'
      />

      <HelperText type='error' visible={!isValidEmail}>
        ¡El email no es válido!
      </HelperText>

      <TextInput
        autoCompleteType='off'
        mode='outlined'
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={setPassword}
        onEndEditing={validatePassword}
        value={password}
        label='Contraseña'
      />

      <HelperText type='error' visible={!isValidPassword}>
        La contraseña invalida
      </HelperText>

      <Button mode='contained' style={styles.actionButton} onPress={signIn}>
        Iniciar Sesión
      </Button>

      <Button mode='text' style={styles.actionButton} onPress={goToSignUp}>
        Registrate
      </Button>

      <Button
        mode='text'
        style={styles.actionButton}
        onPress={goToPasswordReset}>
        ¿Olvidaste tu contraseña?
      </Button>
    </View>
  );
};

export default SignInScreen;
