// components/SwipeCard/TapMode.tsx
import React, { useRef, useState } from "react";
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

interface TapModeProps {
  amount: number;
  onSwipe: () => void;
}

const TapMode: React.FC<TapModeProps> = ({ amount, onSwipe }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [cardHeight, setCardHeight] = useState<number>(0);

  const handleTap = () => {
    scale.setValue(0.95);
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.05,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 60,
        useNativeDriver: true,
      }),
    ]).start();
    onSwipe();
  };

  const handleBankNoteLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setCardHeight(height);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={handleTap}>
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
      <Text style={styles.instruction}>Tap to show your doingz</Text>
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
  },
});

export default TapMode;
