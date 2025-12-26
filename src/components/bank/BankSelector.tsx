// components/BankSelector.tsx
import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface BankSelectorProps {
  label: string;
  selectedBank: string;
  onPress: () => void;
  error?: string;
}

const BankSelector: React.FC<BankSelectorProps> = ({
  label,
  selectedBank,
  onPress,
  error,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.bankSelector, error && styles.inputError]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.bankSelectorText,
            !selectedBank && styles.placeholderText,
          ]}
        >
          {selectedBank || "Select your bank"}
        </Text>
        <Ionicons name="chevron-down" size={20} color={COLORS.lightGray} />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: COLORS.light,
    marginBottom: 8,
  },
  bankSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.darkGray,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 12,
    padding: 16,
    minHeight: 56,
  },
  bankSelectorText: {
    fontSize: 16,
    color: COLORS.light,
    flex: 1,
  },
  placeholderText: {
    color: COLORS.lightGray,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 4,
  },
});

export default BankSelector;
