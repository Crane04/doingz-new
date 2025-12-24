import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "./useNavigation";
import { User } from "contexts/UserContext";
import { post } from "utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

interface GoogleSignInResponse {
  success: boolean;
  message?: string;
  data?: User;
}

export const useGoogleSignIn = () => {
  const router = useRouter();
  try {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId:
        "135430777069-i5vmjpv32119k14k1r0k6mm615kgm6ae.apps.googleusercontent.com",
    });
  } catch (error) {}

  const googleSignIn = async (setUser: (user: User) => void) => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      if (!userInfo || !userInfo.data?.idToken) {
        alert("Google sign-in failed or was cancelled.");
        return;
      }

      const { data, status } = await post<GoogleSignInResponse>(
        "users/google-auth",
        { token: userInfo.data.idToken }
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
          "❌ Google sign-in failed:",
          data?.message || "Unknown error"
        );
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return { googleSignIn };
};
