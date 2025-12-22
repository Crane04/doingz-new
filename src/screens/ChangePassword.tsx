import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Text from "elements/Text";
import Input from "elements/Input";
import Button from "elements/Button";
import COLORS from "../constants/colors";
import { changePassword } from "services/authService";
import { useNavigation } from "hooks/useNavigation";
import Header from "components/Header";

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!oldPassword.trim()) newErrors.oldPassword = "Old password is required";
    if (!newPassword.trim()) newErrors.newPassword = "New password is required";
    else if (newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await changePassword({ newPassword, oldPassword }, setErrors, setSuccess);

      // redirect after 2 seconds
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Prelog" }],
        });
      }, 2000);
    } catch (err) {
      // error handled by setErrors already
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="Change Password" />
      <View style={styles.header}>
        <Text weight="bold" style={styles.title}>
          Change Password
        </Text>
        <Text style={styles.subtitle}>Update your password below</Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Current Password"
          placeholder="Enter your currrent password"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry
          error={errors.oldPassword}
        />
        <Input
          label="New Password"
          placeholder="Enter your new password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          error={errors.newPassword}
        />

        {errors.submit && <Text style={styles.error}>{errors.submit}</Text>}
        {success && <Text style={styles.success}>{success}</Text>}

        <Button
          title="Change Password"
          onPress={handleSubmit}
          variant="primary"
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
    fontWeight: "bold",
  },
  subtitle: {
    color: COLORS.light,
    fontSize: 16,
    marginTop: 8,
  },
  form: {
    marginVertical: 20,
    gap: 12,
  },
  error: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 5,
  },
  success: {
    fontSize: 12,
    color: COLORS.success || "green",
    marginTop: 5,
  },
});

export default ChangePassword;
