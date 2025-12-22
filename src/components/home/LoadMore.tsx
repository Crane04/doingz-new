import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Text from "elements/Text";
import COLORS from "constants/colors";

const LoadingMore: React.FC = () => (
  <View style={styles.loadingMoreContainer}>
    <ActivityIndicator size="small" color={COLORS.primary} />
    <Text style={styles.loadingMoreText}>Loading more events...</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  loadingMoreText: {
    color: COLORS.lightGray,
    fontSize: 14,
  },
});

export default LoadingMore;
