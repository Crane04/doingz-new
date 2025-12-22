import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import COLORS from "constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, style, ...props }) => {
  return (
    <SafeAreaView style={[styles.container, style]} {...props}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
});

export default Container;
