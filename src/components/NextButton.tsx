import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "constants/colors";
import Text from "../elements/Text";

interface NextButtonProps {
  text: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  onPress: (event: GestureResponderEvent) => void;
}

const NextButton: React.FC<NextButtonProps> = ({
  text,
  leftIcon = "list",
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <Ionicons
          name={leftIcon}
          size={22}
          color={COLORS.light}
          style={styles.leftIcon}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color={COLORS.lightGray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: COLORS.darkGray,
    marginVertical: 12,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,

    color: COLORS.light,
  },
});

export default NextButton;
