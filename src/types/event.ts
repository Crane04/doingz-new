interface Ticket {
  type: string;
  price: string;
  maxQuantity: string;
}

interface IntentionSelectorProps {
  intention: "spray" | "tickets" | "both";
  setIntention: (intention: "spray" | "tickets" | "both") => void;
}

interface ApiEvent {
  _id: string;
  owner: string;
  name: string;
  eventId: string;
  photo: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}
interface EventApiResponse {
  message: string;
  data: ApiEvent[];
  status: "success" | "error";
}

export type {
  Ticket,
  IntentionSelectorProps,
  ApiEvent,
  EventApiResponse,
};
