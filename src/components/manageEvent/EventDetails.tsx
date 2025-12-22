import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";

interface EventDetailsProps {
  event: {
    startDate: string;
    endDate: string;
    location: string;
    attendees: number;
  };
  formatDate: (dateString: string) => string;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, formatDate }) => {
  const detailItems = [
    {
      icon: "calendar-outline" as const,
      label: "Start Date",
      value: formatDate(event.startDate),
    },
    {
      icon: "time-outline" as const,
      label: "End Date",
      value: formatDate(event.endDate),
    },
    {
      icon: "location-outline" as const,
      label: "Location",
      value: event.location,
    },
    {
      icon: "people-outline" as const,
      label: "Attendees",
      value: `${event.attendees} people`,
    },
  ];

  return (
    <View style={styles.detailsSection}>
      <Text weight="bold" style={styles.sectionTitle}>
        Event Details
      </Text>

      {detailItems.map((item, index) => (
        <View key={index} style={styles.detailItem}>
          <Ionicons name={item.icon} size={20} color={COLORS.primary} />
          <View style={styles.detailText}>
            <Text style={styles.detailLabel}>{item.label}</Text>
            <Text style={styles.detailValue}>{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  detailsSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.light,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.darkGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  detailText: {
    flex: 1,
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.lightGray,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.light,
  },
});

export default EventDetails;
