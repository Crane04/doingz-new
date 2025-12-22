import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "elements/Text";
import { SpendMode } from "types/settings";
import COLORS from "../constants/colors";

interface SpendModeSelectorProps {
  spendMode: SpendMode;
  onSelect: (mode: SpendMode) => void;
}

const spendModeOptions: SpendMode[] = ["Spray", "Tap", "Water Gun"];

const SpendModeSelector: React.FC<SpendModeSelectorProps> = ({
  spendMode,
  onSelect,
}) => (
  <View style={styles.settingRow}>
    <Text style={styles.label}>Spend Mode</Text>
    <View style={styles.modeButtonContainer}>
      {spendModeOptions.map((mode) => (
        <TouchableOpacity
          key={mode}
          style={[
            styles.modeButton,
            spendMode === mode && styles.modeButtonSelected,
          ]}
          onPress={() => onSelect(mode)}
        >
          <Text
            style={[
              styles.modeButtonText,
              spendMode === mode && styles.modeButtonTextSelected,
            ]}
          >
            {mode}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: COLORS.light,
    fontWeight: "600",
  },
  modeButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  modeButton: {
    backgroundColor: COLORS.gray,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 80,
    alignItems: "center",
  },
  modeButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  modeButtonText: {
    fontSize: 14,
    color: COLORS.light,
    fontWeight: "600",
  },
  modeButtonTextSelected: {
    color: COLORS.dark,
  },
});

export default SpendModeSelector;
