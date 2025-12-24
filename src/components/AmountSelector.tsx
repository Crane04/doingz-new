import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Text from "elements/Text";
import COLORS from "../constants/colors";

interface AmountSelectorProps {
  selectedAmount: number;
  setSelectedAmount: React.Dispatch<React.SetStateAction<number>>;
  amountError: string;
  setAmountError: React.Dispatch<React.SetStateAction<string>>;
}

const amountOptions = [200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];

const AmountSelector: React.FC<AmountSelectorProps> = ({
  selectedAmount,
  setSelectedAmount,
  amountError,
  setAmountError,
}) => {
  const renderAmountButton = (amount: number) => (
    <TouchableOpacity
      key={amount}
      style={[
        styles.amountButton,
        selectedAmount === amount && styles.amountButtonSelected,
      ]}
      onPress={() => {
        setSelectedAmount(amount);
        setAmountError("");
      }}
    >
      <Text
        style={[
          styles.amountButtonText,
          selectedAmount === amount && styles.amountButtonTextSelected,
        ]}
      >
        {amount.toLocaleString("en-NG")}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.amountSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.amountButtonContainer}
      >
        {amountOptions.map((amount) => renderAmountButton(amount))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  amountSection: {
    width: "100%",
    marginBottom: 20,
  },
  amountSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.light,
    marginBottom: 12,
  },
  amountButtonContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 4,
  },
  amountButton: {
    backgroundColor: COLORS.gray,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 80,
    alignItems: "center",
    marginRight: 8, // spacing between buttons
  },
  amountButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  amountButtonText: {
    fontSize: 14,
    color: COLORS.light,
    fontWeight: "600",
  },
  amountButtonTextSelected: {
    color: COLORS.dark,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
    marginBottom: 8,
  },
});

export default AmountSelector;
