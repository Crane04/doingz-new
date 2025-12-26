import React from "react";
import { StyleSheet } from "react-native";
import Text from "elements/Text";
import COLORS from "constants/colors";
import { useVersion } from "contexts/VersionContext";

const ProfileBalance: React.FC<{ balance: number }> = ({ balance }) => {
  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(balance);

  return (
    <Text style={styles.balance}>
      Available Doingz: 🔥
      {formattedBalance}
    </Text>
  );
};

const styles = StyleSheet.create({
  balance: {
    color: COLORS.secondary,
    fontSize: 16,

    marginTop: 10,
  },
});

export default ProfileBalance;
