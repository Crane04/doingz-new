// components/WaterSprayEffect.tsx (for individual water droplets)
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View, Easing } from "react-native";

const { width, height } = Dimensions.get("window");

interface WaterSprayEffectProps {
  onComplete: () => void;
}

const WaterSprayEffect: React.FC<WaterSprayEffectProps> = ({ onComplete }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.3)).current;

  const randomX = (Math.random() - 0.5) * 200; // -100 to 100
  const randomDuration = 800 + Math.random() * 400; // 800-1200ms

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -200,
        duration: randomDuration,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
      Animated.timing(translateX, {
        toValue: randomX,
        duration: randomDuration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: randomDuration,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: randomDuration * 0.5,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) onComplete();
    });
  }, []);

  return (
    <Animated.View
      style={[
        styles.waterDrop,
        {
          opacity,
          transform: [{ translateY }, { translateX }, { scale }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  waterDrop: {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: "#009AD9",
    borderRadius: 4,
    bottom: 100,
    left: width / 2 - 4,
  },
});

export default WaterSprayEffect;
