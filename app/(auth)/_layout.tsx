// app/(auth)/_layout.tsx
import { Stack } from "expo-router";
import Header from "../../src/components/Header";
import COLORS from "../../src/constants/colors";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: COLORS.dark },
        headerShown: true,
        animation: "none",
        // This is the key: we give Header no props → it uses hooks internally
        header: ({ options, route }) => (
          <Header title={options.title ?? route.name} route={route} />
        ),
      }}
    >
      <Stack.Screen name="splash" options={{ headerShown: false }} />

      {/* Prelog – full screen, no header */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* Sign In */}
      <Stack.Screen name="signin" options={{ title: "Log In" }} />

      {/* Sign Up */}
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />

      {/* Forgot Password */}
      <Stack.Screen
        name="forgot-password"
        options={{ title: "Forgot Password" }}
      />
    </Stack>
  );
}
