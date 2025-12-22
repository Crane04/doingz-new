import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { fetchEvents as fetchEventsService } from "services/eventService";

// 🎟 Ticket type
type Ticket = {
  type: string;
  price: number;
  maxQuantity?: number;
};

// 📅 Event type
export type Event = {
  id?: number;
  name: string;
  image: any;
  host: string;
  eventId: string;
  attendees: number;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  intention: "spray" | "tickets" | "both";
  tickets?: Ticket[];
};

type EventContextType = {
  events: Event[];
  filteredEvents: Event[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  fetchEvents: () => Promise<void>; // 👈 expose refresh function
  loading: boolean;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  // 👇 Wrap fetchEvents so we can call it from anywhere
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetchEventsService();
      console.log(res);
      if (res.status === "success") {
        const mapped = res.data.map((e: any) => ({
          id: Number(e._id),
          name: e.name,
          eventId: e.eventId,
          host: e.host || "Unknown host",
          description: e.description || "No description",
          startDate: new Date(e.startDate).toDateString(),
          endDate: new Date(e.endDate).toDateString(),
          location: e.location,
          attendees: e.attendees,
          intention: (e.intention || "spray") as "spray" | "tickets" | "both",
          image: { uri: e.photo },
          tickets: e.tickets,
        }));

        setEvents(mapped);
      } else {
        console.error("Backend returned error:", res.message);
      }
    } catch (err) {
      console.error("❌ Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // 🔎 Filter events by query
  const filteredEvents = useMemo(() => {
    if (!searchQuery) return events;
    return events.filter(
      (event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, events]);

  return (
    <EventContext.Provider
      value={{
        events,
        filteredEvents,
        searchQuery,
        setSearchQuery,
        setEvents,
        fetchEvents,
        loading,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context)
    throw new Error("useEvents must be used within an EventProvider");
  return context;
};
