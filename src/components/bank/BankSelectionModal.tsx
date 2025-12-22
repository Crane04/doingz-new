// components/BankSelectionModal.tsx
import React from "react";
import {
  Modal,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import Input from "elements/Input";
import ModalHeader from "components/ModalHeader";
import COLORS from "constants/colors";

interface BankSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  banks: string[];
  selectedBank: string;
  onBankSelect: (bank: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const BankSelectionModal: React.FC<BankSelectionModalProps> = ({
  visible,
  onClose,
  banks,
  selectedBank,
  onBankSelect,
  searchQuery,
  onSearchChange,
}) => {
  const filteredBanks = banks.filter((bank) =>
    bank.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalContent}>
          <ModalHeader text="Choose bank" onClose={onClose} />

          <View style={styles.searchContainer}>
            <Input
              placeholder="Search banks..."
              value={searchQuery}
              onChangeText={onSearchChange}
              style={styles.searchInput}
            />
          </View>

          <FlatList
            data={filteredBanks}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.bankItem}
                onPress={() => onBankSelect(item)}
              >
                <Text style={styles.bankName}>{item}</Text>
                {selectedBank === item && (
                  <Ionicons name="checkmark" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            )}
            style={styles.banksList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    // borderBottomColor: COLORS.darkGray,
  },
  searchInput: {
    // backgroundColor: COLORS.gray,
    // borderColor: COLORS.darkGray,
  },
  banksList: {
    maxHeight: 400,
  },
  bankItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
  bankName: {
    fontSize: 16,
    color: COLORS.light,
    flex: 1,
  },
});

export default BankSelectionModal;
