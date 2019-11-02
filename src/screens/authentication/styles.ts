import { StyleSheet } from "react-native";
import { Colors, FontSize } from "../../styles/base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30
  },
  title: {
    textAlign: "center",
    fontSize: FontSize.lg,
    color: Colors.white,
    fontWeight: "600"
  }
});

export default styles;
