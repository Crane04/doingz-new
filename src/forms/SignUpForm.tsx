// src/components/SignUpForm.tsx
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Text from "../elements/Text";
import { signup } from "../services/authService";
import { router } from "expo-router"; // ← This replaces your old useNavigation hook
import COLORS from "../constants/colors";

const SignUpForm: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    if (!fullName || !displayName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await signup({
        fullname: fullName,
        username: displayName,
        email,
        password,
      });

      if (res?.status === "error") {
        setError(res.message || "Signup failed");
        return;
      }

      setSuccess("Account created successfully");

      // Show success for 2 seconds → then go to Sign In
      setTimeout(() => {
        router.push("/(auth)/signin");
      }, 2000);
    } catch (err: any) {
      console.error("Signup failed:", err);
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="words"
      />

      <Input
        label="Display Name"
        placeholder="Choose a username"
        value={displayName}
        onChangeText={setDisplayName}
        autoCapitalize="none"
      />

      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        label="Password"
        placeholder="Create a password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        type="password"
      />

      <Input
        label="Confirm Password"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        type="password"
        error={
          confirmPassword && confirmPassword !== password
            ? "Passwords do not match"
            : ""
        }
      />

      {/* Error message */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Success message */}
      {success && <Text style={styles.success}>{success}</Text>}

      <Button
        title={loading ? "Creating account..." : "Sign Up"}
        onPress={handleSubmit}
        disabled={loading}
        variant="primary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 20,
    gap: 12,
  },
  error: {
    fontSize: 14,
    color: COLORS.danger,
    marginTop: 4,
    textAlign: "center",
  },
  success: {
    fontSize: 14,
    color: COLORS.success,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },
});

export default SignUpForm;
