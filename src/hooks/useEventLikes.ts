// hooks/useEventLikes.ts
import { useState, useEffect, useCallback } from "react";
import {
  getLikedEvents,
  addLikedEvent,
  removeLikedEvent,
  isEventLiked as checkIsEventLiked,
} from "services/likesService";

export const useEventLikes = (eventId?: string) => {
  const [likedEvents, setLikedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLikedEvents();
  }, []);

  const loadLikedEvents = async () => {
    try {
      const events = await getLikedEvents();
      setLikedEvents(events);
    } catch (error) {
      console.error("Error loading liked events:", error);
    } finally {
      setLoading(false);
    }
  };

  const likeEvent = async (id: string) => {
    try {
      await addLikedEvent(id);
      setLikedEvents((prev) => [...prev, id]);
    } catch (error) {
      console.error("Error liking event:", error);
      throw error;
    }
  };

  const unlikeEvent = async (id: string) => {
    try {
      await removeLikedEvent(id);
      setLikedEvents((prev) => prev.filter((eventId) => eventId !== id));
    } catch (error) {
      console.error("Error unliking event:", error);
      throw error;
    }
  };

  const isEventLiked = useCallback(
    (id: string): boolean => {
      return likedEvents.includes(id);
    },
    [likedEvents]
  );

  const toggleLike = async (id: string) => {
    if (isEventLiked(id)) {
      await unlikeEvent(id);
    } else {
      await likeEvent(id);
    }
  };

  return {
    likedEvents,
    likeEvent,
    unlikeEvent,
    toggleLike,
    isEventLiked,
    loading,
  };
};
