// app/_layout.tsx
import { Stack } from "expo-router";
import { UserProvider } from "../contexts/UserContext";
import { WalletProvider } from "../contexts/WalletContext";
import { VersionProvider } from "../contexts/VersionContext";
import Header from "../components/Header";
import COLORS from "../constants/colors";

export default function RootLayout() {
  return (
    <VersionProvider>
      <WalletProvider>
        <UserProvider>
          <Stack
            screenOptions={{
              contentStyle: {
                backgroundColor: COLORS.dark,
              },
              header: (props) => <Header {...props} title="" />,
              animation: "none",
            }}
          >
            {/* Splash & Auth flow */}
            <Stack.Screen name="splash" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />

            {/* Main app (tabs) – hidden header */}
            <Stack.Screen name="(app)" options={{ headerShown: false }} />

            {/* Modals / full-screen routes */}
            <Stack.Screen name="event/[id]" options={{ title: "Event" }} />
            <Stack.Screen name="friend/[id]" options={{ title: "Friend" }} />
            <Stack.Screen
              name="event/manage/[id]"
              options={{ title: "Manage Event" }}
            />
          </Stack>
        </UserProvider>
      </WalletProvider>
    </VersionProvider>
  );
}
