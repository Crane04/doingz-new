import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "elements/Text";
import COLORS from "../constants/colors";

interface EventContentProps {
  name: string;
  host: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  attendees: number;
}

const EventContent: React.FC<EventContentProps> = ({
  name,
  host,
  startDate,
  endDate,
  location,
  description,
  attendees,
}) => (
  <View style={styles.content}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.date}>
      {startDate} - {endDate}
    </Text>
    <Text style={styles.location}>📍 {location}</Text>
    <Text style={styles.host}>
      Hosted by <Text style={styles.hostStrong}>{host}</Text>
    </Text>
    <Text style={styles.people}>{attendees} people active</Text>
    <Text style={styles.description} numberOfLines={3}>
      {description}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  content: {
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  title: {
    fontSize: 18,

    color: COLORS.light,
  },
  date: {
    fontSize: 14,
    color: COLORS.lightGray,
    marginTop: 2,
  },
  location: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 2,
  },
  host: {
    fontSize: 14,
    color: COLORS.light,
    marginTop: 8,
  },
  hostStrong: {},
  people: {
    fontSize: 13,
    color: COLORS.lightGray,
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: COLORS.light,
    lineHeight: 20,
    marginTop: 8,
  },
});

export default EventContent;
