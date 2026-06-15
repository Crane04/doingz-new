// screens/LikedEventsScreen.tsx
import React, { useCallback } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";

// Components
import PageHeader from "components/common/PageHeader";
import EmptyState from "components/myEvents/EmptyState";
import LoadingState from "components/myEvents/LoadingState";

// Services
import { fetchLikedEvents, BackendEvent } from "services/eventService";
import { useEventLikes } from "hooks/useEventLikes";
import COLORS from "constants/colors";
import EventCard from "components/home/EventCard";
import Header from "components/Header";
import { useAsyncData } from "hooks/useAsyncData";

const SavedEvents: React.FC = () => {
  const { likedEvents } = useEventLikes();

  const loadLikedEvents = useCallback(async () => {
    const response = await fetchLikedEvents();

    if (response.status !== "success") {
      throw new Error(response.message || "Failed to load liked events");
    }

    return response.data;
  }, []);

  const {
    data: events,
    error,
    loading,
    refresh,
    refreshing,
  } = useAsyncData<BackendEvent[]>({
    initialData: [],
    loader: loadLikedEvents,
  });

  // Show empty state if no liked events in local storage
  if (!loading && likedEvents.length === 0) {
    return (
      <>
        <Header title="Saved Events" route={""} />
        <EmptyState
          title="No Liked Events"
          description="You haven't liked any events yet. Start exploring and like events you're interested in!"
          icon="heart-outline"
        />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header title="Saved Events" route={""} />
        <LoadingState message="Loading your liked events..." />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header title="Saved Events" route={""} />
        <EmptyState
          title="Error Loading Events"
          description={error}
          icon="warning-outline"
        />
      </>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        <Header title="Saved Events" />
        <PageHeader
          title="Liked Events"
          subtitle={`${events.length} events you've liked`}
        />

        {events.length === 0 ? (
          <EmptyState
            title="No Events Found"
            description="The events you liked might have been removed or are no longer available."
            icon="heart-dislike-outline"
          />
        ) : (
          events.map((event, index) => (
            <EventCard key={index} {...event} image={{ uri: event.photo }} />
          ))
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
    marginTop: 10,
  },
});

export default SavedEvents;
