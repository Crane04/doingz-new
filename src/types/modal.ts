interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

interface ModalFooterProps {
  onClose: () => void;
  handleSubmit: () => void;
  closeText: string;
  disabled?: boolean;
}

export type { ModalProps, ModalFooterProps };
