import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

interface LoaderProps {
  size?: "small" | "large";
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "large",
  color = COLORS.secondary,
}) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default Loader;
