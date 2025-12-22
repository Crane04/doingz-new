// components/SwipeCard/SprayMode.tsx
import React, { useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  View,
} from "react-native";
import BankNote from "../BankNote";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface SprayModeProps {
  amount: number;
  onSwipe: () => void;
}

const SprayMode: React.FC<SprayModeProps> = ({ amount, onSwipe }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [cardHeight, setCardHeight] = useState<number>(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const swipeDistance = Math.sqrt(
          gestureState.dx ** 2 + gestureState.dy ** 2
        );
        return swipeDistance > 5;
      },
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, gestureState) => {
        // Only allow upward drag (dy must be negative)
        if (gestureState.dy < 0) {
          const LIMIT = -120; // how far up it can go
          translateY.setValue(Math.max(gestureState.dy, LIMIT));
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        const swipeDistance = Math.abs(gestureState.dy);

        if (gestureState.dy < -50) {
          // Trigger swipe
          onSwipe();

          Animated.timing(translateY, {
            toValue: -500, // fly off upward
            duration: 180,
            useNativeDriver: true,
          }).start(() => {
            // Reset position smoothly (fixes Android stuck)
            translateY.setValue(0);
          });
        } else {
          // Return card smoothly to idle position
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 6,
          }).start();
        }
      },
    })
  ).current;

  const handleBankNoteLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setCardHeight(height);
  };

  return (
    <View style={styles.wrapper} onStartShouldSetResponder={() => true}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateY }],
            opacity,
            height: cardHeight || undefined,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <BankNote amount={amount} onLayout={handleBankNoteLayout} />
      </Animated.View>
      <Text style={styles.instruction}>Swipe to show your doingz</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
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

export default SprayMode;
