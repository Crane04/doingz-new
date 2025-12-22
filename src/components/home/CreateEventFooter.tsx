import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "elements/Button";
import COLORS from "constants/colors";

interface CreateEventFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
}

const CreateEventFooter: React.FC<CreateEventFooterProps> = ({
  onCancel,
  onSubmit,
}) => (
  <View style={styles.footer}>
    <Button
      title="Cancel"
      onPress={onCancel}
      variant="danger"
      style={styles.cancelButton}
    />
    <Button
      title="Create Event"
      onPress={onSubmit}
      variant="primary"
      style={styles.submitButton}
    />
  </View>
);

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
  cancelButton: {
    flex: 1,
    marginRight: 5,
  },
  submitButton: {
    flex: 1,
    marginLeft: 5,
  },
});

export default CreateEventFooter;
