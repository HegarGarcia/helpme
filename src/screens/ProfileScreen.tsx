import React, { FC, useState, useContext, useEffect } from "react";
import { Text, View, Image, StyleSheet, Alert } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { storage } from "firebase";

import Button from "../components/Button";
import TextInput from "../components/TextInput";
import ImagePicker from "../components/ImagePicker";

import { Colors, FontSize, Spacing } from "../styles/base";
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
        <Text style={styles.title}>Modificar Cuenta</Text>
        <Image
          style={styles.profilePicture}
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
          style={{ color: Colors.black }}
          onChangeText={setDisplayname}
          value={displayName}
          placeholder='Nombre'
        />
        <Button
          disabled={areActionButtonsDisabled}
          title='Guardar Cambios'
          style={styles.saveButton}
          color={Colors.secondaryDark}
          onPress={updateUserProfile}
        />

        <Button
          disabled={areActionButtonsDisabled}
          title='Cancelar'
          style={styles.cancelButton}
          color={Colors.secondaryDark}
          onPress={() => props.navigation.navigate("Map")}
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30
  },
  title: {
    textAlign: "center",
    fontSize: FontSize.lg,
    color: Colors.black,
    fontWeight: "600",
    marginBottom: Spacing.md
  },
  profilePicture: {
    width: 150,
    height: 150,
    alignSelf: "center",
    margin: Spacing.md
  },
  saveButton: {
    backgroundColor: "transparent",
    borderColor: Colors.secondaryDark,
    borderWidth: 2,
    borderRadius: 50
  },
  cancelButton: {
    backgroundColor: "transparent"
  }
});

export default ProfileScreen;
