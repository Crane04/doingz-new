import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import COLORS from "../constants/colors";
import Text from "./Text";

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "blue"
    | "lightGray";
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  variant = "primary",
  loading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: COLORS[variant] },
        disabled && styles.disabledButton,
        style,
      ]}
      activeOpacity={0.7}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: COLORS.gray,
  },
});

export default Button;
