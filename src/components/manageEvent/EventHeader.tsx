// components/events/EventHeader.tsx
import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface EventHeaderProps {
  event: {
    name: string;
    image: string;
    description: string;
    host: string;
  };
  onHostControlsPress: () => void;
}

const EventHeader: React.FC<EventHeaderProps> = ({
  event,
  onHostControlsPress,
}) => {
  return (
    <View style={styles.header}>
      <Image
        source={{ uri: event.image }}
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={styles.eventHeaderInfo}>
        <View style={styles.titleRow}>
          <Text weight="bold" style={styles.eventName}>
            {event.name}
          </Text>
          <TouchableOpacity style={styles.hostBadge}>
            <Text style={styles.hostBadgeText}>Host:</Text>
            <Text style={styles.hostBadgeText}>{event.host}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.eventDescription}>{event.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.gray,
    overflow: "hidden",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  eventImage: {
    width: "100%",
    height: 250,
  },
  eventHeaderInfo: {
    padding: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  eventName: {
    fontSize: 24,
    color: COLORS.light,
    flex: 1,
  },
  hostBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${COLORS.secondary}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  hostBadgeText: {
    fontSize: 12,
    color: COLORS.secondary,
  },
  eventDescription: {
    fontSize: 16,
    color: COLORS.lightGray,
    lineHeight: 22,
  },
});

export default EventHeader;
