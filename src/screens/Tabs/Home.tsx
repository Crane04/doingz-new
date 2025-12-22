import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import WalletCard from "components/WalletCard";
import Container from "components/TabContainer";
import CreateEventModal from "components/home/CreateEventModal";
import COLORS from "constants/colors";
import { useEvents } from "contexts/EventContext";
import EmptyState from "components/home/EmptyState";
import EventCard from "components/home/EventCard";
import LoadingState from "components/home/LoadingState";
import SearchBar from "components/SearchBar";

const HomeScreen: React.FC = () => {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { filteredEvents, loading, fetchEvents } = useEvents();
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  return (
    <Container>
      <ScrollView
        stickyHeaderIndices={[1]}
        contentContainerStyle={[styles.listContent]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        <WalletCard />

        <SearchBar />

        {loading ? (
          <LoadingState />
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))
        ) : (
          <EmptyState setIsCreateEventOpen={setIsCreateEventOpen} />
        )}
      </ScrollView>

      {!loading && filteredEvents.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setIsCreateEventOpen(true)}
        >
          <MaterialIcons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}

      <CreateEventModal
        visible={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 80,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  loadingCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 40,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
  },
  loadingTitle: {
    fontSize: 20,
    color: COLORS.light,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  loadingDescription: {
    fontSize: 14,
    color: COLORS.lightGray,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: 15,
    elevation: 5,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default HomeScreen;
