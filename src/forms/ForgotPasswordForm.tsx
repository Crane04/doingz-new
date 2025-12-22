import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Input from "elements/Input";
import COLORS from "constants/colors";

type ForgotPasswordProps = {
  onSubmit: (data: { email: string }) => void;
  email: any;
  setEmail: any;
};

const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({
  onSubmit,
  email,
  setEmail,
}) => {
  const handleSubmit = () => {
    onSubmit({ email });
  };

  return (
    <View style={styles.form}>
      <Input
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
    marginBottom: 10,
    gap: 12,
  },
});

export default ForgotPasswordForm;
