import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import Text from "elements/Text";
import Input from "elements/Input";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { fundWallet } from "services/walletService";
import COLORS from "../constants/colors";
import { useVersion } from "contexts/VersionContext";
import { useWallet } from "contexts/WalletContext";

interface FundWalletModalProps {
  visible: boolean;
  onClose: () => void;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({
  visible,
  onClose,
}) => {
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const { version } = useVersion();
  const { refreshWallet } = useWallet();

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    setErrors(newErrors);
    setPaymentLink(null); // Reset payment link
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      const { authorization_url, autoCredit } = await fundWallet(
        parsedAmount,
        setErrors,
        version?.hidden || false
      );

      if (autoCredit) {
        await refreshWallet();
        onClose();
      } else {
        if (authorization_url) {
          setPaymentLink(authorization_url);
          try {
            await Linking.openURL(authorization_url);
          } catch (error) {
            // If automatic opening fails, display the link
          }
        }
      }
    } catch (error) {
      // Errors are set in fundWallet
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPaymentLink(null);
    onClose();
  };

  const handleLinkPress = () => {
    if (paymentLink) {
      Linking.openURL(paymentLink).catch(() => {
        // Handle error if link can't be opened
      });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.fundContainer}>
          <ModalHeader onClose={handleClose} text="Get Doingz" />
          <View style={styles.content}>
            {!paymentLink ? (
              <>
                <Input
                  label="Amount"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  error={errors.amount}
                />
                {errors.submit && (
                  <Text style={styles.error}>{errors.submit}</Text>
                )}
              </>
            ) : (
              <View style={styles.linkContainer}>
                <Text style={styles.linkTitle}>
                  Payment link generated. Click below to proceed:
                </Text>
                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={handleLinkPress}
                  activeOpacity={0.7}
                >
                  <Text style={styles.linkText} numberOfLines={1}>
                    {paymentLink}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.linkNote}>
                  If the link doesn't open automatically, tap above to proceed
                  with payment.
                </Text>
              </View>
            )}
          </View>
          <ModalFooter
            onClose={handleClose}
            handleSubmit={handleSubmit}
            closeText={
              loading
                ? "Funding Wallet Doingz"
                : paymentLink
                ? "Close"
                : "Fund Wallet"
            }
            // submitText={paymentLink ? "Copy Link" : undefined}
            disabled={loading || !!paymentLink}
            // hideSubmit={!!paymentLink}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fundContainer: {
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: "80%",
    width: "100%",
  },
  content: {
    padding: 15,
    flex: 1,
  },
  error: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 5,
  },
  linkContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  linkTitle: {
    fontSize: 16,
    color: COLORS.light,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  linkButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  linkNote: {
    fontSize: 12,
    color: COLORS.lightGray,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});

export default FundWalletModal;
