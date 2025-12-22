// screens/MyEvents.tsx
import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Container from "components/TabContainer";
import { useNavigation } from "hooks/useNavigation";
import COLORS from "constants/colors";

// Components
import PageHeader from "components/common/PageHeader";
import EventsList from "components/myEvents/EventsList";
import EmptyState from "components/myEvents/EmptyState";

// Services
import { fetchUserEvents, BackendEvent } from "services/eventService";
import Loading from "components/common/Loading";
import Header from "components/Header";

const MyEvents: React.FC = () => {
  const [events, setEvents] = useState<BackendEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch user events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchUserEvents();

        if (response.status === "success") {
          const transformedEvents = response.data.map((event) => ({
            ...event,
          }));
          setEvents(transformedEvents);
        } else {
          setError("Failed to load events");
        }
      } catch (err) {
        console.error("Error fetching user events:", err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleEventPress = (eventId: string) => {
    router.push({
      pathname: "/manage-event/[id]",
      params: { id: eventId },
    });
  };

  if (loading) {
    return (
      <View style={styles.fullContainer}>
        <Loading />
      </View>
    );
  }

  if (error) {
    return (
      <Container>
        <EmptyState
          title="Error Loading Events"
          description={error}
          icon="warning-outline"
        />
      </Container>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Header title="My Events" route={""} />
        <PageHeader
          title="Manage Events"
          subtitle="Manage and view your created events"
        />
        {events.length === 0 ? (
          <EmptyState
            title="No Events Created"
            description="You haven't created any events yet. Start by creating your first event!"
            icon="calendar-outline"
          />
        ) : (
          <EventsList
            events={events}
            onEventPress={handleEventPress}
            formatDate={formatDate}
          />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
    marginVertical: 20,
  },
  fullContainer: {
    justifyContent: "center",
    flex: 1,
  },
});

export default MyEvents;
