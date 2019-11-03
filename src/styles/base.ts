import { DefaultTheme } from "react-native-paper";

export const Colors = {
  primary: "#2196f3",
  secondary: "#1de9b6",
  secondaryLigth: "#6dffe7",
  secondaryDark: "#00b585",
  tertiary: "",
  white: "#FFF",
  black: "#000"
};

export const Spacing = {
  sm: 8,
  md: 16,
  lg: 24,
  xg: 32
};

export const FontSize = {
  sm: 8,
  md: 16,
  lg: 24,
  xg: 32
};

export const Fonts = {
  primary: "",
  secondary: ""
};

export const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2196f3",
    accent: "#1de9b6"
  }
};
