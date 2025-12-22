import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import TicketItem from "./TicketItem";
import Text from "elements/Text";
import COLORS from "../constants/colors";

interface Ticket {
  type: string;
  price: number;
  maxQuantity?: number;
}

interface TicketListProps {
  tickets: Ticket[];
  quantities: { [key: string]: number };
  onQuantityChange: (type: string, quantity: number) => void;
  onPurchase: (
    selections: { type: string; price: number; quantity: number }[]
  ) => void;
  onNavigateToEvent?: () => void; // Optional for "both" intention
  showEventButton: boolean; // Controls "Go to Event Room" button visibility
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  quantities,
  onQuantityChange,
  onPurchase,
  onNavigateToEvent,
  showEventButton,
}) => {
  const totalQuantity = Object.values(quantities).reduce(
    (sum, qty) => sum + qty,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Select Ticket Type</Text>
      <FlatList
        data={tickets}
        renderItem={({ item }) => (
          <TicketItem
            ticket={item}
            quantity={quantities[item.type] || 0}
            onQuantityChange={onQuantityChange}
          />
        )}
        keyExtractor={(item) => item.type}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttonContainer}>
        {showEventButton && (
          <TouchableOpacity
            style={styles.eventButton}
            onPress={onNavigateToEvent}
          >
            <Text style={styles.eventButtonText}>Go to Event Room</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.purchaseButton,
            totalQuantity === 0 && styles.disabledButton,
          ]}
          onPress={() => {
            const selections = tickets
              .filter((ticket) => quantities[ticket.type] > 0)
              .map((ticket) => ({
                type: ticket.type,
                price: ticket.price,
                quantity: quantities[ticket.type],
              }));
            onPurchase(selections);
          }}
          disabled={totalQuantity === 0}
        >
          <Text style={styles.purchaseButtonText}>
            Purchase{" "}
            {totalQuantity > 0
              ? `(${totalQuantity} Ticket${totalQuantity > 1 ? "s" : ""})`
              : ""}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.light,
    marginVertical: 10,
  },
  listContent: {
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  purchaseButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    marginLeft: 5,
    elevation: 3,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  eventButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
    elevation: 3,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  disabledButton: {
    backgroundColor: COLORS.lightGray,
    opacity: 0.5,
  },
  purchaseButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  eventButtonText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TicketList;
