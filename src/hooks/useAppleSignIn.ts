import * as AppleAuthentication from "expo-apple-authentication";
import { post } from "utils/api";
import { User } from "contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

interface AppleSignInResponse {
  success: boolean;
  message?: string;
  data?: User;
}

export const useAppleSignIn = () => {
  const router = useRouter();

  const appleSignIn = async (setUser: (user: User) => void) => {
    try {
      // 🔐 Trigger Apple Sign-In prompt
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        console.warn("No Apple identity token returned.");
        return;
      }

      const { data, status } = await post<AppleSignInResponse>(
        "users/apple-auth",
        { token: credential.identityToken }
      );

      if (status === 200 && data?.data) {
        console.log("✅ Apple sign-in successful:", data.data);
        setUser(data.data);

        const token = data.data.authentication?.sessionToken;
        if (token) {
          await AsyncStorage.setItem("sessionToken", token);
          console.log("Session Token stored:", token);
          router.push("/(app)");
        } else {
          console.warn("No session token found in response");
        }
      } else {
        console.warn(
          "❌ Apple sign-in failed:",
          data?.message || "Unknown error"
        );
      }

      return data;
    } catch (error: any) {
      if (error.code === "ERR_CANCELED") {
        console.log("🚫 User canceled Apple sign-in.");
      } else {
        console.error("⚠️ Apple sign-in error:", error);
      }
      return null;
    }
  };

  return { appleSignIn };
};
