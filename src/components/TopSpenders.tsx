import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import Text from "elements/Text";
import COLORS from "../constants/colors";

interface TopSpender {
  username: string;
  amount: number;
}

interface TopSpendersProps {
  topSpenders: TopSpender[];
}

const TopSpenders: React.FC<TopSpendersProps> = ({ topSpenders }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderTopSpender = ({
    item,
    index,
  }: {
    item: TopSpender;
    index: number;
  }) => (
    <View style={styles.spenderRow}>
      <Text style={styles.spenderRank}>{index + 1}.</Text>
      <Text style={styles.spenderUsername}>{item.username}</Text>
      <Text style={styles.spenderAmount}>
        🔥{item.amount.toLocaleString("en-NG")}
      </Text>
    </View>
  );

  return (
    <>
      {/* MAIN SUMMARY BOX */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <View style={styles.leaderboard}>
          <Text style={styles.leaderboardTitle}>Top Spenders</Text>
          <FlatList
            data={topSpenders.slice(0, 3)}
            renderItem={renderTopSpender}
            keyExtractor={(item) => item.username}
            contentContainerStyle={styles.leaderboardContent}
            scrollEnabled={false}
          />
        </View>
      </TouchableOpacity>

      {/* FULL OVERLAY MODAL */}
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>All Top Spenders</Text>

            <FlatList
              data={topSpenders}
              renderItem={renderTopSpender}
              keyExtractor={(item) => item.username}
              contentContainerStyle={{ paddingVertical: 10 }}
              showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  leaderboard: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    elevation: 2,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.light,
    marginBottom: 12,
  },
  leaderboardContent: {
    gap: 8,
  },
  spenderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  spenderRank: {
    width: 30,
    fontSize: 16,
    color: COLORS.light,
    fontWeight: "600",
  },
  spenderUsername: {
    flex: 1,
    fontSize: 16,
    color: COLORS.light,
  },
  spenderAmount: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: "600",
  },

  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalBox: {
    backgroundColor: COLORS.gray,
    borderRadius: 16,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.light,
    marginBottom: 12,
  },
  closeButton: {
    marginTop: 14,
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    borderRadius: 12,
  },
  closeButtonText: {
    color: COLORS.dark,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default TopSpenders;
