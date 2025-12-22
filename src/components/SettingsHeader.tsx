import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "elements/Text";
import COLORS from "../constants/colors";

const SettingsHeader: React.FC = () => (
  <View style={styles.header}>
    <Text weight="bold" style={styles.title}>
      Settings
    </Text>
    <Text style={styles.subtitle}>Customize your experience</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    color: COLORS.light,
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: COLORS.light,
    fontSize: 16,
    marginTop: 8,
  },
});

export default SettingsHeader;
