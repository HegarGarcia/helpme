import React, { FC } from "react";
import { StyleProp, TextStyle } from "react-native";
import { TextInput as Input } from "react-native-paper";

interface TextInputProps {
  label: string;
  mode?: "flat" | "outlined";
  secureTextEntry?: boolean;
  style?: StyleProp<TextStyle>;
  value?: string;
  onChangeText: (text: string) => void;
}

const TextInput: FC<TextInputProps> = ({ style: textInputStyle, ...props }) => (
  <Input style={textInputStyle} {...props} />
);

export default TextInput;
