import React, { useState, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import Text from "elements/Text";
import COLORS from "constants/colors";
import ProfileBalance from "./ProfileBalance";
import { useUser } from "contexts/UserContext";
import { useWallet } from "contexts/WalletContext";
import * as ImagePicker from "expo-image-picker";
import { updateProfilePic } from "services/authService";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ProfileHeader: React.FC = () => {
  const { user, setUser } = useUser();
  const { balance } = useWallet();
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const firstLetter = user?.username?.charAt(0)?.toUpperCase() || "?";

  const handleImagePress = () => {
    if (user?.profilePic) {
      setSelectedImage(user.profilePic);
      setImageModalVisible(true);
    }
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
    setSelectedImage(null);
  };

  // Mobile: Use Expo ImagePicker
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        const uri = result.assets[0].uri;
        await updateProfilePic(uri, setUser);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  return (
    <View style={styles.header}>
      {/* Profile Picture */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleImagePress} activeOpacity={0.7}>
          {user?.profilePic ? (
            <Image
              source={{ uri: user.profilePic }}
              style={styles.profilePicture}
            />
          ) : (
            <View style={[styles.profilePicture, styles.fallbackPicture]}>
              <Text style={styles.fallbackText}>{firstLetter}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Edit Button */}
        <TouchableOpacity style={styles.editButton} onPress={pickImage}>
          <MaterialIcons name="edit" size={15} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.username}>{user?.username}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.joinedDate}>Joined at: {joinedDate}</Text>
      <ProfileBalance balance={balance} />

      {/* Full Screen Image Modal */}
      <Modal
        visible={imageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={closeImageModal}
        >
          <View style={styles.modalContent}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// Styles remain exactly the same
const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  fallbackPicture: {
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: COLORS.light,
    fontSize: 50,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.dark,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.light,
  },
  username: {
    color: COLORS.light,
    fontSize: 20,
  },
  email: {
    color: COLORS.light,
    fontSize: 16,
    marginTop: 5,
  },
  joinedDate: {
    color: COLORS.light,
    fontSize: 14,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "100%",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
});

export default ProfileHeader;
