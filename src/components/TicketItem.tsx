import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Text from "elements/Text";
import { MaterialIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

interface Ticket {
  type: string;
  price: number;
  maxQuantity?: number;
}

interface TicketItemProps {
  ticket: Ticket;
  quantity: number;
  onQuantityChange: (type: string, quantity: number) => void;
}

const TicketItem: React.FC<TicketItemProps> = ({
  ticket,
  quantity,
  onQuantityChange,
}) => {
  const maxQuantity = ticket.maxQuantity || 10;

  const handleIncrement = () => {
    onQuantityChange(ticket.type, Math.min(quantity + 1, maxQuantity));
  };

  const handleDecrement = () => {
    onQuantityChange(ticket.type, Math.max(quantity - 1, 0));
  };

  return (
    <View style={styles.ticketContainer}>
      <View style={styles.ticketInfo}>
        <Text style={styles.ticketType}>{ticket.type} Ticket</Text>
        <Text style={styles.ticketPrice}>N{ticket.price} each</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={[
            styles.quantityButton,
            quantity === 0 && styles.disabledButton,
          ]}
          onPress={handleDecrement}
          disabled={quantity === 0}
        >
          <MaterialIcons
            name="remove"
            size={20}
            color={quantity === 0 ? COLORS.lightGray : COLORS.light}
          />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={[
            styles.quantityButton,
            quantity === maxQuantity && styles.disabledButton,
          ]}
          onPress={handleIncrement}
          disabled={quantity === maxQuantity}
        >
          <MaterialIcons
            name="add"
            size={20}
            color={quantity === maxQuantity ? COLORS.lightGray : COLORS.light}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ticketContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    elevation: 3,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketType: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.light,
  },
  ticketPrice: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: COLORS.darkGray,
    padding: 8,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantityText: {
    fontSize: 16,
    color: COLORS.light,
    marginHorizontal: 10,
    fontWeight: "600",
  },
});

export default TicketItem;
