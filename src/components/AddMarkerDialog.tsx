import React, { FC, useState, useContext } from "react";
import { Picker, StyleSheet } from "react-native";
import {
  Dialog,
  Portal,
  Paragraph,
  Button,
  TextInput,
  Colors
} from "react-native-paper";
import { Spacing, FontSize } from "../styles/base";

import Markers, {
  IMarker,
  transformCoordinateToGeoPoint,
  Coordinates
} from "../database/markers";
import { UserContext } from "../authentication/userContext";

interface AddMarkerDialogProps {
  currentLocation: Coordinates;
  toggleVisibility: () => void;
}

const AddMarkerDialog: FC<AddMarkerDialogProps> = ({
  toggleVisibility,
  currentLocation
}) => {
  const [needy, setNeedy] = useState("");
  const [necessity, setNecessity] = useState("");
  const [details, setDetails] = useState("");
  const [references, setReferences] = useState("");
  const { user } = useContext(UserContext);

  const addMarker = () => {
    const marker: IMarker = {
      attended: false,
      details,
      necessity,
      needy,
      references,
      userUid: user.uid,
      coordinates: transformCoordinateToGeoPoint(currentLocation)
    };

    Markers.add(marker);
    toggleVisibility();
  };

  return (
    <Portal>
      <Dialog visible onDismiss={toggleVisibility}>
        <Dialog.Title>¿A quien quieres ayudar?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>¿Quién lo necesita?</Paragraph>
          <Picker
            style={styles.picker}
            selectedValue={needy}
            onValueChange={setNeedy}>
            <Picker.Item label='Indigente' value='homeless' />
            <Picker.Item label='Niñ@' value='kid' />
            <Picker.Item label='Persona de la tercera edad' value='elder' />
          </Picker>

          <Paragraph>¿Qué se necesita?</Paragraph>
          <Picker
            style={styles.picker}
            selectedValue={necessity}
            onValueChange={setNecessity}>
            <Picker.Item label='Comida' value='Comida' />
            <Picker.Item label='Agua' value='Agua' />
            <Picker.Item label='Atencion Medica' value='Atencion Medica' />
            <Picker.Item label='Ropa' value='Ropa' />
            <Picker.Item label='Zapatos' value='Zapatos' />
            <Picker.Item label='Dinero' value='Dinero' />
          </Picker>

          <TextInput
            mode='outlined'
            style={styles.textInput}
            label='Detalles'
            onChangeText={setDetails}
            value={details}
          />

          <TextInput
            mode='outlined'
            style={[styles.textInput, { marginBottom: 0 }]}
            label='Referencias'
            onChangeText={setReferences}
            value={references}
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button color={Colors.grey400} onPress={toggleVisibility}>
            Cancelar
          </Button>
          <Button onPress={addMarker}>Agregar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  picker: {
    textAlign: "center",
    padding: Spacing.sm,
    fontWeight: "500",
    fontSize: FontSize.md
  },
  textInput: {
    marginVertical: Spacing.sm
  }
});

export default AddMarkerDialog;
