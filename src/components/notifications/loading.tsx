import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";

const LoadingNotificationsState: React.FC = () => (
  <View style={styles.loadingContainer}>
    <View style={styles.loadingIcon}>
      <MaterialIcons name="hourglass-empty" size={64} color={COLORS.primary} />
    </View>
    <Text weight="bold" style={styles.loadingTitle}>
      Loading Notifications
    </Text>
    <Text style={styles.loadingDescription}>
      Fetching your updates, please wait...
    </Text>
    <ActivityIndicator
      size="large"
      color={COLORS.primary}
      style={styles.spinner}
    />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  loadingIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${COLORS.primary}20`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  loadingTitle: {
    fontSize: 24,
    color: COLORS.light,
    textAlign: "center",
    marginBottom: 12,
  },
  loadingDescription: {
    fontSize: 16,
    color: COLORS.lightGray,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  spinner: {
    marginTop: 8,
  },
});

export default LoadingNotificationsState;
