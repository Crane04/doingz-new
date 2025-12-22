import { View } from "react-native";
import Button from "elements/Button";
import { ModalFooterProps } from "types/modal";
import { createEvent as styles } from "styles";
import React, { useRef } from "react";

const ModalFooter: React.FC<ModalFooterProps> = ({
  onClose,
  handleSubmit,
  closeText,
  disabled,
}) => {
  const isSubmitting = useRef(false);

  const onSubmit = () => {
    if (isSubmitting.current) return; // prevent double tap

    isSubmitting.current = true;
    handleSubmit();

    // release lock after 1 second
    setTimeout(() => {
      isSubmitting.current = false;
    }, 1000);
  };

  return (
    <View style={styles.footer}>
      <Button
        title="Cancel"
        onPress={onClose}
        variant="danger"
        style={styles.cancelButton}
      />

      <Button
        title={closeText}
        onPress={onSubmit}
        variant={disabled ? "lightGray" : "secondary"}
        textStyle={{ color: "#000" }}
        disabled={disabled}
      />
    </View>
  );
};

export default ModalFooter;
