// components/events/EventsList.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import EventItem from "./EventItem";
import { BackendEvent } from "services/eventService";

interface EventsListProps {
  events: BackendEvent[];
  onEventPress: (eventId: string, name: string) => void;
  formatDate: (dateString: string) => string;
}

const EventsList: React.FC<EventsListProps> = ({
  events,
  onEventPress,
  formatDate,
}) => {
  return (
    <View style={styles.eventsList}>
      {events.map((event) => (
        <EventItem
          key={event._id}
          event={event}
          onPress={onEventPress}
          formatDate={formatDate}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  eventsList: {
    paddingVertical: 16,
  },
});

export default EventsList;
