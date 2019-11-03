import React, { FC, useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Dialog,
  Portal,
  Paragraph,
  Divider,
  Button,
  Colors
} from "react-native-paper";
import { Avatar } from "react-native-paper";
import { UserContext } from "../authentication/userContext";
import { auth } from "firebase";
import { Spacing } from "../styles/base";

interface MenuDialogProps {
  goToProfile?: () => void;
  toggleVisibility?: () => void;
}

const ProfileDetailDialog: FC<MenuDialogProps> = ({
  toggleVisibility: toggle,
  goToProfile
}) => {
  const { user } = useContext(UserContext);
  const signOut = () => auth().signOut();

  return (
    user && (
      <Portal>
        <Dialog visible onDismiss={toggle}>
          <Dialog.Content>
            <View style={styles.dialogImageContainer}>
              <Avatar.Image size={150} source={{ uri: user.photoURL }} />
            </View>
            <View style={styles.dialogTextContainer}>
              <Paragraph style={styles.dialogTitles}>Nombre:</Paragraph>
              <Paragraph>{user.displayName}</Paragraph>
              <Paragraph style={styles.dialogTitles}>Email:</Paragraph>
              <Paragraph>{user.email}</Paragraph>
            </View>
          </Dialog.Content>

          <Dialog.Actions style={styles.dialogButtons}>
            <Button color={Colors.red500} onPress={signOut}>
              Cerrar Sesión
            </Button>
            <Button onPress={goToProfile}>Editar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  );
};

const styles = StyleSheet.create({
  dialogImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.md
  },
  dialogTextContainer: {
    marginHorizontal: Spacing.sm,
  },
  dialogTitles: {
    fontWeight: "bold"
  },
  dialogButtons: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default ProfileDetailDialog;
