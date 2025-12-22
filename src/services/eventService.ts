import { get, post } from "../utils/api"; // ⬅️ your wrapper (like post)
import { getLikedEvents } from "./likesService";

export interface EventResponse {
  status: string;
  message?: string;
  data: BackendEvent[];
}

export interface BackendEvent {
  _id: string;
  owner: string;
  name: string;
  eventId: string;
  photo: string;
  location: string;
  host: string;
  startDate: string;
  endDate: string;
  description: string;
  attendees: number;
  intention: "spray" | "tickets" | "both";
  createdAt: string;
  updatedAt: string;
  active: boolean;
  pending: boolean;
  __v: number;
}

export interface EventDetails {
  _id: string;
  name: string;
  photo: string;
  location: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
  eventId: string;
}

export const fetchEvents = async (): Promise<EventResponse> => {
  const response = await get<EventResponse>("event/get-all");

  return response.data; // ✅ unwrap the backend payload
};

export const getEventById = async (eventId: string) => {
  const response = await get<{ message: string; data: EventDetails }>(
    `/event/${eventId}`
  );
  return response.data.data;
};

export interface TicketPayload {
  type: string;
  price: number;
  maxQuantity: number;
}

export interface CreateEventPayload {
  name: string;
  host: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  intention: "spray" | "tickets" | "both";
  image: string | null | File;
  tickets?: TicketPayload[];
}

export const createEvent = async (eventData: CreateEventPayload) => {
  const formData = new FormData();

  // Basic fields
  formData.append("name", eventData.name);
  formData.append("host", eventData.host);
  formData.append("startDate", eventData.startDate);
  formData.append("endDate", eventData.endDate);
  formData.append("location", eventData.location);
  formData.append("description", eventData.description);
  formData.append("intention", eventData.intention);

  // IMAGE — THE CRITICAL FIX
  if (eventData.image) {
    if (typeof eventData.image === "string") {
      // Mobile: URI string
      formData.append("image", {
        uri: eventData.image,
        name: "event.jpg",
        type: "image/jpeg",
      } as any);
    } else {
      console.log(eventData.image);
      formData.append("image", eventData.image); // Just append the File directly
    }
  }

  // Tickets
  if (eventData.tickets && eventData.tickets.length > 0) {
    eventData.tickets.forEach((ticket, index) => {
      formData.append(`tickets[${index}][type]`, ticket.type);
      formData.append(`tickets[${index}][price]`, String(ticket.price));
      formData.append(
        `tickets[${index}][maxQuantity]`,
        String(ticket.maxQuantity)
      );
    });
  }

  try {
    const response = await post<any>("/event/create", formData, {
      // REMOVE THIS LINE — THIS IS THE #1 KILLER
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response;
  } catch (error) {
    console.error("Event creation failed:", error);
    throw error;
  }
};

export const fetchUserEvents = async (): Promise<EventResponse> => {
  const response = await get<EventResponse>("event/get-user");

  return response.data;
};

export const fetchLikedEvents = async (): Promise<EventResponse> => {
  try {
    // Get liked event IDs from AsyncStorage
    const likedEventIds = await getLikedEvents();

    if (likedEventIds.length === 0) {
      return {
        status: "success",
        message: "No liked events",
        data: [],
      };
    }

    // Convert array to comma-separated string for URL
    const eventIdsParam = likedEventIds.join(",");

    // Send GET request
    const response = await get<EventResponse>(
      `event/get-liked?eventIds=${encodeURIComponent(eventIdsParam)}`
    );

    console.log(response.data.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching liked events:", error);
    throw error;
  }
};

export interface ManageEventResponse {
  status: string;
  message: string;
  data: BackendEvent & {
    totalAmount: number;
    active?: boolean;
    cashedOut: boolean;
    attendees: number;
  };
}

export const fetchEventById = async (
  eventId: string
): Promise<ManageEventResponse> => {
  const response = await get<ManageEventResponse>(
    `event/get-owned?eventId=${eventId}`
  );
  return response.data;
};
