// screens/EditBankDetails.tsx
import React, { useEffect, useReducer } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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

interface EditBankState {
  bankDetails: BankDetails;
  errors: { [key: string]: string };
  loading: boolean;
  success: string;
  showBankModal: boolean;
  banks: string[];
  searchQuery: string;
}

type EditBankAction =
  | { type: "SET_BANK_DETAILS"; bankDetails: BankDetails }
  | { type: "SET_FIELD"; field: keyof BankDetails; value: string }
  | { type: "SET_ERRORS"; errors: { [key: string]: string } }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_SUCCESS"; success: string }
  | { type: "SET_BANKS"; banks: string[] }
  | { type: "OPEN_BANK_MODAL" }
  | { type: "CLOSE_BANK_MODAL" }
  | { type: "SET_SEARCH_QUERY"; searchQuery: string }
  | { type: "SELECT_BANK"; bank: string };

const initialState: EditBankState = {
  bankDetails: {
    bank_name: "",
    acct_number: "",
    acct_name: "",
  },
  errors: {},
  loading: false,
  success: "",
  showBankModal: false,
  banks: [],
  searchQuery: "",
};

const editBankReducer = (
  state: EditBankState,
  action: EditBankAction
): EditBankState => {
  switch (action.type) {
    case "SET_BANK_DETAILS":
      return { ...state, bankDetails: action.bankDetails };
    case "SET_FIELD":
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          [action.field]: action.value,
        },
        errors: { ...state.errors, [action.field]: "" },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_SUCCESS":
      return { ...state, success: action.success };
    case "SET_BANKS":
      return { ...state, banks: action.banks };
    case "OPEN_BANK_MODAL":
      return { ...state, showBankModal: true };
    case "CLOSE_BANK_MODAL":
      return { ...state, showBankModal: false, searchQuery: "" };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.searchQuery };
    case "SELECT_BANK":
      return {
        ...state,
        bankDetails: { ...state.bankDetails, bank_name: action.bank },
        errors: { ...state.errors, bank_name: "" },
        showBankModal: false,
        searchQuery: "",
      };
    default:
      return state;
  }
};

const validateBankDetails = (bankDetails: BankDetails) => {
  const errors: { [key: string]: string } = {};

  if (!bankDetails.bank_name.trim()) {
    errors.bank_name = "Bank name is required";
  }

  if (!bankDetails.acct_number.trim()) {
    errors.acct_number = "Account number is required";
  } else if (!/^\d{10}$/.test(bankDetails.acct_number)) {
    errors.acct_number = "Account number must be 10 digits";
  }

  if (!bankDetails.acct_name.trim()) {
    errors.acct_name = "Account name is required";
  }

  return errors;
};

const EditBankDetails: React.FC = () => {
  const [state, dispatch] = useReducer(editBankReducer, initialState);
  const {
    bankDetails,
    banks,
    errors,
    loading,
    searchQuery,
    showBankModal,
    success,
  } = state;

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const bankDetailsResponse = await getBankDetails();
        if (
          bankDetailsResponse.status === "success" &&
          bankDetailsResponse.data
        ) {
          dispatch({
            type: "SET_BANK_DETAILS",
            bankDetails: bankDetailsResponse.data,
          });
        }

        const banksResponse = await getBanks();
        if (banksResponse) {
          dispatch({ type: "SET_BANKS", banks: banksResponse });
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
        dispatch({
          type: "SET_ERRORS",
          errors: { submit: "Failed to load data" },
        });
      }
    };

    loadInitialData();
  }, []);

  const handleSubmit = async () => {
    const validationErrors = validateBankDetails(bankDetails);
    dispatch({ type: "SET_ERRORS", errors: validationErrors });
    if (Object.keys(validationErrors).length > 0) return;

    dispatch({ type: "SET_LOADING", loading: true });
    dispatch({ type: "SET_SUCCESS", success: "" });

    try {
      const response = await updateBankDetails(bankDetails);

      if (response.status === "success") {
        dispatch({
          type: "SET_SUCCESS",
          success: "Bank details updated successfully!",
        });
        dispatch({ type: "SET_ERRORS", errors: {} });
      } else {
        dispatch({
          type: "SET_ERRORS",
          errors: {
            submit: response.message || "Failed to update bank details",
          },
        });
      }
    } catch (error) {
      console.error("Error updating bank details:", error);
      dispatch({
        type: "SET_ERRORS",
        errors: { submit: "Failed to update bank details" },
      });
    } finally {
      dispatch({ type: "SET_LOADING", loading: false });
    }
  };

  const handleBankSelect = (bank: string) => {
    dispatch({ type: "SELECT_BANK", bank });
  };

  const handleCloseModal = () => {
    dispatch({ type: "CLOSE_BANK_MODAL" });
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
            onPress={() => dispatch({ type: "OPEN_BANK_MODAL" })}
            error={errors.bank_name}
          />

          {/* Account Number */}
          <Input
            label="Account Number"
            placeholder="Enter 10-digit account number"
            value={bankDetails.acct_number}
            onChangeText={(text) =>
              dispatch({
                type: "SET_FIELD",
                field: "acct_number",
                value: text.replace(/[^0-9]/g, ""),
              })
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
              dispatch({
                type: "SET_FIELD",
                field: "acct_name",
                value: text,
              })
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
        onSearchChange={(value) =>
          dispatch({ type: "SET_SEARCH_QUERY", searchQuery: value })
        }
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
