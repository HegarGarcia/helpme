import React, { FC, useState, useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Dialog,
  Portal,
  Paragraph,
  Button,
  Title,
  Colors
} from "react-native-paper";
import { Spacing, FontSize } from "../styles/base";

import Markers, { IMarker } from "../database/markers";

interface MarkerDetailDialogProps {
  toggleVisibility: () => void;
  markerId: string;
}

const MarkerDetailDialog: FC<MarkerDetailDialogProps> = ({
  toggleVisibility,
  markerId
}) => {
  const [marker, setMarker] = useState<IMarker>(null);

  useEffect(() => {
    (async () => {
      const markerDoc = await Markers.get(markerId);
      setMarker(markerDoc.data() as IMarker);
    })();
  });

  return (
    marker && (
      <Portal>
        <Dialog visible onDismiss={toggleVisibility}>
          <Dialog.Title>Solicitud de Ayuda</Dialog.Title>
          <ScrollView>
            <Dialog.Content>
              <Title style={styles.title}>¿Quien lo necesita?</Title>
              <Paragraph>{marker.needy}</Paragraph>

              <Title style={styles.title}>¿Que necesita?</Title>
              <Paragraph>{marker.necessity}</Paragraph>

              {marker.details && (
                <>
                  <Title style={styles.title}>Detalles</Title>
                  <Paragraph>{marker.details}</Paragraph>
                </>
              )}

              {marker.references && (
                <>
                  <Title style={styles.title}>Referencia de ubicación</Title>
                  <Paragraph>{marker.references}</Paragraph>
                </>
              )}
            </Dialog.Content>
          </ScrollView>

          <Dialog.Actions>
            <Button color={Colors.red500} onPress={toggleVisibility}>
              Cerrar
            </Button>
            <Button
              onPress={() => {
                Markers.markAsAttended(markerId);
                toggleVisibility();
              }}>
              Marcar como atendido
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.md
  }
});

export default MarkerDetailDialog;
