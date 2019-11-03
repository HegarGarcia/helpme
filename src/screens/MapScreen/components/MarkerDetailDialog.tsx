import React, { FC, useState } from "react";
import { ScrollView } from "react-native";
import {
  Dialog,
  Portal,
  Paragraph,
  Divider,
  Button,
  TextInput
} from "react-native-paper";
import { MarkerDetails } from "../../../interfaces/MarkerDetails";

interface MarkerDetailDialogProps {
  isVisible: boolean;
  toggle: () => void;
  markerId: string;
}

const MarkerDetailDialog: FC<MarkerDetailDialogProps> = ({
  isVisible,
  toggle,
  markerId
}) => {
  console.log(markerId);
  return (
    <Button color='#FFF' onPress={() => {}}>
      Hola
    </Button>
    // <Portal>
    //   <Dialog visible={isVisible} onDismiss={toggle}>
    //     <Dialog.Title>Solicitud de Ayuda</Dialog.Title>
    //     <ScrollView>
    //       <Dialog.Content>
    //         <Paragraph>¿Quien lo necesita?</Paragraph>
    //         <Paragraph>{markerDetails.coords.latitude}</Paragraph>

    //         <Paragraph>¿Que necesita?</Paragraph>
    //         <Paragraph>{markerDetails.coords.longitude}</Paragraph>

    //         <Paragraph>Referencia de ubicación</Paragraph>
    //         <Paragraph>xd</Paragraph>
    //       </Dialog.Content>
    //     </ScrollView>

    //     <Dialog.Actions
    //       style={{
    //         flexDirection: "row",
    //         justifyContent: "space-between"
    //       }}
    //     >
    //       <Button color="#F00" onPress={toggle}>
    //         Cerrar
    //       </Button>
    //       <Button onPress={() => {}}>Marcar como atendido</Button>
    //     </Dialog.Actions>
    //   </Dialog>
    // </Portal>
  );
};

export default MarkerDetailDialog;
