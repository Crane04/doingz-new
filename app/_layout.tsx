// app/_layout.tsx
import { Stack } from "expo-router";
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
import { EventProvider } from "contexts/EventContext";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

if (!__DEV__) {
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <EventProvider>
      <VersionProvider>
        <WalletProvider>
          <UserProvider>
            <SafeAreaProvider>
              <SafeAreaView
                style={{
                  flex: 1,
                  backgroundColor: COLORS.dark,
                  paddingHorizontal: 15,
                }}
              >
                <StatusBar backgroundColor={COLORS.dark} />
                <Stack
                  screenOptions={{
                    contentStyle: { backgroundColor: COLORS.dark },
                    headerShown: false,
                    animation: "none",
                  }}
                >
                  <Stack.Screen
                    name="splash"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </SafeAreaView>
            </SafeAreaProvider>
          </UserProvider>
        </WalletProvider>
      </VersionProvider>
    </EventProvider>
  );
}
