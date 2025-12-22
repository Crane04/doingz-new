import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGoogleLogin } from "@react-oauth/google";
import { useUser } from "contexts/UserContext";
import { NextButton } from "elements";
import { useRouter } from "expo-router";
import { useState } from "react";
import { User } from "services/authService";
import { post } from "utils/api";

interface LoginResponse {
  status: "success" | "error";
  message: string;
  data: User;
}

const validateUserData = (data: any): User => {
  // iOS-specific: Ensure all fields are proper types
  const validatedData: User = {
    _id: String(data._id),
    fullname: String(data.fullname),
    username: String(data.username),
    email: String(data.email),
    createdAt: String(data.createdAt),
    updatedAt: String(data.updatedAt),
    profilePic: data.profilePic ? String(data.profilePic) : undefined,
  };

  // Handle wallet separately with type validation
  if (data.wallet) {
    validatedData.wallet = {
      _id: String(data.wallet._id),
      balance: Number(data.wallet.balance) || 0,
      user: String(data.wallet.user),
    };
  }

  return validatedData;
};

export default function GoogleSignIn() {
  const { setUser } = useUser();
  const router = useRouter();
  // 1️⃣ Declare the hook at top level
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;

      try {
        const { data, status } = await post<LoginResponse>(
          "/users/google-auth-web",
          {
            token: access_token,
          }
        );

        if (!data) {
          throw new Error("Login failed");
        }

        if (status === 200 && data?.data) {
          const validatedUser = validateUserData(data.data);
          setUser(validatedUser);

          const token = data.data.authentication?.sessionToken;
          if (token) {
            await AsyncStorage.setItem("sessionToken", token);
          } else {
            console.warn("No session token found in response");
          }
          router.push("/(app)");
        } else {
          console.warn(
            "❌ Google sign-in failed:",
            data?.message || "Unknown error"
          );
        }
      } catch (err) {
        console.error("❌ API Error:", err);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <NextButton
      text="Continue with Google"
      leftIcon="logo-google"
      onPress={() => login()}
    />
  );
}
