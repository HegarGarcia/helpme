import React, { FC, useState, useContext, useEffect } from "react";
import { Text, View, Image, StyleSheet, Alert } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import Button from "../components/Button";
import TextInput from "../components/TextInput";

import { Colors, FontSize, Spacing } from "../styles/base";
import { UserContext } from "../authentication/userContext";

import ImagePicker from "../components/ImagePicker";
import { storage } from "firebase";

interface ProfileScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const ProfileScreen: FC<ProfileScreenProps> = props => {
  const [displayName, setDisplayname] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setDisplayname(user.displayName);
    }
  }, [user]);

  const updateUserProfile = async () => {
    setIsButtonDisable(true);

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
        setIsButtonDisable(false);
        props.navigation.navigate("Map");
      }
    );
  };

  return (
    user && (
      <View style={styles.container}>
        <Text style={styles.title}>Modificar Cuenta</Text>
        <Image
          style={styles.profilePicture}
          source={{
            uri:
              imageUri ||
              user.photoURL ||
              "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Feadb.org%2Fwp-content%2Fuploads%2F2015%2F08%2Fprofile-placeholder.jpg&f=1&nofb=1"
          }}
        />
        <ImagePicker setImageUri={setImageUri} />
        <TextInput
          style={{ color: Colors.black }}
          onChangeText={setDisplayname}
          value={displayName}
          placeholder='Nombre'
        />
        <Button
          disabled={isButtonDisable}
          title='Guardar Cambios'
          style={styles.saveButton}
          color={Colors.secondaryDark}
          onPress={updateUserProfile}
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
  }
});

export default ProfileScreen;
