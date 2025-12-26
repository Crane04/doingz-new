import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "../../constants/colors";

interface CreateEventHeaderProps {
  onClose: () => void;
}

const CreateEventHeader: React.FC<CreateEventHeaderProps> = ({ onClose }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onClose} style={styles.backButton}>
      <MaterialIcons name="arrow-back" size={24} color={COLORS.light} />
    </TouchableOpacity>
    <Text style={styles.title}>Create Event</Text>
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
    ,
    color: COLORS.light,
  },
});

export default CreateEventHeader;
