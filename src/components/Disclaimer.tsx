import React from "react";
import { StyleSheet, Linking } from "react-native";
import Text from "../elements/Text";
import COLORS from "constants/colors";

const Disclaimer = () => {
  return (
    <Text style={styles.disclaimer}>
      By continuing, you agree to Doingz's{" "}
      <Text
        style={styles.link}
        onPress={() => Linking.openURL("https://doingz.app/terms")}
      >
        Terms and Conditions
      </Text>{" "}
      and{" "}
      <Text
        style={styles.link}
        onPress={() => Linking.openURL("https://doingz.app/privacy")}
      >
        Privacy Policy
      </Text>
      .
    </Text>
  );
};

const styles = StyleSheet.create({
  disclaimer: {
    fontSize: 12,
    color: COLORS.lightGray,
    textAlign: "center",
    marginBottom: 10,
  },
  link: {
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
});

export default Disclaimer;
