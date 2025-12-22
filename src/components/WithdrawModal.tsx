import React, { useState } from "react";
import { View, Modal, StyleSheet, ActivityIndicator } from "react-native";
import Text from "elements/Text";
import Input from "elements/Input";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import COLORS from "../constants/colors";
import { createWithdrawal } from "services/withdrawService";
import { fetchWallet } from "services/walletService";
import { useWallet } from "contexts/WalletContext";

interface WithdrawModalProps {
  visible: boolean;
  onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ visible, onClose }) => {
  const { refreshWallet } = useWallet();
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleWithdraw = async () => {
    try {
      const validationErrors: { [key: string]: string } = {};
      if (!amount.trim()) validationErrors.amount = "Amount is required";

      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;

      setLoading(true);
      const response = await createWithdrawal({
        amount: parseInt(amount),
        type: "personal",
        identifier: "personal",
      });

      setLoading(false);
      setMessage({
        text: "Withdrawal request submitted successfully!",
        type: "success",
      });

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      setLoading(false);
      setMessage({
        text: error?.message || "Withdrawal failed",
        type: "error",
      });
    } finally {
      await refreshWallet();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.withdrawContainer}>
          <ModalHeader onClose={onClose} text="Withdraw Your Doingz" />
          <View style={styles.content}>
            <Input
              label="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              editable={!loading}
              error={errors.amount}
            />

            {message && (
              <Text
                style={[
                  styles.message,
                  {
                    color:
                      message.type === "success"
                        ? COLORS.success
                        : COLORS.danger,
                  },
                ]}
              >
                {message.text}
              </Text>
            )}
          </View>

          {loading ? (
            <View style={{ padding: 15, alignItems: "center" }}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          ) : (
            <ModalFooter
              onClose={onClose}
              handleSubmit={handleWithdraw}
              closeText="Withdraw"
            />
          )}
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
  withdrawContainer: {
    backgroundColor: COLORS.dark,
    // marginHorizontal: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
    height: "80%",
  },
  content: {
    padding: 15,
  },
  error: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 5,
  },
  message: {
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
  },
});

export default WithdrawModal;
