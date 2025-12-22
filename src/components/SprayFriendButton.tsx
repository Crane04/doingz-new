import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Text from "elements/Text";
import COLORS from "constants/colors";

const SprayFriendButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>Spray a Friend</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.dark,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  text: { color: COLORS.light, fontWeight: "600", fontSize: 14 },
});

export default SprayFriendButton;
