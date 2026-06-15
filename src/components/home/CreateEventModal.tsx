import React from "react";
import { View, Modal, FlatList, Platform } from "react-native";
import Text from "elements/Text";
import { ModalProps } from "types/modal";
import ModalHeader from "../ModalHeader";
import { createEvent as styles } from "styles";
import TicketForm from "forms/TicketForm";
import TicketItem from "./CreateTicketItem";
import ModalFooter from "../ModalFooter";
import EventForm from "forms/EventForm";
import { KeyboardAvoidingView } from "react-native";
import {
  CreateEventProvider,
  useCreateEvent,
} from "contexts/CreateEventContext";

const CreateEventModalContent: React.FC<{ visible: boolean }> = ({ visible }) => {
  const { state, close, submit } = useCreateEvent();
  const { errors, intention, loading, success, tickets } = state;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={close}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalContainer}>
          <View style={styles.eventContainer}>
            <ModalHeader onClose={close} text={"Create Event"} />

            <FlatList
              data={[
                { key: "form" },
                ...tickets.map((_, i) => ({ key: `ticket${i}` })),
              ]}
              renderItem={({ item, index }) => {
                if (item.key === "form") {
                  return (
                    <>
                      <EventForm />

                      {errors.tickets && (
                        <Text style={styles.error}>{errors.tickets}</Text>
                      )}

                      {intention !== "spray" && (
                        <View style={styles.content}>
                          <TicketForm />
                        </View>
                      )}
                    </>
                  );
                }
                return (
                  <TicketItem
                    item={tickets[index - 1]}
                    index={index - 1}
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
              onClose={close}
              handleSubmit={submit}
              closeText={loading ? "Creating Event..." : "Create Event"}
              disabled={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const CreateEventModal: React.FC<ModalProps> = ({ visible, onClose }) => (
  <CreateEventProvider onClose={onClose}>
    <CreateEventModalContent visible={visible} />
  </CreateEventProvider>
);

export default CreateEventModal;
