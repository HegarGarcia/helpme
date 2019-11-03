import React, { FC, useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Dialog, Portal, Paragraph, Divider, Button } from "react-native-paper";
import { UserContext } from "../authentication/userContext";

interface MenuDialogProps {
  goToProfile?: () => void;
  toggleVisibility?: () => void;
}

const ProfileDetailDialog: FC<MenuDialogProps> = ({
  toggleVisibility: toggle,
  goToProfile
}) => {
  const { user } = useContext(UserContext);

  return (
    user && (
      <Portal>
        <Dialog visible onDismiss={toggle}>
          <Dialog.Content>
            <View style={styles.dialogImageContainer}>
              <Image
                style={styles.dialogImage}
                source={{ uri: user.photoURL }}
              />
            </View>

            <Divider />

            <View style={styles.dialogTextContainer}>
              <Paragraph style={styles.dialogTitles}>Nombre:</Paragraph>
              <Paragraph>{user.displayName}</Paragraph>
              <Paragraph style={styles.dialogTitles}>Email:</Paragraph>
              <Paragraph>{user.email}</Paragraph>
            </View>
          </Dialog.Content>

          <Divider />

          <Dialog.Actions style={styles.dialogButtons}>
            <Button color='#F00' onPress={toggle}>
              Cerrar
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  dialogImage: {
    width: 128,
    height: 128
  },
  dialogTextContainer: {
    marginTop: 20
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
