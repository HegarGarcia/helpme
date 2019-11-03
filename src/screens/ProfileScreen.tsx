import React, { FC, useState, useContext, useEffect } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { storage } from "firebase";
import { TextInput, Button, Title, Avatar } from "react-native-paper";

import ImagePicker from "../components/ImagePicker";

import { Spacing } from "../styles/base";
import { UserContext } from "../authentication/userContext";

import { defaultProfilePhoto } from "../constants/photos";

interface ProfileScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const ProfileScreen: FC<ProfileScreenProps> = props => {
  const [displayName, setDisplayname] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [areActionButtonsDisabled, setAreActionButtonDisabled] = useState(
    false
  );
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setDisplayname(user.displayName);
    }
  }, [user]);

  const updateUserProfile = async () => {
    setAreActionButtonDisabled(true);
    if (imageUri) {
      const blob = await fetch(imageUri).then(response => response.blob());

      const uploadTask = storage()
        .ref()
        .child(`profile${user.uid}`)
        .put(blob);

      uploadTask.on(
        storage.TaskEvent.STATE_CHANGED,
        () => {},
        err => Alert.alert("Error", err.message),
        async () => {
          const photoURL = await uploadTask.snapshot.ref.getDownloadURL();
          await user.updateProfile({
            displayName,
            photoURL
          });
          setUser(user);
          setAreActionButtonDisabled(false);
          props.navigation.navigate("Map");
        }
      );
    } else {
      await user.updateProfile({
        displayName
      });
      setUser(user);
      setAreActionButtonDisabled(false);
      props.navigation.navigate("Map");
    }
  };

  const userProfileUri = imageUri || user.photoURL;

  return (
    user && (
      <View style={styles.container}>
        <Title style={styles.title}>Modificar Cuenta</Title>

        <Avatar.Image
          style={styles.profilePicture}
          size={150}
          source={
            userProfileUri
              ? {
                  uri: userProfileUri
                }
              : defaultProfilePhoto
          }
        />

        <ImagePicker setImageUri={setImageUri} />

        <TextInput
          label='Nombre'
          mode={"outlined"}
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayname}
        />

        <Button
          disabled={areActionButtonsDisabled}
          mode='contained'
          style={styles.input}
          onPress={updateUserProfile}>
          Guardar Cambios
        </Button>

        <Button
          disabled={areActionButtonsDisabled}
          mode='text'
          style={styles.input}
          onPress={() => props.navigation.navigate("Map")}>
          Cancelar
        </Button>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.xg
  },
  title: {
    textAlign: "center"
  },
  profilePicture: {
    alignSelf: "center",
    margin: Spacing.md
  },
  input: {
    marginVertical: Spacing.sm
  }
});

export default ProfileScreen;
