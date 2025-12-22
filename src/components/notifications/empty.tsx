import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";

const EmptyNotificationsState: React.FC = () => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIcon}>
      <MaterialIcons
        name="notifications-off"
        size={64}
        color={COLORS.primary}
      />
    </View>
    <Text weight="bold" style={styles.emptyTitle}>
      No Notifications Yet
    </Text>
    <Text style={styles.emptyDescription}>
      You’ll see updates here when you receive new notifications.
    </Text>
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
  },
});

export default EmptyNotificationsState;
