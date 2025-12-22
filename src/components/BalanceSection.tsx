import React, { useRef, useEffect, useState } from "react";
import { View, Pressable, StyleSheet, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";
import { useVersion } from "contexts/VersionContext";
import { useWallet } from "contexts/WalletContext";
import { useEvents } from "contexts/EventContext";

interface Props {
  balance: number;
  onWithdraw: () => void;
}

const BALANCE_KEY = "@show_balance";

const BalanceSection: React.FC<Props> = ({ balance, onWithdraw }) => {
  const [showBalance, setShowBalance] = useState(true); // default to true
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const { version } = useVersion();
  const { refreshWallet } = useWallet();
  const { fetchEvents } = useEvents();

  useEffect(() => {
    const loadPreference = async () => {
      try {
        const stored = await AsyncStorage.getItem(BALANCE_KEY);
        if (stored !== null) {
          setShowBalance(stored === "true");
        }
      } catch (err) {
        console.error("Failed to load balance preference:", err);
      }
    };

    loadPreference();
  }, []);

  const toggleBalance = async () => {
    try {
      const newValue = !showBalance;
      setShowBalance(newValue);
      await AsyncStorage.setItem(BALANCE_KEY, newValue.toString());
    } catch (err) {
      console.error("Failed to save balance preference:", err);
    }
  };

  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "decimal",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(balance);

  const handleRefresh = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
    });

    refreshWallet();
    fetchEvents();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Available Balance</Text>



        <Pressable onPress={toggleBalance} style={styles.eyeButton}>
          <Ionicons
            name={showBalance ? "eye" : "eye-off"}
            size={18}
            color={COLORS.dark}
          />
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.balanceRow,
          pressed && { opacity: 0.6, transform: [{ scale: 0.98 }] },
        ]}
        onPress={onWithdraw}
      >
        <Text style={styles.balance}>
          {showBalance ? `₦${formattedBalance}` : "*****"}
        </Text>

        {!version?.hidden && (
          <Ionicons
            name="chevron-forward"
            size={18}
            color={COLORS.dark}
            style={styles.chevron}
          />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  label: {
    color: COLORS.dark,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  eyeButton: { padding: 4 },
  balanceRow: { flexDirection: "row", alignItems: "center" },
  balance: { color: COLORS.dark, fontSize: 24, fontWeight: "bold" },
  chevron: { marginLeft: 6 },
});

export default BalanceSection;
