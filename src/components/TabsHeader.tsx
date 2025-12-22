import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  Animated,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Text from "elements/Text";
import NotificationsModal from "components/notifications/modal";
import { getUserNotifications } from "services/notificationService";
import COLORS from "constants/colors";
import { useWallet } from "contexts/WalletContext";
import { useEvents } from "contexts/EventContext";

interface TabsHeaderProps {
  username: string;
  avatar: string;
  notificationsCount: number;
}

const TabsHeader: React.FC<TabsHeaderProps> = ({
  username,
  avatar,
  notificationsCount,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { refreshWallet } = useWallet();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const { fetchEvents } = useEvents();

  const openModal = async () => {
    setShowModal(true);
    setLoading(true);
    const data = await getUserNotifications();
    setNotifications(data);
    setLoading(false);
  };

  const handleRefresh = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
    });

    refreshWallet();
    fetchEvents();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.avatarCont}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.fallbackPicture]}>
              <Text style={styles.fallbackText}>
                {username.split("")[0].toUpperCase()}
              </Text>
            </View>
          )}

          <Text style={styles.username}> Hey, {username}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={handleRefresh} style={styles.eyeButton}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Ionicons name="refresh-outline" size={26} color={COLORS.white} />
            </Animated.View>
          </Pressable>
          <TouchableOpacity onPress={openModal} style={styles.bellButton}>
            <MaterialIcons
              name="notifications"
              size={26}
              color={COLORS.white}
            />
            {notificationsCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationsCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <NotificationsModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        notifications={notifications}
        loading={loading}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.dark,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  username: {
    color: COLORS.light,
    fontSize: 18,
    fontWeight: "600",
  },
  bellButton: {
    // position: "relative",
    padding: 4,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  fallbackPicture: {
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: COLORS.light,
    fontSize: 25,
    fontWeight: 800,
  },
  eyeButton: { padding: 4 },
});

export default TabsHeader;
