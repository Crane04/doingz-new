import Input from "elements/Input";
import Button from "elements/Button";
import Text from "elements/Text";
import { TicketFormProps } from "types/event";
import { createEvent as styles } from "styles";

const TicketForm: React.FC<TicketFormProps> = ({
  newTicket,
  setNewTicket,
  handleAddTicket,
  errors,
  ticketsLength,
}) => (
  <>
    <Text style={styles.sectionTitle}>Add Ticket</Text>
    <Input
      label="Ticket Type"
      value={newTicket.type}
      onChangeText={(text) => setNewTicket({ ...newTicket, type: text })}
      error={errors[`ticketType${ticketsLength}`]}
    />
    <Input
      label="Price ($)"
      value={newTicket.price}
      onChangeText={(text) => setNewTicket({ ...newTicket, price: text })}
      type="number"
      error={errors[`ticketPrice${ticketsLength}`]}
    />
    <Input
      label="Max Quantity"
      value={newTicket.maxQuantity}
      onChangeText={(text) => setNewTicket({ ...newTicket, maxQuantity: text })}
      type="number"
      error={errors[`ticketMaxQuantity${ticketsLength}`]}
    />
    <Button
      title="Add Ticket"
      onPress={handleAddTicket}
      variant="secondary"
      disabled={!newTicket.type || !newTicket.price || !newTicket.maxQuantity}
    />
  </>
);

export default TicketForm;
