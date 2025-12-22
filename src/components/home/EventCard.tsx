import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Share } from "react-native";
import EventImage from "../EventImage";
import EventIcons from "../EventIcons";
import EventContent from "../EventContent";
import TicketModal from "../TicketModal";
import COLORS from "constants/colors";
import { ImageSourcePropType } from "react-native";
import { useEventLikes } from "hooks/useEventLikes";
import { router } from "expo-router";

export type EventCardProps = {
  image?: ImageSourcePropType;
  name: string;
  host: string;
  eventId: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  attendees: number;
  intention: "spray" | "tickets" | "both";
  tickets?: { type: string; price: number; maxQuantity?: number }[];
  initiallyLiked?: boolean;
  onLikeChange?: (liked: boolean) => void;
};

const EventCard: React.FC<EventCardProps> = ({
  image,
  name,
  host,
  eventId,
  startDate,
  endDate,
  location,
  description,
  attendees,
  intention,
  tickets = [],
  initiallyLiked = false,
}) => {
  const [liked, setLiked] = useState<boolean>(initiallyLiked);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);

  const { isEventLiked, toggleLike, loading } = useEventLikes();

  useEffect(() => {
    if (!loading) {
      setLiked(isEventLiked(eventId));
    }
  }, [eventId, isEventLiked, loading]);

  const handleToggleLike = useCallback(async () => {
    const newLikedState = !liked;
    setLiked(newLikedState);

    try {
      await toggleLike(eventId);
    } catch (error) {
      // Revert state if there's an error
      setLiked(!newLikedState);
    }
  }, [liked, eventId, toggleLike]);
  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `🎉 ${name}

📍 ${location}

${description}

Join the party on Doingz 👇
https://party.doingz.app/event/${eventId}`,
      });
    } catch {}
  }, [name, location, description, eventId]);

  const handleCardPress = () => {
    if (intention === "spray") {
      router.push(`/event/${eventId}?name=${encodeURIComponent(name || "")}`);
    } else {
      setIsTicketModalOpen(true);
    }
  };

  const handleCloseTicketModal = () => {
    setIsTicketModalOpen(false);
  };

  const handleNavigateToEvent = () => {
    router.push(`/event/${eventId}?name=${encodeURIComponent(name || "")}`);
    setIsTicketModalOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={handleCardPress}>
        <EventImage image={image} />
        <EventIcons
          liked={liked}
          onShare={handleShare}
          onToggleLike={handleToggleLike}
        />
        <EventContent
          name={name}
          host={host}
          startDate={startDate}
          endDate={endDate}
          location={location}
          description={description}
          attendees={attendees}
        />
      </TouchableOpacity>
      {(intention === "tickets" || intention === "both") && (
        <TicketModal
          visible={isTicketModalOpen}
          onClose={handleCloseTicketModal}
          eventName={name}
          tickets={tickets}
          onNavigateToEvent={handleNavigateToEvent}
          showEventButton={intention === "both"}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    position: "relative",
    backgroundColor: COLORS.dark,
  },
});

export default EventCard;
