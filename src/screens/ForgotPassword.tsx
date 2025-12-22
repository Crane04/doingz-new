import React, { useState } from "react";
import { View } from "react-native";
import Text from "elements/Text";
import Button from "elements/Button";
import ForgotPasswordForm from "forms/ForgotPasswordForm";
import { auth as styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { requestPasswordReset } from "services/authService";
import COLORS from "constants/colors";

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<string>(COLORS.danger);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (data: { email: string }) => {
    if (!data.email.trim()) {
      setMessage("Please enter your email address");
      setMessageColor(COLORS.danger);
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await requestPasswordReset(data.email);
      console.log(response);
      if (response.status === "success") {
        setMessageColor(COLORS.success);
        setMessage("Password reset link has been sent to your email.");
      } else {
        setMessageColor(COLORS.danger);
        setMessage(response.message || "Failed to send reset link.");
      }
    } catch (error: any) {
      console.log(error);
      let errorMessage = "Something went wrong. Please try again later.";

      // Handle specific Axios-like errors gracefully
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "No account found with this email address.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      setMessageColor(COLORS.danger);
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Text weight="bold" style={styles.title}>
          Reset Password
        </Text>
        <Text style={styles.subtitle}>
          Reset password and get back into the app asap!
        </Text>
      </View>

      <ForgotPasswordForm
        onSubmit={handleForgotPassword}
        setEmail={setEmail}
        email={email}
      />
      {message && (
        <View style={{ marginBottom: 6 }}>
          <Text
            style={{
              color: messageColor,
              fontSize: 14,
            }}
          >
            {message}
          </Text>
        </View>
      )}
      <Button
        title={loading ? "Sending..." : "Send Code"}
        onPress={() => handleForgotPassword({ email })}
        variant="primary"
        disabled={loading}
      />
    </>
  );
};

export default ForgotPassword;
