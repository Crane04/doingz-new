import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Text from "elements/Text";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

interface TicketHeaderProps {
  onClose: () => void;
}

const TicketHeader: React.FC<TicketHeaderProps> = ({ onClose }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onClose} style={styles.backButton}>
      <MaterialIcons name="arrow-back" size={24} color={COLORS.light} />
    </TouchableOpacity>
    <Text style={styles.title}>Buy Tickets</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    backgroundColor: COLORS.dark,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,

    color: COLORS.light,
    marginLeft: 10,
  },
});

export default TicketHeader;
