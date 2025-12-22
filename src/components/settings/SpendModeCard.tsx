// components/settings/SpendModeCard.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "elements/Text";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import COLORS from "constants/colors";

const spendModeOptions = [
  {
    mode: "Spray",
    icon: "spray",
    description: "Spray in all directions",
  },
  {
    mode: "Tap",
    icon: "hand-point-up",
    description: "Tap to spray quickly",
  },
  {
    mode: "Water Gun",
    icon: "water",
    description: "Rapid fire ",
  },
];

interface SpendModeCardProps {
  spendMode: string;
  onSelect: (mode: string) => void;
}

const SpendModeCard: React.FC<SpendModeCardProps> = ({
  spendMode,
  onSelect,
}) => {
  const getModeIcon = (iconName: string) => {
    switch (iconName) {
      case "spray":
        return (
          <MaterialCommunityIcons
            name="spray"
            size={24}
            color={COLORS.primary}
          />
        );
      case "hand-point-up":
        return (
          <FontAwesome5 name="hand-point-up" size={20} color={COLORS.primary} />
        );
      case "water":
        return <Ionicons name="water" size={24} color={COLORS.primary} />;
      default:
        return (
          <MaterialCommunityIcons
            name="cash"
            size={24}
            color={COLORS.primary}
          />
        );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIcon}>
          <MaterialCommunityIcons
            name="cash-multiple"
            size={20}
            color={COLORS.primary}
          />
        </View>
        <View style={styles.cardTitleContainer}>
          <Text weight="bold" style={styles.cardTitle}>
            Spend Mode
          </Text>
          <Text style={styles.cardDescription}>
            Choose how you want to celebrate
          </Text>
        </View>
      </View>

      <View style={styles.modeOptions}>
        {spendModeOptions.map((option) => (
          <TouchableOpacity
            key={option.mode}
            style={[
              styles.modeOption,
              spendMode === option.mode && styles.modeOptionSelected,
            ]}
            onPress={() => onSelect(option.mode)}
          >
            <View style={styles.modeIconContainer}>
              {getModeIcon(option.icon)}
            </View>
            <View style={styles.modeTextContainer}>
              <Text
                style={[
                  styles.modeTitle,
                  spendMode === option.mode && styles.modeTitleSelected,
                ]}
              >
                {option.mode}
              </Text>
              <Text style={styles.modeDescription}>{option.description}</Text>
            </View>
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radio,
                  spendMode === option.mode && styles.radioSelected,
                ]}
              >
                {spendMode === option.mode && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${COLORS.primary}20`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    color: COLORS.light,
    fontSize: 18,
    marginBottom: 4,
  },
  cardDescription: {
    color: COLORS.lightGray,
    fontSize: 14,
  },
  modeOptions: {
    gap: 12,
  },
  modeOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.dark,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  modeOptionSelected: {
    backgroundColor: `${COLORS.primary}20`,
    borderColor: COLORS.primary,
  },
  modeIconContainer: {
    marginRight: 12,
  },
  modeTextContainer: {
    flex: 1,
  },
  modeTitle: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  modeTitleSelected: {
    color: COLORS.primary,
  },
  modeDescription: {
    color: COLORS.lightGray,
    fontSize: 12,
  },
  radioContainer: {
    marginLeft: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.darkGray,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.light,
  },
});

export default SpendModeCard;
