// screens/ManageEvent.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "constants/colors";
import { useLocalSearchParams } from "expo-router";

// Components
import EventHeader from "components/manageEvent/EventHeader";
import AmountSection from "components/manageEvent/AmountSection";
import EventDetails from "components/manageEvent/EventDetails";
import WithdrawSection from "components/manageEvent/WithdrawSection";
import HostControlsModal from "components/manageEvent/HostControlModal";

// Services and Types
import { fetchEventById, BackendEvent } from "services/eventService";

import Loading from "components/common/Loading";
import { useVersion } from "contexts/VersionContext";
import Header from "components/Header";

// Extend BackendEvent to include totalAmount for the manage event view
interface ManageEventData extends BackendEvent {
  totalAmount: number;
  attendees: number;
  active: boolean;
  cashedOut: boolean;
}

const ManageEvent: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { version } = useVersion();
  const [event, setEvent] = useState<ManageEventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animatedValue] = useState(new Animated.Value(0));
  const animatedNumber = useRef(new Animated.Value(0)).current;
  const [displayAmount, setDisplayAmount] = useState("0");
  const [showHostControls, setShowHostControls] = useState(false);

  // Fetch event data
  useEffect(() => {
    const loadEventData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchEventById(id);

        if (response.status === "success") {
          console.log(response.data);
          setEvent(response.data);

          // Start animations after data is loaded
          Animated.spring(animatedValue, {
            toValue: 1,
            tension: 20,
            friction: 8,
            useNativeDriver: true,
          }).start();

          animatedNumber.addListener(({ value }) => {
            setDisplayAmount(`${Math.floor(value).toLocaleString()}`);
          });

          Animated.timing(animatedNumber, {
            toValue: response.data.totalAmount,
            duration: 2000,
            useNativeDriver: false,
          }).start();
        } else {
          setError("Failed to load event data");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event data");
      } finally {
        setLoading(false);
      }
    };

    loadEventData();

    return () => {
      animatedNumber.removeAllListeners();
    };
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleHostAction = (action: string) => {
    console.log("Host action:", action, "for event:", id);
    switch (action) {
      case "leaderboard":
        // Navigate to leaderboard
        break;
      case "edit":
        // Navigate to edit event
        break;
      case "analytics":
        // Navigate to analytics
        break;
      case "attendees":
        // Navigate to attendees
        break;
      case "share":
        // Share event
        break;
      case "settings":
        // Navigate to settings
        break;
    }
  };

  if (loading) {
    return (
      <>
        <Header title="Manage Event" route={""} />
        <View style={styles.fullContainer}>
          <Loading />
        </View>
      </>
    );
  }

  if (error || !event) {
    return (
      <>
        <Header title="Manage Event" route={""} />
        <View style={styles.fullContainer}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <View style={styles.errorContainer}>
            <Ionicons name="warning-outline" size={64} color={COLORS.danger} />
            <Text weight="bold" style={styles.errorTitle}>
              {error || "Event not found"}
            </Text>
            <Text style={styles.errorDescription}>
              {error
                ? "Please try again later"
                : "The event you're looking for doesn't exist"}
            </Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Header title="Manage Event" route={""} />
      <View style={styles.fullContainer}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <EventHeader
            event={{
              name: event.name,
              image: event.photo,
              description: event.description,
              host: event.host,
            }}
            onHostControlsPress={() => setShowHostControls(true)}
          />

          <AmountSection
            displayAmount={displayAmount}
            attendees={event.attendees}
            animatedValue={animatedValue}
          />

          <EventDetails
            event={{
              startDate: event.startDate,
              endDate: event.endDate,
              location: event.location,
              attendees: event.attendees,
            }}
            formatDate={formatDate}
          />

          {!version?.hidden && (
            <WithdrawSection
              cashedOut={event.cashedOut}
              eventIdentifier={event.eventId}
            />
          )}
        </ScrollView>

        <HostControlsModal
          visible={showHostControls}
          onClose={() => setShowHostControls(false)}
          onActionPress={handleHostAction}
          eventId={id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: COLORS.dark,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  hostControlsFab: {
    position: "absolute",
    top: (StatusBar.currentHeight || 0) + 20,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    color: COLORS.lightGray,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 24,
    color: COLORS.light,
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  errorDescription: {
    fontSize: 16,
    color: COLORS.lightGray,
    textAlign: "center",
    lineHeight: 22,
  },
});

export default ManageEvent;
