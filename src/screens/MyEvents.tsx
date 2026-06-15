// screens/MyEvents.tsx
import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Container from "components/TabContainer";
import COLORS from "constants/colors";

// Components
import PageHeader from "components/common/PageHeader";
import EventsList from "components/myEvents/EventsList";
import EmptyState from "components/myEvents/EmptyState";

// Services
import { fetchUserEvents, BackendEvent } from "services/eventService";
import Loading from "components/common/Loading";
import Header from "components/Header";
import { useAsyncData } from "hooks/useAsyncData";
import { formatDisplayDate } from "utils/format";

const MyEvents: React.FC = () => {
  const router = useRouter();

  const loadEvents = useCallback(async () => {
    const response = await fetchUserEvents();

    if (response.status !== "success") {
      throw new Error(response.message || "Failed to load events");
    }

    return response.data;
  }, []);

  const {
    data: events,
    error,
    loading,
  } = useAsyncData<BackendEvent[]>({
    initialData: [],
    loader: loadEvents,
  });

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
            formatDate={formatDisplayDate}
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
