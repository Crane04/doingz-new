import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import COLORS from "constants/colors";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: COLORS.dark,
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    // marginLeft: 20,
  },
});

export default Container;
