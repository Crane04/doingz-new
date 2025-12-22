// components/settings/SoundEffectsCard.tsx
import React from "react";
import { View, Switch, StyleSheet } from "react-native";
import Text from "elements/Text";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "constants/colors";

interface SoundEffectsCardProps {
  soundEffects: boolean;
  onToggle: () => void;
}

const SoundEffectsCard: React.FC<SoundEffectsCardProps> = ({
  soundEffects,
  onToggle,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIcon}>
          <Ionicons name="volume-high" size={20} color={COLORS.primary} />
        </View>
        <View style={styles.cardTitleContainer}>
          <Text weight="bold" style={styles.cardTitle}>
            Sound Effects
          </Text>
          <Text style={styles.cardDescription}>
            Enable sound feedback for actions
          </Text>
        </View>
      </View>
      <Switch
        value={soundEffects}
        onValueChange={onToggle}
        trackColor={{ false: COLORS.darkGray, true: COLORS.primary }}
        thumbColor={soundEffects ? COLORS.light : COLORS.lightGray}
        ios_backgroundColor={COLORS.darkGray}
      />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
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
});

export default SoundEffectsCard;
