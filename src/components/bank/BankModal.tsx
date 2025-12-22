import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "constants/colors";
import SearchBar from "./SearchBar";

interface Props {
  visible: boolean;
  onClose: () => void;
  banks: string[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedBank: string;
  onSelectBank: (bank: string) => void;
}

const BankModal: React.FC<Props> = ({
  visible,
  onClose,
  banks,
  loading,
  searchQuery,
  setSearchQuery,
  selectedBank,
  onSelectBank,
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Bank</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={COLORS.dark} />
          </TouchableOpacity>
        </View>

        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            data={banks}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.bankItem}
                onPress={() => onSelectBank(item)}
              >
                <Text style={styles.bankName}>{item}</Text>
                {selectedBank === item && (
                  <Ionicons name="checkmark" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  loaderContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  bankItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  bankName: {
    fontSize: 16,
    color: COLORS.dark,
  },
});

export default BankModal;
