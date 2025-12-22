// components/settings/SettingsHeader.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "elements/Text";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "constants/colors";

const SettingsHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Ionicons name="settings-sharp" size={28} color={COLORS.light} />
        <Text weight="bold" style={styles.title}>
          Settings
        </Text>
      </View>
      <Text style={styles.subtitle}>Customize your doingz experience</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    color: COLORS.light,
    fontSize: 28,
    marginLeft: 12,
  },
  subtitle: {
    color: COLORS.lightGray,
    fontSize: 16,
  },
});

export default SettingsHeader;
