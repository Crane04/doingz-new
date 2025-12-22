// components/settings/ErrorCard.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "elements/Text";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "constants/colors";

interface ErrorCardProps {
  error: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ error }) => {
  return (
    <View style={styles.errorCard}>
      <Ionicons name="warning" size={20} color={COLORS.danger} />
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${COLORS.danger}20`,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: `${COLORS.danger}30`,
    gap: 8,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 14,
    flex: 1,
  },
});

export default ErrorCard;
