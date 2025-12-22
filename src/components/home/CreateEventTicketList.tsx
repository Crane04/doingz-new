import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "elements/Text";
import COLORS from "../../constants/colors";

interface Ticket {
  type: string;
  price: string;
  maxQuantity: string;
}

interface TicketListProps {
  tickets: Ticket[];
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  onEdit,
  onRemove,
}) => (
  <View style={styles.container}>
    <Text style={styles.sectionTitle}>Tickets</Text>
    <FlatList
      data={tickets}
      renderItem={({ item, index }) => (
        <View style={styles.ticketContainer}>
          <Text style={styles.ticketText}>
            {item.type} - ${item.price} (Max: {item.maxQuantity})
          </Text>
          <View style={styles.ticketActions}>
            <TouchableOpacity
              onPress={() => onEdit(index)}
              style={styles.actionButton}
            >
              <MaterialIcons name="edit" size={20} color={COLORS.secondary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onRemove(index)}
              style={styles.actionButton}
            >
              <MaterialIcons name="delete" size={20} color={COLORS.danger} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.listContent}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.light,
    marginVertical: 10,
  },
  ticketContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.gray,
    borderRadius: 8,
    marginVertical: 5,
  },
  ticketText: {
    flex: 1,
    color: COLORS.light,
    fontSize: 14,
  },
  ticketActions: {
    flexDirection: "row",
  },
  actionButton: {
    padding: 5,
  },
  listContent: {
    paddingBottom: 10,
  },
});

export default TicketList;
