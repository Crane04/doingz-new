import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Share2, Heart } from "lucide-react-native";
import COLORS from "../constants/colors";

interface EventIconsProps {
  liked: boolean;
  onShare: () => void;
  onToggleLike: () => void;
}

const EventIcons: React.FC<EventIconsProps> = ({
  liked,
  onShare,
  onToggleLike,
}) => (
  <View style={styles.iconRow}>
    <TouchableOpacity onPress={onShare} hitSlop={8} style={styles.iconBtn}>
      <Share2 size={20} color={COLORS.light} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onToggleLike} hitSlop={8} style={styles.iconBtn}>
      <Heart
        size={20}
        color={liked ? COLORS.danger : COLORS.light}
        fill={liked ? COLORS.danger : "transparent"}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  iconRow: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
  },
  iconBtn: {
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 6,
    borderRadius: 999,
    marginLeft: 10,
  },
});

export default EventIcons;
