import { auth } from "firebase";
import { Alert } from "react-native";

interface EmailAndPassword {
  email: string;
  password: string;
  username?: string;
}

export const signUpWithEmailAndPassword = async ({
  email,
  password,
  username
}: EmailAndPassword) => {
  const user = await auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(err =>
      Alert.alert("Problema en la Creación de Cuenta", err.message)
    );

  if (user) {
    await user.user.updateProfile({ displayName: username });
  }
};

export const signInWithEmailAndPassword = async ({
  email,
  password
}: EmailAndPassword) =>
  await auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err =>
      Alert.alert("Error", `Problema en inicio de sesión: ${err.message}`)
    );
