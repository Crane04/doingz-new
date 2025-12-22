interface Ticket {
  type: string;
  price: string;
  maxQuantity: string;
}

interface IntentionSelectorProps {
  intention: "spray" | "tickets" | "both";
  setIntention: (intention: "spray" | "tickets" | "both") => void;
}

interface TicketFormProps {
  newTicket: Ticket;
  setNewTicket: (ticket: Ticket) => void;
  handleAddTicket: () => void;
  errors: { [key: string]: string };
  ticketsLength: number;
}

interface TicketItemProps {
  item: Ticket;
  index: number;
  handleRemoveTicket: (index: number) => void;
}

interface EventFormProps {
  name: string;
  setName: (name: string) => void;
  host: string;
  setHost: (host: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  location: string;
  setLocation: (location: string) => void;
  description: string;
  setDescription: (description: string) => void;
  intention: "spray" | "tickets" | "both";
  setIntention: (intention: "spray" | "tickets" | "both") => void;
  errors: { [key: string]: string };
  image: string | null | File;
  setImage: (uri: string | null | File) => void;
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
  TicketFormProps,
  TicketItemProps,
  EventFormProps,
  ApiEvent,
  EventApiResponse,
};
