import React from "react";
import { View, StyleSheet } from "react-native";
import FundWalletButton from "./FundWalletButton";
import SprayFriendButton from "./SprayFriendButton";

interface Props {
  onFundPress: () => void;
  onSprayPress: () => void;
}

const ActionButtons: React.FC<Props> = ({ onFundPress, onSprayPress }) => {
  return (
    <View style={styles.container}>
      <FundWalletButton onPress={onFundPress} />
      <SprayFriendButton onPress={onSprayPress} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default ActionButtons;
