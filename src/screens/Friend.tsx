import React from "react";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import Text from "elements/Text";
import BalanceDisplay from "components/BalanceDisplay";
import SwipeSection from "components/SwipeSection";
import AmountSelector from "components/AmountSelector";
import COLORS from "../constants/colors";
import { useEvent } from "../hooks/useEvent";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { useLocalSearchParams } from "expo-router";
import Header from "components/Header";

type FriendRouteProp = RouteProp<RootStackParamList, "Friend">;

const Friend: React.FC = () => {
  const {
    loading,
    sprays,
    selectedAmount,
    amountError,
    balance,
    setSelectedAmount,
    setAmountError,
    setSprays,
    handleSwipe,
  } = useEvent("user");

  const { id, name, profilePic } = useLocalSearchParams<{
    id: string;
    name?: string;
    profilePic?: string;
  }>();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const renderProfile = () => {
    if (profilePic) {
      return <Image source={{ uri: profilePic }} style={styles.profileImage} />;
    }
    if (name) {
      const firstLetter = name.charAt(0).toUpperCase();
      return (
        <View style={styles.fallbackCircle}>
          <Text style={styles.fallbackText}>{firstLetter}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <>
      <Header title={name || ""} route="" />
      <View style={styles.container}>
        {renderProfile()}
        <BalanceDisplay balance={balance} />
        <SwipeSection
          selectedAmount={selectedAmount}
          sprays={sprays}
          setSprays={setSprays}
          handleSwipe={handleSwipe}
        />
        <AmountSelector
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
          amountError={amountError}
          setAmountError={setAmountError}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
    padding: 16,
    marginVertical: 20,
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  fallbackCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  fallbackText: {
    fontSize: 40,
    color: COLORS.white,
    fontWeight: "bold",
  },
  messageIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dark,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
  },
});

export default Friend;
