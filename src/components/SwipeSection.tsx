import React from "react";
import { View, StyleSheet } from "react-native";
import SwipeCard from "./spray/SwipeCard";
import CashSpray from "./CashSpray";
import { useVersion } from "contexts/VersionContext";

interface SwipeSectionProps {
  selectedAmount: number;
  sprays: number[];
  setSprays: React.Dispatch<React.SetStateAction<number[]>>;
  handleSwipe: () => Promise<void>;
}

const SwipeSection: React.FC<SwipeSectionProps> = ({
  selectedAmount,
  sprays,
  setSprays,
  handleSwipe,
}) => {
  const { version } = useVersion();

  return (
    <View style={styles.swipeSection}>
      <SwipeCard amount={selectedAmount} onSwipe={handleSwipe} />
      {!version?.hidden &&
        sprays.map((val, index) => (
          <CashSpray
            key={index}
            amount={val}
            onComplete={() =>
              setSprays((prev) => prev.filter((_, i) => i !== 0))
            }
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  swipeSection: {
    width: "100%",
    marginBottom: 30,
  },
});

export default SwipeSection;
