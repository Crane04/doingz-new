import React, { useRef, useState } from "react";
import { View, Modal, FlatList, Platform } from "react-native";
import Text from "elements/Text";
import { Ticket } from "types/event";
import { ModalProps } from "types/modal";
import ModalHeader from "../ModalHeader";
import { createEvent as styles } from "styles";
import TicketForm from "forms/TicketForm";
import TicketItem from "./CreateTicketItem";
import ModalFooter from "../ModalFooter";
import EventForm from "forms/EventForm";
import { createEvent } from "services/eventService";
import { useEvents } from "contexts/EventContext";
import { KeyboardAvoidingView } from "react-native";

const CreateEventModal: React.FC<ModalProps> = ({ visible, onClose }) => {
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [intention, setIntention] = useState<"spray" | "tickets" | "both">(
    "spray"
  );
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState<Ticket>({
    type: "",
    price: "",
    maxQuantity: "",
  });
  const [image, setImage] = useState<string | File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Event name is required";
    if (!host.trim()) newErrors.host = "Host is required";
    if (!startDate.trim()) newErrors.startDate = "Start date is required";
    if (!endDate.trim()) newErrors.endDate = "End date is required";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (intention !== "spray" && tickets.length === 0) {
      newErrors.tickets = "At least one ticket is required for this intention";
    }
    if (!image) newErrors.image = "Event image is required";
    tickets.forEach((ticket, index) => {
      if (!ticket.type.trim())
        newErrors[`ticketType${index}`] = "Ticket type is required";
      if (
        !ticket.price.trim() ||
        isNaN(parseFloat(ticket.price)) ||
        parseFloat(ticket.price) <= 0
      ) {
        newErrors[`ticketPrice${index}`] = "Valid price is required";
      }
      if (
        !ticket.maxQuantity.trim() ||
        isNaN(parseInt(ticket.maxQuantity)) ||
        parseInt(ticket.maxQuantity) <= 0
      ) {
        newErrors[`ticketMaxQuantity${index}`] =
          "Valid max quantity is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const { fetchEvents } = useEvents();

  const handleAddTicket = () => {
    if (
      newTicket.type.trim() &&
      newTicket.price.trim() &&
      newTicket.maxQuantity.trim()
    ) {
      setTickets([...tickets, newTicket]);
      setNewTicket({ type: "", price: "", maxQuantity: "" });
      setErrors((prev) => ({ ...prev, tickets: "" }));
    }
  };

  const handleRemoveTicket = (index: number) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newEventPayload = {
      name,
      host,
      startDate,
      endDate,
      location,
      description,
      intention,
      image,
      tickets:
        intention !== "spray"
          ? tickets.map((t) => ({
              type: t.type,
              price: parseFloat(t.price),
              maxQuantity: parseInt(t.maxQuantity),
            }))
          : [],
    };

    try {
      setLoading(true); // 👈 start loading
      const res = await createEvent(newEventPayload);

      setSuccess("🎉 Event created successfully!");
      await fetchEvents();

      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 3000);
    } catch (err: any) {
      console.error("Error creating event:", err.message);
      setErrors((prev) => ({ ...prev, submit: err.message }));
    } finally {
      setLoading(false); // 👈 stop loading
    }
  };

  {
    Platform.OS === "web" && (
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        // onChange={handleFileChange}
        style={{ display: "none" }}
      />
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalContainer}>
          <View style={styles.eventContainer}>
            <ModalHeader onClose={onClose} text={"Create Event"} />

            <FlatList
              data={[
                { key: "form" },
                ...tickets.map((_, i) => ({ key: `ticket${i}` })),
              ]}
              renderItem={({ item, index }) => {
                if (item.key === "form") {
                  return (
                    <>
                      <EventForm
                        name={name}
                        setName={setName}
                        host={host}
                        setHost={setHost}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        location={location}
                        setLocation={setLocation}
                        description={description}
                        setDescription={setDescription}
                        intention={intention}
                        setIntention={setIntention}
                        errors={errors}
                        image={image}
                        setImage={setImage}
                      />

                      {errors.tickets && (
                        <Text style={styles.error}>{errors.tickets}</Text>
                      )}

                      {intention !== "spray" && (
                        <View style={styles.content}>
                          <TicketForm
                            newTicket={newTicket}
                            setNewTicket={setNewTicket}
                            handleAddTicket={handleAddTicket}
                            errors={errors}
                            ticketsLength={tickets.length}
                          />
                        </View>
                      )}
                    </>
                  );
                }
                return (
                  <TicketItem
                    item={tickets[index - 1]}
                    index={index - 1}
                    handleRemoveTicket={handleRemoveTicket}
                  />
                );
              }}
              keyExtractor={(item) => item.key}
              contentContainerStyle={styles.listContent}
            />

            {errors.submit && (
              <Text
                style={{
                  color: "red",
                  marginVertical: 8,
                  marginHorizontal: 16,
                }}
              >
                {errors.submit}
              </Text>
            )}

            {success && (
              <Text
                style={{
                  color: "green",
                  marginVertical: 8,
                  marginHorizontal: 16,
                }}
              >
                {success}
              </Text>
            )}

            <ModalFooter
              onClose={onClose}
              handleSubmit={handleSubmit}
              closeText={loading ? "Creating Event..." : "Create Event"}
              disabled={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateEventModal;
