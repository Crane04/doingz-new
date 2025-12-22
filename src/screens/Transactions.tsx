import React from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import Text from "elements/Text";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

interface Transaction {
  id: string;
  type: "fund" | "spray" | "ticket";
  amount: number;
  date: string;
  status: "success" | "pending" | "failed";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "fund",
    amount: 10000,
    date: "Sep 12, 2025",
    status: "success",
  },
  {
    id: "2",
    type: "spray",
    amount: -5000,
    date: "Sep 11, 2025",
    status: "success",
  },
  {
    id: "3",
    type: "ticket",
    amount: -2000,
    date: "Sep 10, 2025",
    status: "success",
  },
  {
    id: "4",
    type: "fund",
    amount: 5000,
    date: "Sep 9, 2025",
    status: "pending",
  },
  {
    id: "5",
    type: "spray",
    amount: -3000,
    date: "Sep 8, 2025",
    status: "failed",
  },
];

const Transactions: React.FC = () => {
  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={
              item.type === "fund"
                ? "add-circle-outline"
                : item.type === "spray"
                ? "send-outline"
                : "ticket-outline"
            }
            size={24}
            color={COLORS.secondary}
          />
        </View>
        <View>
          <Text style={styles.transactionType}>
            {item.type === "fund"
              ? "Funded Wallet"
              : item.type === "spray"
              ? "Sprayed Friend"
              : "Bought Ticket"}
          </Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            { color: item.amount > 0 ? COLORS.success : COLORS.danger },
          ]}
        >
          {item.amount > 0
            ? "+N" + item.amount.toLocaleString()
            : "N" + Math.abs(item.amount).toLocaleString()}
        </Text>
        <Text style={styles.transactionStatus}>
          {item.status === "success"
            ? "Completed"
            : item.status === "pending"
            ? "Pending"
            : "Failed"}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={mockTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  content: {
    marginTop: 20,
  },
  title: {
    color: COLORS.light,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 12,
  },
  transactionType: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "600",
  },
  transactionDate: {
    color: COLORS.lightGray,
    fontSize: 12,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transactionStatus: {
    color: COLORS.lightGray,
    fontSize: 12,
  },
});

export default Transactions;
