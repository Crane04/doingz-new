import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Text from "elements/Text";
import COLORS from "../constants/colors";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
}

const mockMessages: ChatMessage[] = [
  { id: "1", text: "Hello!", isUser: false },
  { id: "2", text: "Hi there!", isUser: true },
];

interface ChatMessageListProps {
  messages?: ChatMessage[];
  isDarkBackground?: boolean; // Optional prop for dark theme
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages = mockMessages,
  isDarkBackground = false,
}) => {
  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.messageBubble,
        item.isUser
          ? [
              styles.userMessage,
              isDarkBackground && { backgroundColor: COLORS.secondary },
            ]
          : [
              styles.botMessage,
              isDarkBackground && { backgroundColor: COLORS.darkGray },
            ],
      ]}
    >
      <Text
        style={[
          styles.messageText,
          isDarkBackground && { color: COLORS.light },
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(item) => item.id}
      style={styles.messageList}
      contentContainerStyle={styles.messageListContent}
    />
  );
};

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: COLORS.primary,
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: COLORS.gray,
    alignSelf: "flex-start",
  },
  messageText: {
    color: COLORS.white,
  },
});

export default ChatMessageList;
