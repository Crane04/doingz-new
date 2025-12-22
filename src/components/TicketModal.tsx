import React, { useState } from "react";
import { StyleSheet, View, Modal } from "react-native";
import TicketHeader from "./TicketHeader";
import TicketList from "./TicketList";
import COLORS from "../constants/colors";

interface Ticket {
  type: string;
  price: number;
  maxQuantity?: number;
}

interface TicketModalProps {
  visible: boolean;
  onClose: () => void;
  eventName: string;
  tickets: Ticket[];
  onNavigateToEvent: () => void;
  showEventButton: boolean;
}

const TicketModal: React.FC<TicketModalProps> = ({
  visible,
  onClose,
  eventName,
  tickets,
  onNavigateToEvent,
  showEventButton,
}) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    tickets.reduce((acc, ticket) => ({ ...acc, [ticket.type]: 0 }), {})
  );

  const handleQuantityChange = (type: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [type]: quantity }));
  };

  const handlePurchase = (
    selections: { type: string; price: number; quantity: number }[]
  ) => {
    console.log(`Purchasing for ${eventName}:`, selections);
    // Add actual purchase logic (e.g., API call)
    setQuantities(
      tickets.reduce((acc, ticket) => ({ ...acc, [ticket.type]: 0 }), {})
    );
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.ticketContainer}>
          <TicketHeader onClose={onClose} />
          <TicketList
            tickets={tickets}
            quantities={quantities}
            onQuantityChange={handleQuantityChange}
            onPurchase={handlePurchase}
            onNavigateToEvent={onNavigateToEvent}
            showEventButton={showEventButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  ticketContainer: {
    height: "80%",
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default TicketModal;
