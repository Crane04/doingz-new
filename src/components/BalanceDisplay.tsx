import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "elements/Text";
import COLORS from "../constants/colors";

interface BalanceDisplayProps {
  balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => (
  <View style={styles.container}>
    <Text style={styles.balanceText}>
      Available Balance: ₦{balance.toLocaleString("en-NG")}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  balanceText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.light,
    marginBottom: 30,
    textAlign: "center",
  },
});

export default BalanceDisplay;
