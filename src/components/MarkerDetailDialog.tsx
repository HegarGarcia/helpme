import React, { FC } from "react";
import { ScrollView } from "react-native";
import {
  Dialog,
  Portal,
  Paragraph,
  Divider,
  Button,
  TextInput
} from "react-native-paper";

interface MarkerDetailDialogProps {
  toggleVisibility: () => void;
  markerId: string;
}

const MarkerDetailDialog: FC<MarkerDetailDialogProps> = ({
  toggleVisibility,
  markerId
}) => {
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
        </ScrollView>

        <Dialog.Actions
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
          <Button color='#F00' onPress={toggleVisibility}>
            Cerrar
          </Button>
          <Button onPress={() => {}}>Marcar como atendido</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default MarkerDetailDialog;
