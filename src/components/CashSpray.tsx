import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, Easing } from "react-native";

const { height } = Dimensions.get("window");

interface CashSprayProps {
  amount?: number;
  onComplete?: () => void;
}

const CashSpray: React.FC<CashSprayProps> = ({ amount, onComplete }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Simple single animation value
    Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start(({ finished }) => {
      if (finished && onComplete) {
        onComplete();
      }
    });
  }, []);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height * 0.6],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [1, 1, 0],
  });

  const scale = animation.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0.8, 1.1, 1],
  });

  // Add some random horizontal movement
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (Math.random() - 0.5) * 100], // -50 to 50
  });

  return (
    <Animated.View
      style={[
        styles.cashContainer,
        {
          opacity,
          transform: [{ translateY }, { scale }, { translateX }],
        },
      ]}
    >
      <Text style={styles.text}>💸 {amount?.toLocaleString()}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cashContainer: {
    position: "absolute",
    bottom: 100,
    left: "50%",
    marginLeft: -40,
  },
  text: {
    fontSize: 20,

    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: "hidden",
  },
});

export default CashSpray;
