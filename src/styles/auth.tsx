import COLORS from "constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    color: COLORS.light,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.lightGray,
  },
});
export default styles;
