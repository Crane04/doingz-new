import React, { useState } from "react";
import { View, Modal, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Input from "elements/Input";
import Button from "elements/Button";
import Text from "elements/Text";
import COLORS from "../../constants/colors";
import { useEvents } from "../../contexts/EventContext";
import {
  Ticket,
  TicketItemProps,
  ModalFooterProps,
  EventFormProps,
} from "types/event";
import { ModalProps } from "types/modal";
import ModalHeader from "../ModalHeader";
import IntentionSelector from "./IntentionSelector";
import { createEvent as styles } from "styles";
import TicketForm from "forms/TicketForm";

const TicketItem: React.FC<TicketItemProps> = ({
  item,
  index,
  handleRemoveTicket,
}) => (
  <View style={styles.ticketContainer}>
    <Text style={styles.ticketText}>
      {item.type} - ${item.price} (Max: {item.maxQuantity})
    </Text>
    <TouchableOpacity
      onPress={() => handleRemoveTicket(index)}
      style={styles.removeButton}
    >
      <MaterialIcons name="delete" size={20} color={COLORS.danger} />
    </TouchableOpacity>
  </View>
);

export default TicketItem;
