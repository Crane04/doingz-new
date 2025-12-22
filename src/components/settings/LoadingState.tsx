// components/settings/LoadingState.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "elements/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "constants/colors";

const LoadingState: React.FC = () => {
  return (
    <View style={styles.center}>
      <View style={styles.loadingContainer}>
        <MaterialCommunityIcons name="cog" size={48} color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dark,
  },
  loadingContainer: {
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    color: COLORS.lightGray,
    fontSize: 16,
  },
});

export default LoadingState;
