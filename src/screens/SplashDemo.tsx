import React from "react";
import { View, Image, StyleSheet } from "react-native";
import COLORS from "constants/colors";
import Loader from "elements/Loader";

export default function SplashDemo() {
  console.log("SplashDemo rendered");
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
