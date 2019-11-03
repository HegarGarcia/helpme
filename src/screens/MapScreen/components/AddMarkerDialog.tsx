import React, { FC } from "react";
import {
  Dialog,
  Portal,
  Paragraph,
  Divider,
  Button,
  TextInput,
  Text
} from "react-native-paper";
import { TouchableOpacity } from "react-native";

interface AddMarkerDialogProps {
  isVisible: boolean;
  toggle: () => void;
}

const AddMarkerDialog: FC<AddMarkerDialogProps> = ({ isVisible, toggle }) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={toggle}>
        <Dialog.Title>¿A quien quieres ayudar?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>¿Quien lo necesita?</Paragraph>
          <TextInput
            placeholder={"Nombre o forma de identificarlo "}
          ></TextInput>

          <Paragraph>¿Que se necesita?</Paragraph>
          <TextInput placeholder={"Ej: Zapatos, Ropa, Agua"}></TextInput>

          <Paragraph>Referencia de ubicación</Paragraph>
          <TextInput placeholder={"Un lugar identificable"}></TextInput>
        </Dialog.Content>
        <Dialog.Actions
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Button color="#F00" onPress={toggle}>
            Cerrar
          </Button>
          <Button onPress={() => {}}>Publicar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddMarkerDialog;
