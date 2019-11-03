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
  let errorMessage = "";

  try {
    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    await user.sendEmailVerification();
    if (user) {
      await user.updateProfile({ displayName: username });
    }
  } catch (err) {
    switch (err.code) {
      case "auth/email-already-in-use":
        errorMessage = "Ya hay una cuenta registrada con su email";
        break;
      case "auth/invalid-email":
        errorMessage = "Email inválido";
        break;
      case "auth/weak-password":
        errorMessage = "Su password es débil";
        break;
    }
  }

  if (errorMessage) {
    Alert.alert("Error en creación de cuenta", errorMessage);
  }
};

export const signInWithEmailAndPassword = async ({
  email,
  password
}: EmailAndPassword) => {
  let errorMessage = "";
  try {
    const { user } = await auth().signInWithEmailAndPassword(email, password);
    if (!user.emailVerified) {
      auth().signOut();
      Alert.alert("Cuenta no verificada", "Revisa tu correo");
    }
  } catch (err) {
    switch (err.code) {
      case "auth/email-already-in-use":
        errorMessage = "Ya hay una cuenta create con tu email";
        break;
      case "auth/user-not-found":
        errorMessage = "Usuario no registrado";
        break;
      case "auth/wrong-password":
        errorMessage = "Contraseña inválida";
        break;
      default:
        errorMessage = "Credenciales inválidas";
        break;
    }
  }

  if (errorMessage) {
    Alert.alert("Error en inicio de sesión", errorMessage);
  }
};

export const forgotMyPassword = async (email: string) => {
  await auth()
    .sendPasswordResetEmail(email)
    .catch(err => {
      let errorMessage = "";
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "Email no reigstrado";
          break;
      }

      if (errorMessage) {
        Alert.alert("Error en recuperación de contraseña", errorMessage);
      }
    });
};
