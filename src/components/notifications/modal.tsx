import React from "react";
import { View, Modal, FlatList, StyleSheet } from "react-native";
import ModalHeader from "components/ModalHeader";
import NotificationCard from "./card";
import LoadingState from "./loading";
import EmptyNotificationsState from "./empty";
import COLORS from "constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

interface Notification {
  id: string;
  message: string;
  created_at: string;
}

interface NotificationsModalProps {
  visible: boolean;
  onClose: () => void;
  notifications: Notification[];
  loading: boolean;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  visible,
  onClose,
  notifications,
  loading,
}) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent
    onRequestClose={onClose}
    statusBarTranslucent
  >
    <View style={styles.modalContainer}>
      <SafeAreaView style={styles.modalContent}>
        <ModalHeader text="Notifications" onClose={onClose} />
        {loading ? (
          <LoadingState />
        ) : notifications.length === 0 ? (
          <EmptyNotificationsState />
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <NotificationCard notification={item} />}
            contentContainerStyle={styles.listContent}
          />
        )}
      </SafeAreaView>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    elevation: 1000,
  },
  modalContent: {
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingBottom: 20,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
});

export default NotificationsModal;
