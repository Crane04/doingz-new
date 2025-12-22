import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Text from "../elements/Text";
import COLORS from "../constants/colors";
import { useUser } from "../contexts/UserContext";
import { router } from "expo-router";

const SignInForm: React.FC = () => {
  const { signIn } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await signIn(email, password);
      setSuccess("Login successful");

      setTimeout(() => {
        router.push("/(app)");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <Input
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <Text style={styles.error}>{error}</Text>}
      {success && <Text style={styles.success}>{success}</Text>}

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleSubmit}
        variant="primary"
        disabled={loading}
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
    color: COLORS.danger,
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  success: {
    color: COLORS.success,
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default SignInForm;
