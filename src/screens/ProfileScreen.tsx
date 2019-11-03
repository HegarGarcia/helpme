import React, { FC, useState, useContext, useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import Button from "../components/Button";
import TextInput from "../components/TextInput";

import { Colors, FontSize, Spacing } from "../styles/base";
import { UserContext } from "../authentication/userContext";

interface ProfileScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const ProfileScreen: FC<ProfileScreenProps> = props => {
  const [displayName, setDisplayname] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setDisplayname(user.displayName);
    }
  }, [user]);

  const updateUserProfile = async () => {
    await user.updateProfile({
      displayName,
      photoURL:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Feadb.org%2Fwp-content%2Fuploads%2F2015%2F08%2Fprofile-placeholder.jpg&f=1&nofb=1"
    });
    setUser(user);

    props.navigation.navigate("Map");
  };

  return (
    user && (
      <View style={styles.container}>
        <Text style={styles.title}>Modificar Cuenta</Text>

        {user.photoURL && (
          <Image
            style={styles.profilePicture}
            source={{ uri: user.photoURL }}
          />
        )}

        <TextInput
          style={{ color: Colors.black }}
          onChangeText={setDisplayname}
          value={displayName}
          placeholder='Nombre'
        />

        <Button
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
