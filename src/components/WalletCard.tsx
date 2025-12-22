import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import COLORS from "constants/colors";
import { useWallet } from "contexts/WalletContext";
import BalanceSection from "./BalanceSection";
import ActionButtons from "./ActionButtons";
import SprayFriendModal from "./SprayFriendModal";
import FundWalletModal from "./FundWalletModal";
import WithdrawModal from "./WithdrawModal";
import { useVersion } from "contexts/VersionContext";

const WalletCard: React.FC = () => {
  const [isSprayModalOpen, setIsSprayModalOpen] = useState(false);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { balance, refreshWallet } = useWallet();
  const { version } = useVersion();

  useEffect(() => {
    refreshWallet();
  }, []);

  return (
    <View style={{ backgroundColor: COLORS.dark }}>
      <View style={styles.container}>
        <BalanceSection
          balance={balance}
          onWithdraw={() => {
            !version?.hidden && setIsWalletModalOpen(true);
          }}
        />

        <ActionButtons
          onFundPress={() => setIsFundModalOpen(true)}
          onSprayPress={() => setIsSprayModalOpen(true)}
        />

        <SprayFriendModal
          visible={isSprayModalOpen}
          onClose={() => setIsSprayModalOpen(false)}
        />
        <FundWalletModal
          visible={isFundModalOpen}
          onClose={() => setIsFundModalOpen(false)}
        />

        <WithdrawModal
          visible={isWalletModalOpen}
          onClose={() => setIsWalletModalOpen(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default WalletCard;
