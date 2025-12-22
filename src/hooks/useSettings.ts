import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Settings, SpendMode } from "types/settings";

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    soundEffects: true,
    spendMode: "Spray",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const soundEffects = await AsyncStorage.getItem("soundEffects");
        const spendMode = await AsyncStorage.getItem("spendMode");
        setSettings({
          soundEffects: soundEffects ? JSON.parse(soundEffects) : true,
          spendMode: (spendMode as SpendMode) || "Spray",
        });
      } catch (err) {
        setError("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const saveSettings = async (newSettings: Settings) => {
    try {
      await AsyncStorage.setItem(
        "soundEffects",
        JSON.stringify(newSettings.soundEffects)
      );
      await AsyncStorage.setItem("spendMode", newSettings.spendMode);
      setSettings(newSettings);
      setError("");
    } catch (err) {
      setError("Failed to save settings");
    }
  };

  return { settings, setSettings, saveSettings, loading, error };
};
