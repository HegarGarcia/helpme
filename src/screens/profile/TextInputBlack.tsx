import React, { FC } from "react";
import { TextInput as Input, View, StyleSheet } from "react-native";
import { Spacing, Colors, FontSize } from "../../styles/base";

interface TextInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
}

const TextInput: FC<TextInputProps> = props => (
  <View style={styles.container}>
    <Input style={styles.input} {...props} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 50,
    marginVertical: Spacing.sm,
    borderColor: Colors.white,
    borderWidth: 2
  },
  input: {
    textAlign: "center",
    padding: Spacing.sm,
    color: Colors.black,
    fontWeight: "500",
    fontSize: FontSize.md
  }
});

export default TextInput;
