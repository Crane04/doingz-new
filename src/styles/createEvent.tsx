import { StyleSheet } from "react-native";
import COLORS from "constants/colors";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000000,
  },
  eventContainer: {
    height: "80%",
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 20,

    color: COLORS.light,
  },
  content: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,

    color: COLORS.light,
    marginVertical: 10,
  },
  intentionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  intentionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: COLORS.darkGray,
    alignItems: "center",
    marginHorizontal: 5,
  },
  activeIntention: {
    backgroundColor: COLORS.secondary,
  },
  intentionText: {
    color: COLORS.light,
    fontSize: 14,
  },
  ticketContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: COLORS.gray,
    borderRadius: 8,
    marginVertical: 5,
  },
  ticketText: {
    flex: 1,
    color: COLORS.light,
    fontSize: 14,
  },
  removeButton: {
    padding: 5,
  },
  error: {
    fontSize: 12,
    color: COLORS.danger,
    marginBottom: 10,
  },
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
  listContent: {
    paddingBottom: 10,
  },
});

export default styles;
