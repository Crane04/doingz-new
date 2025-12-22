import React from "react";
import { View, StyleSheet } from "react-native";
import { useEvents } from "../contexts/EventContext";
import { Input } from "elements";
import COLORS from "constants/colors";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useEvents();

  return (
    <>
      <Input
        placeholder="Search events..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "green",

  },
  input: {
    // flex: 1,
    width: "80%",
  },
  icon: {
    marginLeft: 10,
  },
});

export default SearchBar;
