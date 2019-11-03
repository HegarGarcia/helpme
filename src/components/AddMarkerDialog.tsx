import React, { FC } from "react";
import {
  Dialog,
  Portal,
  Paragraph,
  Button,
  TextInput
} from "react-native-paper";

interface AddMarkerDialogProps {
  toggleVisibility: () => void;
}

const AddMarkerDialog: FC<AddMarkerDialogProps> = ({ toggleVisibility }) => {
  return (
    <Portal>
      <Dialog visible onDismiss={toggleVisibility}>
        <Dialog.Title>¿A quien quieres ayudar?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>¿Quien lo necesita?</Paragraph>
          <TextInput
            placeholder={"Nombre o forma de identificarlo "}></TextInput>

          <Paragraph>¿Que se necesita?</Paragraph>
          <TextInput placeholder={"Ej: Zapatos, Ropa, Agua"}></TextInput>

          <Paragraph>Referencia de ubicación</Paragraph>
          <TextInput placeholder={"Un lugar identificable"}></TextInput>
        </Dialog.Content>
        <Dialog.Actions
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
          <Button color='#F00' onPress={toggleVisibility}>
            Cerrar
          </Button>
          <Button onPress={() => {}}>Publicar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddMarkerDialog;
