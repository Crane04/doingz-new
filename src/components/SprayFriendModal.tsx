import React, { useState } from "react";
import { View, Modal, StyleSheet, ActivityIndicator } from "react-native";
import Text from "elements/Text";
import Input from "elements/Input";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { useNavigation } from "hooks/useNavigation";
import COLORS from "../constants/colors";
import { searchUser } from "services/authService"; // <-- make sure path is correct
import { useRouter } from "expo-router";

interface SprayFriendModalProps {
  visible: boolean;
  onClose: () => void;
}

const SprayFriendModal: React.FC<SprayFriendModalProps> = ({
  visible,
  onClose,
}) => {
  const [recipientUsername, setRecipientUsername] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  const handleSubmit = async () => {
    const validationErrors: { [key: string]: string } = {};
    if (!recipientUsername.trim()) {
      validationErrors.recipientUsername = "Recipient username is required";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    const { user, error } = await searchUser(recipientUsername.trim());
    setLoading(false);

    if (!user) {
      setErrors({ submit: error || "User not found" });
      return;
    }

    router.push(
      `/friend/${user.username}?name=${encodeURIComponent(
        user.username
      )}&profilePic=${encodeURIComponent(user.profilePic || "")}`
    );
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
        <View style={styles.sprayContainer}>
          <ModalHeader onClose={onClose} text="Spray a Friend" />
          <View style={styles.content}>
            <Input
              label="Friend's Username"
              value={recipientUsername}
              onChangeText={setRecipientUsername}
              error={errors.recipientUsername}
            />
            {errors.submit && <Text style={styles.error}>{errors.submit}</Text>}
          </View>
          {loading ? (
            <View style={{ padding: 15, alignItems: "center" }}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          ) : (
            <ModalFooter
              onClose={onClose}
              handleSubmit={handleSubmit}
              closeText="Search"
            />
          )}
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
  sprayContainer: {
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
    height: "80%",
    width: "100%",
  },
  content: {
    padding: 15,
  },
  error: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 5,
  },
});

export default SprayFriendModal;
