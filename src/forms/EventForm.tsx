import React, { useRef } from "react";
import { EventFormProps } from "types/event";
import { createEvent as styles } from "styles";
import { Input, Text } from "elements";
import IntentionSelector from "components/home/IntentionSelector";
import * as ImagePicker from "expo-image-picker";
import {
  TouchableOpacity,
  Image,
  View,
  Platform,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EventForm: React.FC<EventFormProps> = ({
  name,
  setName,
  host,
  setHost,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  location,
  setLocation,
  description,
  setDescription,
  intention,
  setIntention,
  errors,
  image,
  setImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = React.useState<string | null>();
  // Helper: Convert File → data URL for preview
  const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Web: Native file input
  const pickImageWeb = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await fileToDataURL(file);
      setImagePreview(dataUrl); // Instant preview
      setImage(file); // Keep original File for upload
    } catch (err) {
      console.error("Failed to read file", err);
    }
  };

  // Mobile: Expo ImagePicker
  const pickImageMobile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setImage(result.assets[0].uri); // Keep URI for upload
      setImagePreview(result.assets[0].uri); // URI works as preview on mobile
    }
  };

  const pickImage = Platform.OS === "web" ? pickImageWeb : pickImageMobile;

  return (
    <View style={styles.content}>
      {/* Hidden web input */}
      {Platform.OS === "web" && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      )}

      {/* Your inputs */}
      <Input
        label="Event Name"
        value={name}
        onChangeText={setName}
        error={errors.name}
      />
      <Input
        label="Host"
        value={host}
        onChangeText={setHost}
        error={errors.host}
      />
      <Input
        label="Start Date"
        value={startDate}
        onChangeText={setStartDate}
        error={errors.startDate}
        type="date"
      />
      <Input
        label="End Date"
        value={endDate}
        onChangeText={setEndDate}
        error={errors.endDate}
        type="date"
      />
      <Input
        label="Location"
        value={location}
        onChangeText={setLocation}
        error={errors.location}
      />
      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        error={errors.description}
      />

      {/* Image Picker with Data URL Preview */}
      <TouchableOpacity
        onPress={pickImage}
        style={[
          localStyles.imageContainer,
          errors.image && localStyles.errorBorder,
        ]}
      >
        {imagePreview ? (
          <Image
            source={{ uri: imagePreview }}
            style={localStyles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={localStyles.placeholder}>
            <Ionicons name="image-outline" size={48} color="#888" />
            <Text style={localStyles.placeholderText}>
              Tap to add event image
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {errors.image && (
        <Text
          style={{
            color: "red",
            fontSize: 12,
            marginTop: 4,
            alignSelf: "center",
          }}
        >
          {errors.image}
        </Text>
      )}

      <IntentionSelector intention={intention} setIntention={setIntention} />
    </View>
  );
};

const localStyles = StyleSheet.create({
  imageContainer: {
    marginTop: 20,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#111",
    borderWidth: 2,
    borderColor: "#333",
    borderStyle: "dashed",
  },
  errorBorder: {
    borderColor: "red",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#888",
    marginTop: 12,
    fontSize: 16,
  },
});

export default EventForm;
