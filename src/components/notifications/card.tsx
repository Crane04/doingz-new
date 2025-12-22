import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface Notification {
  id: string;
  message: string;
  created_at: string;
}

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => (
  <View style={styles.notificationCard}>
    <Text style={styles.message}>{notification.message}</Text>
    <Text style={styles.time}>
      {new Date(notification.created_at).toLocaleString()}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  notificationCard: {
    backgroundColor: COLORS.darkGray,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginBottom: 12,
  },
  message: {
    color: COLORS.light,
    fontSize: 15,
    marginBottom: 6,
  },
  time: {
    color: COLORS.lightGray,
    fontSize: 12,
  },
});

export default NotificationCard;
