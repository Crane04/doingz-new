import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

interface ChatInputProps {
  onSend: (text: string) => void;
  isDarkBackground?: boolean; 
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  isDarkBackground = false,
}) => {
  const [messageText, setMessageText] = useState<string>("");

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSend(messageText);
      setMessageText("");
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        isDarkBackground && {
          backgroundColor: COLORS.darkGray,
          borderTopColor: COLORS.lightGray,
        },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          isDarkBackground && {
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.darkGray,
            color: COLORS.light,
          },
        ]}
        value={messageText}
        onChangeText={setMessageText}
        placeholder="Type a message..."
        placeholderTextColor={COLORS.lightGray}
      />
      <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
        <MaterialIcons name="send" size={24} color={COLORS.blue} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
    alignItems: "center",
    backgroundColor: COLORS.darkGray,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    color: COLORS.white,
    backgroundColor: COLORS.darkGray,
  },
  sendButton: {
    padding: 10,
  },
});

export default ChatInput;
