import React from "react";
import { View, Platform } from "react-native";
import { NextButton } from "../elements";
import { useAppleSignIn } from "../hooks/useAppleSignIn";
import { useUser } from "../contexts/UserContext";
import { router } from "expo-router";
import { useGoogleSignIn } from "hooks/useGoogleSignIn";

export default function AuthOptions() {
  const { setUser } = useUser();
  const { appleSignIn } = useAppleSignIn();
  const { googleSignIn } = useGoogleSignIn();

  return (
    <View style={{ width: "100%" }}>
      {/* Create account */}
      <NextButton
        text="Create an account"
        leftIcon="person-add"
        onPress={() => router.push("/(auth)/signup")} // ← Expo Router way
      />

      {/* Login with email */}
      <NextButton
        text="Login with email"
        leftIcon="mail"
        onPress={() => router.push("/(auth)/signin")}
      />

      {/* <GoogleSignIn /> */}

      {/* Apple / Google */}
      {Platform.OS === "ios" ? (
        <NextButton
          text="Continue with Apple"
          leftIcon="logo-apple"
          onPress={() => appleSignIn(setUser)}
        />
      ) : (
        <NextButton
          text="Continue with Google"
          leftIcon="logo-google"
          onPress={() => googleSignIn(setUser)}
        />
      )}
    </View>
  );
}
