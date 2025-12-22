// components/home/FilterModal.tsx
import React, { useState } from "react";
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "elements/Text";
import Button from "elements/Button";
import COLORS from "constants/colors";
import { Input } from "elements";

export type FilterOptions = {
  intention: ("spray" | "tickets" | "both")[];
  sortBy: "newest" | "oldest" | "mostActive";
  location: string;
};

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const toggleIntention = (intention: "spray" | "tickets" | "both") => {
    setFilters((prev) => ({
      ...prev,
      intention: prev.intention.includes(intention)
        ? prev.intention.filter((i) => i !== intention)
        : [...prev.intention, intention],
    }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const resetFilters = () => {
    setFilters({
      intention: [],
      sortBy: "newest",
      location: "",
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={COLORS.light} />
          </TouchableOpacity>
          <Text weight="bold" style={styles.title}>
            Filters
          </Text>
          <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Intention Filter */}
          <View style={styles.section}>
            <Text weight="bold" style={styles.sectionTitle}>
              Event Type
            </Text>
            {(["spray", "tickets", "both"] as const).map((intention) => (
              <TouchableOpacity
                key={intention}
                style={[
                  styles.filterOption,
                  filters.intention.includes(intention) &&
                    styles.filterOptionSelected,
                ]}
                onPress={() => toggleIntention(intention)}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    filters.intention.includes(intention) &&
                      styles.filterOptionTextSelected,
                  ]}
                >
                  {intention.charAt(0).toUpperCase() + intention.slice(1)}
                </Text>
                {filters.intention.includes(intention) && (
                  <Ionicons name="checkmark" size={16} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Sort By */}
          <View style={styles.section}>
            <Text weight="bold" style={styles.sectionTitle}>
              Sort By
            </Text>
            {(["newest", "oldest", "mostActive"] as const).map((sortOption) => (
              <TouchableOpacity
                key={sortOption}
                style={[
                  styles.filterOption,
                  filters.sortBy === sortOption && styles.filterOptionSelected,
                ]}
                onPress={() =>
                  setFilters((prev) => ({ ...prev, sortBy: sortOption }))
                }
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    filters.sortBy === sortOption &&
                      styles.filterOptionTextSelected,
                  ]}
                >
                  {sortOption === "newest" && "Newest First"}
                  {sortOption === "oldest" && "Oldest First"}
                  {sortOption === "mostActive" && "Most Active"}
                </Text>
                {filters.sortBy === sortOption && (
                  <Ionicons name="checkmark" size={16} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Location Search */}
          <View style={styles.section}>
            <Text weight="bold" style={styles.sectionTitle}>
              Location
            </Text>
            <Input
              placeholder="Filter by location..."
              value={filters.location}
              onChangeText={(location) =>
                setFilters((prev) => ({ ...prev, location }))
              }
              style={styles.locationInput}
            />
          </View>
        </ScrollView>

        {/* Apply Button */}
        <View style={styles.footer}>
          <Button
            title="Apply Filters"
            onPress={applyFilters}
            variant="primary"
            style={styles.applyButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    color: COLORS.light,
    fontSize: 18,
  },
  resetButton: {
    padding: 4,
  },
  resetText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: COLORS.light,
    fontSize: 16,
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.gray,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
  },
  filterOptionSelected: {
    backgroundColor: `${COLORS.primary}20`,
    borderColor: COLORS.primary,
  },
  filterOptionText: {
    color: COLORS.light,
    fontSize: 14,
  },
  filterOptionTextSelected: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  locationInput: {
    backgroundColor: COLORS.gray,
    borderColor: COLORS.darkGray,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.darkGray,
  },
  applyButton: {
    borderRadius: 12,
  },
});

export default FilterModal;
