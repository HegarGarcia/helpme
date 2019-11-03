import React, { FC, useState } from "react";
import { Picker, StyleSheet, View } from "react-native";
import {
  Dialog,
  Portal,
  Paragraph,
  Button,
  TextInput
} from "react-native-paper";
import { Spacing, Colors, FontSize } from "../styles/base";

interface AddMarkerDialogProps {
  toggleVisibility: () => void;
}

const AddMarkerDialog: FC<AddMarkerDialogProps> = ({ toggleVisibility }) => {
  const [selectedPickerValue, setSelectedPickerValue] = useState("");

  return (
    <Portal>
      <Dialog visible onDismiss={toggleVisibility}>
        <Dialog.Title>¿A quien quieres ayudar?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>¿Quien lo necesita?</Paragraph>
          <TextInput
            placeholder={"Nombre o forma de identificarlo "}
          ></TextInput>

          <Paragraph>¿Que se necesita?</Paragraph>
          <View style={styles.container}>
            <Picker
              style={styles.picker}
              selectedValue={selectedPickerValue}
              onValueChange={itemValue => {
                setSelectedPickerValue(itemValue);
                console.log(itemValue);
              }}
            >
              <Picker.Item label="Comida" value="Comida" />
              <Picker.Item label="Agua" value="Agua" />
              <Picker.Item label="Atencion Medica" value="Atencion Medica" />
              <Picker.Item label="Ropa" value="Ropa" />
              <Picker.Item label="Zapatos" value="Zapatos" />
              <Picker.Item label="Dinero" value="Dinero" />
            </Picker>
          </View>

          <Paragraph>Detalles</Paragraph>
          <TextInput></TextInput>

          <Paragraph>Referencia de ubicación</Paragraph>
          <TextInput placeholder={"Un lugar identificable"}></TextInput>
        </Dialog.Content>
        <Dialog.Actions
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Button color="#F00" onPress={toggleVisibility}>
            Cerrar
          </Button>
          <Button onPress={() => {}}>Publicar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    borderRadius: 5,
    marginVertical: Spacing.sm
  },
  picker: {
    textAlign: "center",
    padding: Spacing.sm,
    fontWeight: "500",
    fontSize: FontSize.md
  }
});

export default AddMarkerDialog;
