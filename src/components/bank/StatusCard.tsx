// components/StatusCard.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface StatusCardProps {
  type: "error" | "success";
  message: string;
  iconName: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ type, message, iconName }) => {
  const backgroundColor =
    type === "error" ? `${COLORS.danger}20` : `${COLORS.success}20`;
  const borderColor =
    type === "error" ? `${COLORS.danger}30` : `${COLORS.success}30`;
  const textColor = type === "error" ? COLORS.danger : COLORS.success;

  return (
    <View style={[styles.card, { backgroundColor, borderColor }]}>
      <Ionicons name={iconName as any} size={20} color={textColor} />
      <Text style={[styles.cardText, { color: textColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  cardText: {
    fontSize: 14,
    flex: 1,
  },
});

export default StatusCard;
