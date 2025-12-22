// hooks/useSound.ts
import { useCallback } from "react";
import { Audio } from "expo-av";
import { useSettings } from "./useSettings";

// Initialize the sound once
let sound: Audio.Sound | null = null;
let isInitialized = false;

export const useSound = () => {
  const { settings } = useSettings();

  const playSound = useCallback(async () => {
    if (!settings.soundEffects) {
      return;
    }

    try {
      if (!isInitialized) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          require("../../assets/sounds/click.mp3")
        );
        sound = newSound;
        isInitialized = true;
      }

      // Stop, reset and play
      if (sound) {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
        await sound.playAsync();
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }, [settings.soundEffects]);

  return { playSound };
};
