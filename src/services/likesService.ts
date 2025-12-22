// services/likesService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const LIKED_EVENTS_KEY = "liked_events";

export const getLikedEvents = async (): Promise<string[]> => {
  try {
    const likedEvents = await AsyncStorage.getItem(LIKED_EVENTS_KEY);
    return likedEvents ? JSON.parse(likedEvents) : [];
  } catch (error) {
    console.error("Error getting liked events:", error);
    return [];
  }
};

export const saveLikedEvents = async (likedEvents: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(LIKED_EVENTS_KEY, JSON.stringify(likedEvents));
  } catch (error) {
    console.error("Error saving liked events:", error);
  }
};

export const addLikedEvent = async (eventId: string): Promise<void> => {
  try {
    const likedEvents = await getLikedEvents();
    if (!likedEvents.includes(eventId)) {
      const updatedLikes = [...likedEvents, eventId];
      await saveLikedEvents(updatedLikes);
    }
  } catch (error) {
    console.error("Error adding liked event:", error);
  }
};

export const removeLikedEvent = async (eventId: string): Promise<void> => {
  try {
    const likedEvents = await getLikedEvents();
    const updatedLikes = likedEvents.filter((id) => id !== eventId);
    await saveLikedEvents(updatedLikes);
  } catch (error) {
    console.error("Error removing liked event:", error);
  }
};

export const isEventLiked = async (eventId: string): Promise<boolean> => {
  try {
    const likedEvents = await getLikedEvents();
    return likedEvents.includes(eventId);
  } catch (error) {
    console.error("Error checking if event is liked:", error);
    return false;
  }
};
