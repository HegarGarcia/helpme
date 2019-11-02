import React, { FC } from "react";
import {
  StyleSheet,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle
} from "react-native";
import { Colors, Spacing } from "../styles/base";

type ValidColor = typeof Colors[keyof typeof Colors];

interface ImageButtonProps {
  image: ImageSourcePropType;
  backgroundColor?: ValidColor;
  color?: ValidColor;
  style?: StyleProp<ViewStyle>;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

const Button: FC<ImageButtonProps> = ({ image, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Image source={image} style={styles.image} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    marginVertical: Spacing.sm
  },
  image: {
    width: "70%",
    resizeMode: "contain"
  }
});

export default Button;
