// app/_layout.tsx
import { Stack, usePathname, useRouter } from "expo-router";
import { VersionProvider } from "../src/contexts/VersionContext";
import { WalletProvider } from "../src/contexts/WalletContext";
import { UserProvider } from "../src/contexts/UserContext";
import COLORS from "../src/constants/colors";
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import "../src/webFix.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "expo-router/head";
import { EventProvider } from "contexts/EventContext";

if (__DEV__) {
  console.log = () => {};
  console.error = () => {};
  console.info = () => {};
}
export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (Platform.OS === "web" && pathname !== "/splash") {
      // Build the full URL (path + query params)
      const fullPath = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      // Encode it so it's safe in query string
      const redirectTo = encodeURIComponent(fullPath);

      // Redirect to splash WITH the original destination
      window.location.replace(`/splash?redirectTo=${redirectTo}`);
    }
  }, []);
  if (!fontsLoaded) {
    return null;
  }

  {
    Platform.OS === "web" &&
      (document.title = "Doingz – Send Money with Style");
  }

  return (
    <GoogleOAuthProvider
      clientId={
        "135430777069-i5vmjpv32119k14k1r0k6mm615kgm6ae.apps.googleusercontent.com"
      }
    >
      <EventProvider>
        <VersionProvider>
          <WalletProvider>
            <UserProvider>
              <StatusBar backgroundColor={COLORS.dark} />
              <Head>
                <title>Doingz</title>
                <meta name="description" content="Doingz App" />
              </Head>
              <Stack
                screenOptions={{
                  contentStyle: { backgroundColor: COLORS.dark },
                  headerShown: false,
                  animation: "none",
                }}
              >
                <Stack.Screen name="splash" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                {/* <Stack.Screen name="(app)" options={{ headerShown: false }} /> */}
                {/* All your modal/full-screen routes
                <Stack.Screen name="event/[id]" options={{ title: "Event" }} />
                <Stack.Screen
                  name="friend/[id]"
                  options={{ title: "Friend" }}
                />
                <Stack.Screen
                  name="manage-event/[id]"
                  options={{ title: "Manage Event" }}
                /> */}
              </Stack>
            </UserProvider>
          </WalletProvider>
        </VersionProvider>
      </EventProvider>
    </GoogleOAuthProvider>
  );
}
