// components/events/EmptyState.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = "calendar-outline",
}) => {
  return (
    <View style={styles.emptyState}>
      <Ionicons name={icon} size={64} color={COLORS.lightGray} />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    color: COLORS.light,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 14,
    color: COLORS.lightGray,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default EmptyState;
