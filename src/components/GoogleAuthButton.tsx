import React, { FC } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  GestureResponderEvent
} from "react-native";
import { Spacing, FontSize } from "../styles/base";

const googleIcon = {
  uri:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png"
};

interface GoogleSignInButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  style?: any;
  title: string;
}

const GoogleAuthButton: FC<GoogleSignInButtonProps> = ({
  style,
  onPress,
  title
}) => (
  <TouchableOpacity
    activeOpacity={0.6}
    style={StyleSheet.flatten([styles.touchable, style])}
    onPress={onPress}>
    <View style={styles.content}>
      <Image source={googleIcon} style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  touchable: {
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    shadowOffset: { width: 0, height: 1 },
    overflow: "visible",
    shadowColor: "black",
    backgroundColor: "white",
    borderRadius: 4,
    alignItems: "center",
    padding: Spacing.md,
    marginVertical: Spacing.sm
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  icon: { width: Spacing.lg, aspectRatio: 1 },
  text: {
    color: "gray",
    marginLeft: 12,
    fontSize: FontSize.md,
    fontWeight: "600"
  }
});

export default GoogleAuthButton;
