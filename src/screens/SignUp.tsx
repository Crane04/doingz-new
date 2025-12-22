import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Text from "elements/Text";
import SignUpForm from "forms/SignUpForm";
import { auth as styles } from "../styles";
import { useVersion } from "contexts/VersionContext";
import COLORS from "constants/colors";
import Container from "components/Container";

const SignUp: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { version } = useVersion();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={{
            // flexGrow: 1,
            justifyContent: "center",
            // backgroundColor: COLORS.dark,
            // flex: 1,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text weight="bold" style={styles.title}>
              Create an Account
            </Text>

            {error ? (
              <View style={{ paddingVertical: 6 }}>
                <Text style={{ color: "red", textAlign: "center" }}>
                  {error}
                </Text>
              </View>
            ) : null}

            <Text style={styles.subtitle}>Celebrate loud, stay proud.</Text>
          </View>

          <SignUpForm />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
