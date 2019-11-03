import React, { FC } from "react";
import {
  StyleSheet,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle
} from "react-native";
import { Colors, Spacing } from "../styles/base";

type ValidColor = typeof Colors[keyof typeof Colors];

interface ButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  color?: ValidColor;
  disabled?: boolean;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

const Button: FC<ButtonProps> = ({
  style: TouchableOpacityStyles,
  color,
  title,
  disabled,
  onPress
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[styles.button, TouchableOpacityStyles]}
    onPress={onPress}>
    <Text style={[styles.text, color && { color }]}>{title.toUpperCase()}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: Colors.secondary,
    padding: Spacing.md,
    marginVertical: Spacing.sm,
    borderRadius: 4
  },
  text: {
    color: Colors.black
  }
});

export default Button;
