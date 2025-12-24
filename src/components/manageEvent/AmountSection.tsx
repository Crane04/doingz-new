import React from "react";
import { Animated, StyleSheet } from "react-native";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface AmountSectionProps {
  displayAmount: string;
  attendees: number;
  animatedValue: Animated.Value;
}

const AmountSection: React.FC<AmountSectionProps> = ({
  displayAmount,
  attendees,
  animatedValue,
}) => {
  return (
    <Animated.View
      style={[
        styles.amountSection,
        {
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.amountLabel}>Total Doingz Received</Text>
      <Text style={styles.amountValue}>🔥{displayAmount}</Text>
      <Text style={styles.amountSubtext}>From {attendees} attendees</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  amountSection: {
    alignItems: "center",
    padding: 30,
    backgroundColor: COLORS.darkGray,
    marginVertical: 20,
    marginHorizontal: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  amountLabel: {
    fontSize: 18,
    color: COLORS.lightGray,
    marginBottom: 8,
    textAlign: "center",
  },
  amountValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 8,
  },
  amountSubtext: {
    fontSize: 14,
    color: COLORS.lightGray,
    textAlign: "center",
  },
});

export default AmountSection;
