import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BankNote from "../BankNote";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface WaterGunModeProps {
  amount: number;
  onSwipe: () => void;
}

const WaterGunMode: React.FC<WaterGunModeProps> = ({ amount, onSwipe }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [isHolding, setIsHolding] = useState(false);
  const [cardHeight, setCardHeight] = useState<number>(0);
  const sprayInterval = useRef<NodeJS.Timeout>(null);

  const handlePressIn = () => {
    setIsHolding(true);
    // Start spraying immediately
    onSwipe();

    // Continue spraying every 1 second
    sprayInterval.current = setInterval(() => {
      onSwipe();
    }, 1000);
  };

  const handlePressOut = () => {
    setIsHolding(false);
    // Stop spraying
    if (sprayInterval.current) {
      clearInterval(sprayInterval.current);
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (sprayInterval.current) {
        clearInterval(sprayInterval.current);
      }
    };
  }, []);

  const handleBankNoteLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setCardHeight(height);
  };

  return (
    <View style={styles.waterGunContainer}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ scale }],
              height: cardHeight || undefined,
            },
          ]}
        >
          <BankNote amount={amount} onLayout={handleBankNoteLayout} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <Text style={styles.instruction}>
        {isHolding
          ? "Spraying every 1s - Release to stop"
          : "Tap & hold to spray cash"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  waterGunContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  card: {
    width: "100%",
    height: 200,
  },
  instruction: {
    marginTop: 20,
    color: COLORS.lightGray,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default WaterGunMode;
