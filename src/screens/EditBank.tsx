// screens/EditBankDetails.tsx
import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Container from "components/TabContainer";
import Text from "elements/Text";
import Input from "elements/Input";
import Button from "elements/Button";
import BankSelector from "components/bank/BankSelector";
import BankSelectionModal from "components/bank/BankSelectionModal";
import StatusCard from "components/bank/StatusCard";
import COLORS from "constants/colors";
import {
  BankDetails,
  updateBankDetails,
  getBankDetails,
  getBanks,
} from "services/bankService";
import Header from "components/Header";

const EditBankDetails: React.FC = () => {
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bank_name: "",
    acct_number: "",
    acct_name: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showBankModal, setShowBankModal] = useState(false);
  const [banks, setBanks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load bank details
        const bankDetailsResponse = await getBankDetails();
        if (
          bankDetailsResponse.status === "success" &&
          bankDetailsResponse.data
        ) {
          setBankDetails(bankDetailsResponse.data);
        }

        // Load banks list
        const banksResponse = await getBanks();
        if (banksResponse) {
          setBanks(banksResponse);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
        setErrors({ submit: "Failed to load data" });
      }
    };

    loadInitialData();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!bankDetails.bank_name.trim()) {
      newErrors.bank_name = "Bank name is required";
    }

    if (!bankDetails.acct_number.trim()) {
      newErrors.acct_number = "Account number is required";
    } else if (!/^\d{10}$/.test(bankDetails.acct_number)) {
      newErrors.acct_number = "Account number must be 10 digits";
    }

    if (!bankDetails.acct_name.trim()) {
      newErrors.acct_name = "Account name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setSuccess("");

    try {
      const response = await updateBankDetails(bankDetails);

      if (response.status === "success") {
        setSuccess("Bank details updated successfully!");
        setErrors({});
      } else {
        setErrors({
          submit: response.message || "Failed to update bank details",
        });
      }
    } catch (error) {
      console.error("Error updating bank details:", error);
      setErrors({ submit: "Failed to update bank details" });
    } finally {
      setLoading(false);
    }
  };

  const handleBankSelect = (bank: string) => {
    setBankDetails((prev) => ({ ...prev, bank_name: bank }));
    setShowBankModal(false);
    setSearchQuery("");
  };

  const handleCloseModal = () => {
    setShowBankModal(false);
    setSearchQuery("");
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Header title="Edit Bank Details" />
        <View style={styles.header}>
          <Text weight="bold" style={styles.title}>
            Bank Details
          </Text>
          <Text style={styles.subtitle}>
            Update your bank account information for withdrawals
          </Text>
        </View>
        <View style={styles.form}>
          {/* Bank Name Dropdown */}
          <BankSelector
            label="Bank Name"
            selectedBank={bankDetails.bank_name}
            onPress={() => setShowBankModal(true)}
            error={errors.bank_name}
          />

          {/* Account Number */}
          <Input
            label="Account Number"
            placeholder="Enter 10-digit account number"
            value={bankDetails.acct_number}
            onChangeText={(text) =>
              setBankDetails((prev) => ({
                ...prev,
                acct_number: text.replace(/[^0-9]/g, ""),
              }))
            }
            error={errors.acct_number}
            keyboardType="numeric"
            maxLength={10}
          />

          {/* Account Name */}
          <Input
            label="Account Name"
            placeholder="Enter account name as it appears on bank statement"
            value={bankDetails.acct_name}
            onChangeText={(text) =>
              setBankDetails((prev) => ({ ...prev, acct_name: text }))
            }
            error={errors.acct_name}
            autoCapitalize="words"
          />

          {/* Error Message */}
          {errors.submit && (
            <StatusCard
              type="error"
              message={errors.submit}
              iconName="warning"
            />
          )}

          {/* Success Message */}
          {success && (
            <StatusCard
              type="success"
              message={success}
              iconName="checkmark-circle"
            />
          )}

          {/* Submit Button */}
          <Button
            title={loading ? "Updating..." : "Save Bank Details"}
            onPress={handleSubmit}
            variant="primary"
            disabled={loading}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>

      <BankSelectionModal
        visible={showBankModal}
        onClose={handleCloseModal}
        banks={banks}
        selectedBank={bankDetails.bank_name}
        onBankSelect={handleBankSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
    paddingVertical: 20,
  },
  header: {
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    color: COLORS.light,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.lightGray,
  },
  form: {
    gap: 20,
  },
  submitButton: {
    marginTop: 10,
  },
});

export default EditBankDetails;
