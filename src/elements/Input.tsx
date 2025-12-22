// components/Input.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "constants/colors";
import Text from "./Text";
import { CustomDatePicker } from "../components/CustomDatePicker";

interface InputProps extends TextInputProps {
  type?: "text" | "password" | "email" | "number" | "date";
  label?: string;
  error?: string;
  value: string; // ISO string for date
  onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  error,
  value,
  onChangeText,
  style,
  ...props
}) => {
  const [secure, setSecure] = useState(type === "password");
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const toggleVisibility = () => setSecure((p) => !p);

  // ----- DATE DISPLAY -----
  const displayDate = value
    ? new Date(value).toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Select date & time";

  return (
    <View style={{ marginVertical: 6 }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.container,
          error ? { borderColor: COLORS.danger } : { borderColor: COLORS.gray },
        ]}
      >
        {type === "date" ? (
          <TouchableOpacity
            onPress={() => setDatePickerVisible((v) => !v)}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <Text
              style={{
                color: value ? COLORS.light : COLORS.lightGray,
                fontSize: 16,
              }}
            >
              {displayDate}
            </Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            {...props}
            value={value}
            onChangeText={onChangeText}
            style={[styles.input, style]}
            placeholderTextColor={COLORS.lightGray}
            secureTextEntry={secure}
            keyboardType={
              type === "email"
                ? "email-address"
                : type === "number"
                ? "numeric"
                : "default"
            }
            autoCapitalize={type === "email" ? "none" : props.autoCapitalize}
          />
        )}

        {type === "password" && (
          <TouchableOpacity onPress={toggleVisibility} style={styles.icon}>
            <Ionicons
              name={secure ? "eye-off" : "eye"}
              size={20}
              color={COLORS.lightGray}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {/* CUSTOM DATE PICKER (shown below the input) */}
      {type === "date" && datePickerVisible && (
        <CustomDatePicker
          value={value}
          onChange={(iso) => {
            onChangeText(iso);
            // setDatePickerVisible(false);
          }}
        />
      )}
    </View>
  );
};

/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    backgroundColor: COLORS.darkGray,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.light,
    fontFamily: "Fredoka_400Regular",
  },
  icon: { marginLeft: 8 },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: COLORS.light,
  },
  error: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 4,
  },
});

export default Input;
