import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { createEvent } from "services/eventService";
import { useEvents } from "contexts/EventContext";
import { Ticket } from "types/event";

type EventIntention = "spray" | "tickets" | "both";
type FormErrors = { [key: string]: string };

interface CreateEventState {
  name: string;
  host: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  intention: EventIntention;
  tickets: Ticket[];
  draftTicket: Ticket;
  image: string | File | null;
  errors: FormErrors;
  success: string | null;
  loading: boolean;
}

type CreateEventField = Pick<
  CreateEventState,
  "name" | "host" | "startDate" | "endDate" | "location" | "description"
>;

type Action =
  | {
      type: "SET_FIELD";
      field: keyof CreateEventField;
      value: string;
    }
  | { type: "SET_INTENTION"; intention: EventIntention }
  | { type: "SET_IMAGE"; image: string | File | null }
  | { type: "SET_DRAFT_TICKET"; ticket: Ticket }
  | { type: "ADD_TICKET" }
  | { type: "REMOVE_TICKET"; index: number }
  | { type: "SET_ERRORS"; errors: FormErrors }
  | { type: "SET_SUBMIT_ERROR"; message: string }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_SUCCESS"; success: string | null }
  | { type: "RESET" };

interface CreateEventContextValue {
  state: CreateEventState;
  setField: (field: keyof CreateEventField, value: string) => void;
  setIntention: (intention: EventIntention) => void;
  setImage: (image: string | File | null) => void;
  setDraftTicket: (ticket: Ticket) => void;
  addTicket: () => void;
  removeTicket: (index: number) => void;
  submit: () => Promise<void>;
  close: () => void;
}

const emptyTicket: Ticket = {
  type: "",
  price: "",
  maxQuantity: "",
};

const initialState: CreateEventState = {
  name: "",
  host: "",
  startDate: "",
  endDate: "",
  location: "",
  description: "",
  intention: "spray",
  tickets: [],
  draftTicket: emptyTicket,
  image: null,
  errors: {},
  success: null,
  loading: false,
};

const CreateEventContext = createContext<CreateEventContextValue | undefined>(
  undefined
);

const reducer = (
  state: CreateEventState,
  action: Action
): CreateEventState => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: "" },
      };
    case "SET_INTENTION":
      return { ...state, intention: action.intention };
    case "SET_IMAGE":
      return {
        ...state,
        image: action.image,
        errors: { ...state.errors, image: "" },
      };
    case "SET_DRAFT_TICKET":
      return { ...state, draftTicket: action.ticket };
    case "ADD_TICKET":
      if (
        !state.draftTicket.type.trim() ||
        !state.draftTicket.price.trim() ||
        !state.draftTicket.maxQuantity.trim()
      ) {
        return state;
      }

      return {
        ...state,
        tickets: [...state.tickets, state.draftTicket],
        draftTicket: emptyTicket,
        errors: { ...state.errors, tickets: "" },
      };
    case "REMOVE_TICKET":
      return {
        ...state,
        tickets: state.tickets.filter((_, index) => index !== action.index),
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SET_SUBMIT_ERROR":
      return {
        ...state,
        errors: { ...state.errors, submit: action.message },
      };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_SUCCESS":
      return { ...state, success: action.success };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const validateCreateEvent = (state: CreateEventState): FormErrors => {
  const errors: FormErrors = {};

  if (!state.name.trim()) errors.name = "Event name is required";
  if (!state.host.trim()) errors.host = "Host is required";
  if (!state.startDate.trim()) errors.startDate = "Start date is required";
  if (!state.endDate.trim()) errors.endDate = "End date is required";
  if (!state.location.trim()) errors.location = "Location is required";
  if (!state.description.trim()) {
    errors.description = "Description is required";
  }
  if (!state.image) errors.image = "Event image is required";
  if (state.intention !== "spray" && state.tickets.length === 0) {
    errors.tickets = "At least one ticket is required for this intention";
  }

  state.tickets.forEach((ticket, index) => {
    const price = parseFloat(ticket.price);
    const maxQuantity = parseInt(ticket.maxQuantity, 10);

    if (!ticket.type.trim()) {
      errors[`ticketType${index}`] = "Ticket type is required";
    }
    if (!ticket.price.trim() || Number.isNaN(price) || price <= 0) {
      errors[`ticketPrice${index}`] = "Valid price is required";
    }
    if (
      !ticket.maxQuantity.trim() ||
      Number.isNaN(maxQuantity) ||
      maxQuantity <= 0
    ) {
      errors[`ticketMaxQuantity${index}`] = "Valid max quantity is required";
    }
  });

  return errors;
};

interface CreateEventProviderProps {
  children: ReactNode;
  onClose: () => void;
}

export const CreateEventProvider: React.FC<CreateEventProviderProps> = ({
  children,
  onClose,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateRef = useRef(state);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { fetchEvents } = useEvents();

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const close = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    dispatch({ type: "RESET" });
    onClose();
  }, [onClose]);

  const submit = useCallback(async () => {
    const currentState = stateRef.current;
    const errors = validateCreateEvent(currentState);

    dispatch({ type: "SET_ERRORS", errors });
    if (Object.keys(errors).length > 0) return;

    const payload = {
      name: currentState.name,
      host: currentState.host,
      startDate: currentState.startDate,
      endDate: currentState.endDate,
      location: currentState.location,
      description: currentState.description,
      intention: currentState.intention,
      image: currentState.image,
      tickets:
        currentState.intention !== "spray"
          ? currentState.tickets.map((ticket) => ({
              type: ticket.type,
              price: parseFloat(ticket.price),
              maxQuantity: parseInt(ticket.maxQuantity, 10),
            }))
          : [],
    };

    try {
      dispatch({ type: "SET_LOADING", loading: true });
      await createEvent(payload);
      dispatch({ type: "SET_SUCCESS", success: "Event created successfully!" });
      await fetchEvents();

      closeTimerRef.current = setTimeout(() => {
        close();
      }, 1200);
    } catch (err: any) {
      dispatch({
        type: "SET_SUBMIT_ERROR",
        message: err?.message || "Unable to create event",
      });
    } finally {
      dispatch({ type: "SET_LOADING", loading: false });
    }
  }, [close, fetchEvents]);

  const value = useMemo<CreateEventContextValue>(
    () => ({
      state,
      setField: (field, value) =>
        dispatch({ type: "SET_FIELD", field, value }),
      setIntention: (intention) =>
        dispatch({ type: "SET_INTENTION", intention }),
      setImage: (image) => dispatch({ type: "SET_IMAGE", image }),
      setDraftTicket: (ticket) =>
        dispatch({ type: "SET_DRAFT_TICKET", ticket }),
      addTicket: () => dispatch({ type: "ADD_TICKET" }),
      removeTicket: (index) => dispatch({ type: "REMOVE_TICKET", index }),
      submit,
      close,
    }),
    [close, state, submit]
  );

  return (
    <CreateEventContext.Provider value={value}>
      {children}
    </CreateEventContext.Provider>
  );
};

export const useCreateEvent = () => {
  const context = useContext(CreateEventContext);

  if (!context) {
    throw new Error("useCreateEvent must be used within CreateEventProvider");
  }

  return context;
};
