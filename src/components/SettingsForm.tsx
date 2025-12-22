import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "elements/Text";
import Button from "elements/Button";
import SoundEffectsToggle from "./SoundEffectsToggle";
import SpendModeSelector from "./SpendModeSelector";
import { SpendMode } from "types/settings";
import COLORS from "../constants/colors";

interface SettingsFormProps {
  soundEffects: boolean;
  spendMode: SpendMode;
  error: string;
  onToggleSoundEffects: () => void;
  onSelectSpendMode: (mode: SpendMode) => void;
  onSave: () => Promise<void>;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  soundEffects,
  spendMode,
  error,
  onToggleSoundEffects,
  onSelectSpendMode,
  onSave,
}) => (
  <View style={styles.form}>
    <SoundEffectsToggle
      soundEffects={soundEffects}
      onToggle={onToggleSoundEffects}
    />
    <SpendModeSelector spendMode={spendMode} onSelect={onSelectSpendMode} />
    {error && <Text style={styles.errorText}>{error}</Text>}
    <Button title="Save Settings" onPress={onSave} variant="primary" />
  </View>
);

const styles = StyleSheet.create({
  form: {
    marginVertical: 20,
    gap: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
    marginBottom: 8,
  },
});

export default SettingsForm;
