import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Text from "elements/Text";
import COLORS from "../constants/colors";
import ModalHeader from "./ModalHeader";
import { post } from "utils/api";

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onDeleted?: () => void; // optional callback after deletion
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  visible,
  onClose,
  onDeleted,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await post("/users/delete-acct", {}); // adjust endpoint if needed

      // Call optional callback
      if (onDeleted) onDeleted();

      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ModalHeader onClose={onClose} text="Delete Account" />

          <View style={styles.body}>
            <Text style={styles.message}>
              Hi 👋, are you sure you want to delete your account? This action
              is irreversible.
            </Text>
            {error && <Text style={styles.error}>{error}</Text>}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.light} />
              ) : (
                <Text style={styles.deleteText}>Delete</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  body: {
    paddingVertical: 20,
  },
  message: {
    fontSize: 16,
    color: COLORS.light,
    textAlign: "center",
  },
  error: {
    color: COLORS.danger,
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
  },
  cancelText: {
    color: COLORS.light,
  },
  deleteText: {
    color: COLORS.light,
  },
});

export default DeleteAccountModal;
