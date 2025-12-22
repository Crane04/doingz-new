import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useUser } from "contexts/UserContext";
import COLORS from "constants/colors";
import ProfileHeader from "components/ProfileHeader";
import ProfileActions from "components/ProfileActions";

const ProfileScreen: React.FC = () => {
  const { signOut } = useUser();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ProfileHeader />
      <ProfileActions signOut={signOut} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.dark },
  content: { marginTop: 20 },
});

export default ProfileScreen;
