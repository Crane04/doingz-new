import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const settings = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  content: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dark,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
  },
});

export default settings;
