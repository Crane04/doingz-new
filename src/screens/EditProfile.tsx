// src/screens/EditProfile.tsx
import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Text from "../elements/Text";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { NextButton } from "../elements";
import { useUser } from "../contexts/UserContext";
import { updateProfile } from "../services/authService";
import COLORS from "../constants/colors";
import { useVersion } from "../contexts/VersionContext";
import { router } from "expo-router"; // ← This replaces your old useNavigation hook
import Header from "components/Header";

const EditProfile: React.FC = () => {
  const { user, setUser } = useUser();
  const { version } = useVersion();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);

  // Sync form when user changes
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setFullname(user.fullname || "");
    }
  }, [user]);

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    await updateProfile(
      { username, email, fullname },
      setErrors,
      setUser,
      setSuccess
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Header title="Edit Profile" />
      {/* Header is now handled by layout + title set via route */}
      <View style={styles.header}>
        <Text weight="bold" style={styles.title}>
          Edit Profile
        </Text>
        <Text style={styles.subtitle}>Update your details below</Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
          error={errors.username}
        />

        <Input
          label="Fullname"
          placeholder="Enter your full name"
          value={fullname}
          onChangeText={setFullname}
          error={errors.fullname}
        />

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        {errors.submit && <Text style={styles.error}>{errors.submit}</Text>}
        {success && <Text style={styles.success}>{success}</Text>}

        <Button title="Save Changes" onPress={handleSubmit} variant="primary" />

        {/* Edit Bank Details */}
        {!version?.hidden && (
          <NextButton
            text="Edit Bank Details"
            leftIcon="wallet-outline"
            onPress={() => router.push("/edit-bank")} // Expo Router
          />
        )}

        {/* Change Password */}
        <NextButton
          text="Change Password"
          leftIcon="lock-closed-outline"
          onPress={() => router.push("/change-password")} // Expo Router
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  content: {
    paddingVertical: 20,
  },
  header: {
    marginVertical: 20,
  },
  title: {
    color: COLORS.light,
    fontSize: 28,
  },
  subtitle: {
    color: COLORS.light + "90",
    fontSize: 16,
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  error: {
    fontSize: 14,
    color: COLORS.danger,
    marginTop: 8,
    textAlign: "center",
  },
  success: {
    fontSize: 14,
    color: COLORS.success,

    marginTop: 8,
    textAlign: "center",
  },
});

export default EditProfile;
