import React from "react";
import { View, StyleSheet } from "react-native";
import NextButton from "components/NextButton";
import { useNavigation } from "hooks/useNavigation";
import Header from "components/Header";
import { useRouter } from "expo-router";

const SavedCreatedEvents: React.FC = () => {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="Your Events" route={""} />
      <NextButton
        text="Manage your events"
        leftIcon="apps-outline"
        onPress={() => router.push("/my-events")}
      />
      <NextButton
        text="Saved Events"
        leftIcon="save-outline"
        onPress={() => router.push("/saved-events")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 0, marginVertical: 20 },
});

export default SavedCreatedEvents;
