import * as AppleAuthentication from "expo-apple-authentication";
import { post } from "utils/api";
import { useNavigation } from "hooks/useNavigation";
import { User } from "contexts/UserContext";

interface AppleSignInResponse {
  success: boolean;
  message?: string;
  data?: User;
}

export const useAppleSignIn = () => {
  const navigation = useNavigation();

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

      // 🚀 Send the identity token to your backend for verification/login
      const { data, status } = await post<AppleSignInResponse>(
        "users/apple-auth",
        { token: credential.identityToken }
      );

      if (status === 200 && data?.data) {
        console.log("✅ Apple sign-in successful:", data.data);
        setUser(data.data);
        navigation.navigate("Main");
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
