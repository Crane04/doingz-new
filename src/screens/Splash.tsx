// app/splash.tsx
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import COLORS from "constants/colors";
import Loader from "elements/Loader";
import { retrieveUser } from "services/authService";
import { useUser } from "contexts/UserContext";


export default function Splash() {
  const { setUser } = useUser();
  const { redirectTo } = useLocalSearchParams();

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const user = await retrieveUser();

        // Always wait at least 4 seconds — show your beautiful splash
        await new Promise((resolve) => setTimeout(resolve, 4000));

        // If component unmounted (rare), don't navigate
        if (!isMounted) return;

        if (user) {
          setUser(user);

          if (redirectTo && typeof redirectTo === "string") {
            const decoded = decodeURIComponent(redirectTo);
            router.replace(decoded);
          } else {
            router.replace("/(app)");
          }
        } else {
          router.replace("/(auth)");
        }
      } catch (err) {
        // Even on error, wait 4 seconds
        await new Promise((resolve) => setTimeout(resolve, 4000));
        if (!isMounted) return;

        router.replace("/(auth)");
      }
    };

    init();

    // Cleanup: prevent navigation if component unmounts
    return () => {
      isMounted = false;
    };
  }, [setUser, redirectTo]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  loaderContainer: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
  },
});
