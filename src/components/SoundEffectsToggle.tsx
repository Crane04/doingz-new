import React from "react";
import { View, Switch, StyleSheet } from "react-native";
import Text from "elements/Text";
import COLORS from "../constants/colors";

interface SoundEffectsToggleProps {
  soundEffects: boolean;
  onToggle: () => void;
}

const SoundEffectsToggle: React.FC<SoundEffectsToggleProps> = ({
  soundEffects,
  onToggle,
}) => (
  <View style={styles.settingRow}>
    <Text style={styles.label}>Sound Effects</Text>
    <Switch
      value={soundEffects}
      onValueChange={onToggle}
      trackColor={{ false: COLORS.gray, true: COLORS.primary }}
      thumbColor={COLORS.light}
    />
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
  },
});

export default SoundEffectsToggle;
