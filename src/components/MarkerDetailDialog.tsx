import React, { FC, useContext } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  Dialog,
  Portal,
  Paragraph,
  Divider,
  Button,
  TextInput,
  Avatar
} from "react-native-paper";
import { Spacing } from "../styles/base";

//just for it to work with real data
import { UserContext } from "../authentication/userContext";

interface MarkerDetailDialogProps {
  toggleVisibility: () => void;
  markerId: string;
}

const MarkerDetailDialog: FC<MarkerDetailDialogProps> = ({
  toggleVisibility,
  markerId
}) => {
  //just for it to work with real data
  const { user } = useContext(UserContext);

  return (
    <Portal>
      <Dialog visible onDismiss={toggleVisibility}>
        <Dialog.Title>Solicitud de Ayuda</Dialog.Title>
        <ScrollView>
          <Dialog.Content>
            <Paragraph>¿Quien lo necesita?</Paragraph>
            <Paragraph>{"sdas"}</Paragraph>

            <Paragraph>¿Que necesita?</Paragraph>
            <Paragraph>{markerId}</Paragraph>

            <Paragraph>Referencia de ubicación</Paragraph>
            <Paragraph>xd</Paragraph>
          </Dialog.Content>
          <Divider />
          <View style={{ padding: 20 }}>
            <View style={styles.dialogImageContainer}>
              <Avatar.Image size={100} source={{ uri: user.photoURL }} />

              <View style={styles.dialogTextContainer}>
                <Paragraph style={styles.dialogTitles}>Nombre:</Paragraph>
                <Paragraph>{user.displayName}</Paragraph>
                <Paragraph style={styles.dialogTitles}>Email:</Paragraph>
                <Paragraph>{user.email}</Paragraph>
              </View>
            </View>
          </View>
        </ScrollView>

        <Dialog.Actions
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Button color="#F00" onPress={toggleVisibility}>
            Cerrar
          </Button>
          <Button onPress={() => {}}>Marcar como atendido</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  dialogTextContainer: {
    marginHorizontal: Spacing.lg,
    justifyContent: "center"
  },
  dialogTitles: {
    fontWeight: "bold"
  },
  dialogButtons: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default MarkerDetailDialog;
