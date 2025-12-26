import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface WaterGunProps {
  amount: number;
  onSprayStart: () => void;
  onSprayEnd: () => void;
  isActive?: boolean;
}

const WaterGun: React.FC<WaterGunProps> = ({
  amount,
  onSprayStart,
  onSprayEnd,
  isActive = false,
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const sprayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isHolding) {
      // Pulse animation when active
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Spray effect animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(sprayAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(sprayAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      sprayAnim.stopAnimation();
      pulseAnim.setValue(0);
      sprayAnim.setValue(0);
    }
  }, [isHolding]);

  const handlePressIn = () => {
    setIsHolding(true);
    onSprayStart();
  };

  const handlePressOut = () => {
    setIsHolding(false);
    onSprayEnd();
  };

  const gunScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const sprayOpacity = sprayAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.7],
  });

  return (
    <View style={styles.container}>
      {/* Water Spray Effect */}
      <Animated.View
        style={[
          styles.sprayEffect,
          {
            opacity: sprayOpacity,
          },
        ]}
      >
        <MaterialCommunityIcons name="water" size={60} color={COLORS.blue} />
      </Animated.View>

      {/* Water Gun */}
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.gunContainer,
            {
              transform: [{ scale: gunScale }],
            },
          ]}
        >
          <View style={styles.gunWrapper}>
            <MaterialCommunityIcons
              name="water-pump"
              size={80}
              color={COLORS.primary}
            />

            {/* Amount Badge */}
            <View style={styles.amountBadge}>
              <Text style={styles.amountText}>🔥₦{amount}</Text>
            </View>
          </View>

          {/* Active Indicator */}
          {isHolding && (
            <View style={styles.activeIndicator}>
              <Text style={styles.activeText}>SPRAYING...</Text>
            </View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Instructions */}
      <Text style={styles.instruction}>
        {isHolding ? "Release to stop" : "Tap & hold to spray"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  sprayEffect: {
    position: "absolute",
    top: -30,
  },
  gunContainer: {
    alignItems: "center",
    padding: 20,
  },
  gunWrapper: {
    alignItems: "center",
    position: "relative",
  },
  amountBadge: {
    position: "absolute",
    bottom: -10,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.light,
  },
  amountText: {
    color: COLORS.dark,
    fontSize: 14,
  },
  activeIndicator: {
    position: "absolute",
    top: -25,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeText: {
    color: COLORS.secondary,
    fontSize: 12,
  },
  instruction: {
    marginTop: 25,
    color: COLORS.lightGray,
    fontSize: 14,
    textAlign: "center",
  },
});

export default WaterGun;
