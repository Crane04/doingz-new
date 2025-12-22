import React from "react";
import { View } from "react-native";
import Text from "elements/Text";
import SignInForm from "forms/SignInForm";
import { auth as styles } from "../styles";
import { NextButton } from "elements";
import { useNavigation } from "hooks/useNavigation";
import { useRouter } from "expo-router";

const SignIn: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <View style={styles.header}>
        <Text weight="bold" style={styles.title}>
          Login to your account
        </Text>
        <Text style={styles.subtitle}>Login and start celebrating </Text>
      </View>

      <SignInForm />

      <NextButton
        text="Forgot Password"
        leftIcon="lock-closed-outline"
        onPress={() => router.push("/forgot-password")}
      />
    </>
  );
};

export default SignIn;
