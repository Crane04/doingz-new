import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface EmptyStateProps {
  setIsCreateEventOpen: (open: boolean) => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ setIsCreateEventOpen }) => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIcon}>
      <MaterialIcons name="celebration" size={64} color={COLORS.primary} />
    </View>
    <Text weight="bold" style={styles.emptyTitle}>
      No Events found
    </Text>
    <Text style={styles.emptyDescription}>
      Create your first event and start spraying cash with friends!
    </Text>
    <TouchableOpacity
      style={styles.emptyButton}
      onPress={() => setIsCreateEventOpen(true)}
    >
      <MaterialIcons name="add" size={20} color={COLORS.white} />
      <Text weight="bold" style={styles.emptyButtonText}>
        Create First Event
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${COLORS.primary}20`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    color: COLORS.light,
    textAlign: "center",
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: COLORS.lightGray,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default EmptyState;
