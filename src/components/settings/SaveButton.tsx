// components/settings/SaveButton.tsx
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Text from "elements/Text";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "constants/colors";

interface SaveButtonProps {
  onPress: () => void;
  hasChanges: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onPress, hasChanges }) => {
  const disabled = !hasChanges;

  return (
    <TouchableOpacity
      style={[styles.saveButton, disabled && { backgroundColor: COLORS.gray }]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text weight="bold" style={styles.saveButtonText}>
        {disabled ? "Changes Saved" : "Save Changes"}
      </Text>
      <Ionicons
        name={disabled ? "checkmark" : "checkmark-circle"}
        size={20}
        color={COLORS.light}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    padding: 18,
    marginTop: 24,
    gap: 8,
  },
  saveButtonText: {
    color: COLORS.light,
    fontSize: 16,
  },
});

export default SaveButton;
