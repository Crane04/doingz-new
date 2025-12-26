import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface EventItemProps {
  event: {
    _id: string;
    name: string;
    photo: string;
    createdAt: string;
    startDate: string;
    endDate: string;
    active: boolean;
    pending: boolean;
    attendees?: number;
    eventId: string;
  };
  onPress: (eventId: string, name: string) => void;
  formatDate: (dateString: string) => string;
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  onPress,
  formatDate,
}) => {
  const now = new Date();
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  let timeStatus = "Upcoming";
  let timeColor = COLORS.lightGray;

  if (now >= start && now <= end) {
    timeStatus = "Ongoing";
    timeColor = COLORS.success;
  } else if (now > end) {
    timeStatus = "Ended";
    timeColor = COLORS.danger;
  } else if (now > start) {
    timeStatus = "Started";
    timeColor = COLORS.primary;
  }

  const statusText = event.active ? "Active" : "Inactive";
  const statusColor = event.active ? COLORS.success : COLORS.lightGray;

  const pendingText = event.pending ? "Pending" : "Approved";
  const pendingColor = event.pending ? COLORS.secondary : COLORS.success;

  return (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => onPress(event.eventId, event.name)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: event.photo }}
        style={styles.eventImage}
        resizeMode="cover"
      />

      <View style={styles.eventInfo}>
        <Text weight="bold" style={styles.eventName}>
          {event.name}
        </Text>

        <View style={styles.badgeRow}>
          <View style={[styles.badge, { borderColor: statusColor }]}>
            <Text style={[styles.badgeText, { color: statusColor }]}>
              {statusText}
            </Text>
          </View>

          <View style={[styles.badge, { borderColor: pendingColor }]}>
            <Text style={[styles.badgeText, { color: pendingColor }]}>
              {pendingText}
            </Text>
          </View>
        </View>
      </View>

      {/* Right side column */}
      <View style={styles.rightColumn}>
        <View style={[styles.timeBadge, { borderColor: timeColor }]}>
          <Text style={[styles.timeBadgeText, { color: timeColor }]}>
            {timeStatus}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color={COLORS.lightGray} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.darkGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  eventImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    color: COLORS.light,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 13,
    color: COLORS.lightGray,
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
  },
  rightColumn: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 50,
  },
  timeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 6,
  },
  timeBadgeText: {
    fontSize: 11,
  },
});

export default EventItem;
