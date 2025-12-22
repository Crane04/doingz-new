export type SpendMode = "Spray" | "Tap" | "Water Gun";

interface Settings {
  soundEffects: boolean;
  spendMode: SpendMode;
}

export type { Settings };
