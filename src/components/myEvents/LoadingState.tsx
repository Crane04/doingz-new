// components/events/LoadingState.tsx
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading your events...",
}) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    color: COLORS.lightGray,
    fontSize: 16,
  },
});

export default LoadingState;
