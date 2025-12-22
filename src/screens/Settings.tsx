// screens/SettingsScreen.tsx
import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet, StatusBar } from "react-native";
import Text from "elements/Text";
import { useSettings } from "hooks/useSettings";
import {
  SettingsHeader,
  SoundEffectsCard,
  SpendModeCard,
  SaveButton,
  ErrorCard,
  LoadingState,
} from "components/settings";
import COLORS from "constants/colors";
import Header from "components/Header";

const Settings: React.FC = () => {
  const { settings, setSettings, saveSettings, loading, error } = useSettings();
  const [initialSettings, setInitialSettings] = React.useState(settings);

  useEffect(() => {
    setInitialSettings(settings);
  }, [loading]);

  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(initialSettings);

  const handleSoundEffectsToggle = () => {
    setSettings((prev) => ({ ...prev, soundEffects: !prev.soundEffects }));
  };

  const handleSpendModeSelect = (mode: any) => {
    setSettings((prev) => ({ ...prev, spendMode: mode }));
  };

  const handleSave = async () => {
    await saveSettings(settings);
    setInitialSettings(settings);
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Header title="Settings" route={"Settings"} />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.dark} />

        <SettingsHeader />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <SoundEffectsCard
            soundEffects={settings.soundEffects}
            onToggle={handleSoundEffectsToggle}
          />

          <SpendModeCard
            spendMode={settings.spendMode}
            onSelect={handleSpendModeSelect}
          />

          {error && <ErrorCard error={error} />}

          <SaveButton onPress={handleSave} hasChanges={hasChanges} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
});

export default Settings;
