import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";

const FundWalletButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Ionicons name="add" size={16} color={COLORS.dark} />
    <Text style={styles.text}>Get Doingz</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 4,
  },
  text: { color: COLORS.dark, fontWeight: "600", fontSize: 14, marginLeft: 4 },
});

export default FundWalletButton;
