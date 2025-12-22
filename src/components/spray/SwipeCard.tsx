// components/SwipeCard/index.tsx
import React from "react";
import { View } from "react-native";
import { useSettings } from "hooks/useSettings";
import SprayMode from "./SprayMode";
import TapMode from "./TapMode";
import WaterGunMode from "./WaterGunMode";

interface SwipeCardProps {
  amount: number;
  onSwipe: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ amount, onSwipe }) => {
  const { settings } = useSettings();
  const { spendMode } = settings;

  const renderMode = () => {
    switch (spendMode) {
      case "Water Gun":
        return <WaterGunMode amount={amount} onSwipe={onSwipe} />;
      case "Tap":
        return <TapMode amount={amount} onSwipe={onSwipe} />;
      case "Spray":
      default:
        return <SprayMode amount={amount} onSwipe={onSwipe} />;
    }
  };

  return <View>{renderMode()}</View>;
};

export default SwipeCard;
