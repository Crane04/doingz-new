import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "constants/colors";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChangeText }) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color={COLORS.gray} />
      <TextInput
        placeholder="Search banks..."
        placeholderTextColor={COLORS.gray}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    color: COLORS.dark,
  },
});

export default SearchBar;
