import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Button from "elements/Button";
import Text from "elements/Text";
import COLORS from "constants/colors";
import { createWithdrawal } from "services/withdrawService";

interface WithdrawSectionProps {
  cashedOut: boolean;
  eventIdentifier: string;
}

const WithdrawSection: React.FC<WithdrawSectionProps> = ({
  cashedOut: initialCashedOut,
  eventIdentifier,
}) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "completed">(
    initialCashedOut ? "completed" : "idle"
  );
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | null;
  }>({
    text: "",
    type: null,
  });

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      setMessage({ text: "", type: null });

      const response = await createWithdrawal({
        type: "event",
        identifier: eventIdentifier,
        amount: 2,
      });

      console.log("Withdrawal Success:", response.data);

      setStatus("pending");
      setMessage({
        text: "Withdrawal request submitted successfully!",
        type: "success",
      });
    } catch (error: any) {
      console.error("Withdrawal Error:", error.message);

      setMessage({
        text:
          error.message || "Failed to process withdrawal. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const buttonText =
    status === "completed"
      ? "Doings Claimed"
      : status === "pending"
      ? "Claim Pending"
      : "Claim Doingz";

  const noteText =
    status === "completed"
      ? "You’ve already claimed all available Doings."
      : status === "pending"
      ? "Your claim is being processed..."
      : "Claim all your available Doings.";

  return (
    <View style={styles.withdrawSection}>
      <Button
        title={buttonText}
        onPress={handleWithdraw}
        variant="primary"
        // disabled={status !== "idle"}
        loading={loading}
        style={{
          ...styles.withdrawButton,
          backgroundColor:
            status === "completed"
              ? COLORS.gray
              : status === "pending"
              ? COLORS.secondary
              : COLORS.primary,
        }}
        textStyle={styles.withdrawButtonText}
      />

      <Text style={styles.withdrawNote}>{noteText}</Text>

      {message.text ? (
        <Text
          style={[
            styles.messageText,
            {
              color: message.type === "error" ? COLORS.danger : COLORS.success,
            },
          ]}
        >
          {message.text}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  withdrawSection: {
    padding: 20,
    paddingTop: 0,
  },
  withdrawButton: {
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  withdrawButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  withdrawNote: {
    fontSize: 14,
    color: COLORS.lightGray,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
  },
  messageText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default WithdrawSection;
