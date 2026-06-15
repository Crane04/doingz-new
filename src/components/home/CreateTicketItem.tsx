import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "../../constants/colors";
import { Ticket } from "types/event";
import { createEvent as styles } from "styles";
import { useCreateEvent } from "contexts/CreateEventContext";

interface CreateTicketItemProps {
  item: Ticket;
  index: number;
}

const TicketItem: React.FC<CreateTicketItemProps> = ({ item, index }) => {
  const { removeTicket } = useCreateEvent();

  return (
    <View style={styles.ticketContainer}>
      <Text style={styles.ticketText}>
        {item.type} - ${item.price} (Max: {item.maxQuantity})
      </Text>
      <TouchableOpacity
        onPress={() => removeTicket(index)}
        style={styles.removeButton}
      >
        <MaterialIcons name="delete" size={20} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );
};

export default TicketItem;
