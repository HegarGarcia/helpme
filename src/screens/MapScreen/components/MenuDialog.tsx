import React, { FC } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Dialog, Portal, Paragraph, Divider, Button } from "react-native-paper";

interface MenuDialogProps {
  isVisible: boolean;
  toggle: () => void;
}

const MenuDialog: FC<MenuDialogProps> = ({ isVisible, toggle }) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={toggle}>
        <Dialog.Content>
          <View style={styles.dialogImageContainer}>
            <Image
              style={styles.dialogImage}
              source={require("../../../../assets/icon.png")}
            />
          </View>
          <Divider />
          <View style={styles.dialogTextContainer}>
            <Paragraph style={styles.dialogTitles}>Nombre:</Paragraph>
            <Paragraph>Nombre Apellido Martinez</Paragraph>
            <Paragraph style={styles.dialogTitles}>Email:</Paragraph>
            <Paragraph>loremipsum@sitamet.com</Paragraph>
          </View>
        </Dialog.Content>
        <Divider />
        <Dialog.Actions style={styles.dialogButtons}>
          <Button color="#F00" onPress={toggle}>
            Cerrar
          </Button>
          <Button onPress={() => {}}>Editar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
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

export default MenuDialog;
