import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "../constants/colors";

interface WalletActionsProps {
  onFundPress: () => void;
  onSprayPress: () => void;
}

const WalletActions: React.FC<WalletActionsProps> = ({
  onFundPress,
  onSprayPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fundButton} onPress={onFundPress}>
        <Ionicons name="add" size={16} color={COLORS.dark} />
        <Text style={styles.fundButtonText}>Fund Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sprayButton} onPress={onSprayPress}>
        <Text style={styles.sprayButtonText}>Spray a Friend</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  fundButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 4,
  },
  fundButtonText: {
    color: COLORS.dark,

    fontSize: 14,
    marginLeft: 4,
  },
  sprayButton: {
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
  sprayButtonText: {
    color: COLORS.light,

    fontSize: 14,
  },
});

export default WalletActions;
