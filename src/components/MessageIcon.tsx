import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

interface MessageIconProps {
  onPress: () => void;
}

const MessageIcon: React.FC<MessageIconProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.messageIconContainer} onPress={onPress}>
    <MaterialIcons name="message" size={30} color={COLORS.light} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  messageIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 20,
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default MessageIcon;
