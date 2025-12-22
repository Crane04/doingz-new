// components/modals/HostControlsModal.tsx
import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import ModalHeader from "../ModalHeader";
import ModalFooter from "../ModalFooter";
import COLORS from "constants/colors";

interface HostControlsModalProps {
  visible: boolean;
  onClose: () => void;
  onActionPress: (action: string) => void;
  eventId: string;
}

const HostControlsModal: React.FC<HostControlsModalProps> = ({
  visible,
  onClose,
  onActionPress,
  eventId,
}) => {
  const hostActions = [
    {
      id: "leaderboard",
      title: "View Leaderboard",
      description: "See who sprayed the most cash",
      icon: "trophy" as const,
      color: COLORS.secondary,
    },
    {
      id: "edit",
      title: "Edit Event",
      description: "Update event details and settings",
      icon: "create" as const,
      color: COLORS.primary,
    },
    {
      id: "analytics",
      title: "Event Analytics",
      description: "View detailed spending analytics",
      icon: "analytics" as const,
      color: COLORS.blue,
    },
    {
      id: "attendees",
      title: "Manage Attendees",
      description: "View and manage event attendees",
      icon: "people" as const,
      color: COLORS.success,
    },
    {
      id: "share",
      title: "Share Event",
      description: "Invite more people to join",
      icon: "share" as const,
      color: COLORS.primary,
    },
    {
      id: "settings",
      title: "Event Settings",
      description: "Configure event preferences",
      icon: "settings" as const,
      color: COLORS.lightGray,
    },
  ];

  const handleActionPress = (actionId: string) => {
    onActionPress(actionId);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ModalHeader onClose={onClose} text="Host Controls" />

          <ScrollView style={styles.content}>
            <Text style={styles.subtitle}>
              Manage your event and access host features
            </Text>

            <View style={styles.actionsList}>
              {hostActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionItem}
                  onPress={() => handleActionPress(action.id)}
                >
                  <View style={styles.actionLeft}>
                    <View
                      style={[
                        styles.actionIcon,
                        { backgroundColor: `${action.color}20` },
                      ]}
                    >
                      <Ionicons
                        name={action.icon}
                        size={20}
                        color={action.color}
                      />
                    </View>
                    <View style={styles.actionText}>
                      <Text style={styles.actionTitle}>{action.title}</Text>
                      <Text style={styles.actionDescription}>
                        {action.description}
                      </Text>
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.lightGray}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <ModalFooter
            onClose={onClose}
            handleSubmit={onClose}
            closeText="Done"
            // submitText=""
            // showSubmit={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.dark,
    marginHorizontal: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
    height: "80%",
  },
  content: {
    padding: 15,
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.lightGray,
    textAlign: "center",
    marginBottom: 20,
  },
  actionsList: {
    gap: 12,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.darkGray,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    color: COLORS.light,
    marginBottom: 4,
    fontWeight: "600",
  },
  actionDescription: {
    fontSize: 14,
    color: COLORS.lightGray,
  },
});

export default HostControlsModal;
