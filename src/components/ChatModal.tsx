import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import ModalHeader from "./ModalHeader";
import COLORS from "../constants/colors";

interface ChatMessage {
  id: string;
  text: string;
  username: string;
  time: string;
  isUser: boolean;
}

interface ChatModalProps {
  visible: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSend: (text: string) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({
  visible,
  onClose,
  messages,
  onSend,
}) => {
  const [text, setText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  // Auto scroll to latest message
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalContent}>
          <ModalHeader text="Chat" onClose={onClose} />

          {/* Chat messages */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => (
              <View
                style={{
                  alignSelf: item.isUser ? "flex-end" : "flex-start",
                  marginVertical: 4,
                  maxWidth: "80%",
                }}
              >
                {/* Show username only for received messages */}
                {!item.isUser && (
                  <Text style={styles.usernameText}>{item.username}</Text>
                )}

                <View
                  style={[
                    styles.messageBubble,
                    {
                      backgroundColor: item.isUser
                        ? COLORS.primary
                        : COLORS.gray,
                    },
                  ]}
                >
                  <Text style={styles.messageText}>{item.text}</Text>
                  <Text
                    style={[
                      styles.messageTime,
                      item.isUser && { color: COLORS.white }, // 👈 make user time white
                    ]}
                  >
                    {new Date(item.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          />

          {/* Input area */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={COLORS.lightGray}
              value={text}
              onChangeText={setText}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity onPress={handleSend}>
              <Ionicons name="send" size={22} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // width: "100%",
  },
  modalContent: {
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "80%",
    paddingTop: 16,
  },
  usernameText: {
    color: COLORS.lightGray,
    fontSize: 12,
    marginBottom: 2,
    marginLeft: 4,
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
  },
  messageText: {
    color: COLORS.white,
  },
  messageTime: {
    fontSize: 10,
    color: COLORS.lightGray,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.darkGray,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default ChatModal;
