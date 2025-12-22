import React from "react";
import { View, StyleSheet } from "react-native";
import NextButton from "components/NextButton";
import { router } from "expo-router";
import DeleteAccountModal from "./DeleteAccountModal";

interface Props {
  signOut: () => void;
}

const ProfileActions: React.FC<Props> = ({ signOut }) => {
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);

  const handleDeleteAccount = () => {
    setDeleteModalVisible(false);
  };

  const handleAccountDeleted = () => {
    signOut();
  };
  return (
    <View style={styles.actions}>
      <NextButton
        text="Edit Profile"
        leftIcon="person-outline"
        onPress={() => router.push("/edit-profile")}
      />
      <NextButton
        text="My Events"
        leftIcon="save-outline"
        onPress={() => router.push("/saved-created-events")}
      />
      <NextButton
        text="Settings"
        leftIcon="settings-outline"
        onPress={() => router.push("/settings")}
      />
      <NextButton
        text="Delete Account"
        leftIcon="trash-outline"
        onPress={() => setDeleteModalVisible(true)}
      />
      <NextButton text="Logout" leftIcon="log-out-outline" onPress={signOut} />
      <DeleteAccountModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDeleted={handleAccountDeleted}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  actions: { gap: 0 },
});

export default ProfileActions;
