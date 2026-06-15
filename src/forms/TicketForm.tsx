import Input from "elements/Input";
import Button from "elements/Button";
import Text from "elements/Text";
import { createEvent as styles } from "styles";
import { useCreateEvent } from "contexts/CreateEventContext";

const TicketForm: React.FC = () => {
  const { state, setDraftTicket, addTicket } = useCreateEvent();
  const { draftTicket, errors, tickets } = state;
  const ticketIndex = tickets.length;

  return (
    <>
      <Text style={styles.sectionTitle}>Add Ticket</Text>
      <Input
        label="Ticket Type"
        value={draftTicket.type}
        onChangeText={(text) =>
          setDraftTicket({ ...draftTicket, type: text })
        }
        error={errors[`ticketType${ticketIndex}`]}
      />
      <Input
        label="Price ($)"
        value={draftTicket.price}
        onChangeText={(text) =>
          setDraftTicket({ ...draftTicket, price: text })
        }
        type="number"
        error={errors[`ticketPrice${ticketIndex}`]}
      />
      <Input
        label="Max Quantity"
        value={draftTicket.maxQuantity}
        onChangeText={(text) =>
          setDraftTicket({ ...draftTicket, maxQuantity: text })
        }
        type="number"
        error={errors[`ticketMaxQuantity${ticketIndex}`]}
      />
      <Button
        title="Add Ticket"
        onPress={addTicket}
        variant="secondary"
        disabled={
          !draftTicket.type || !draftTicket.price || !draftTicket.maxQuantity
        }
      />
    </>
  );
};

export default TicketForm;
