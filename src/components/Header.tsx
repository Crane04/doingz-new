// src/components/Header.tsx
import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";
import { router, usePathname, useLocalSearchParams } from "expo-router"; // Expo Router only
import Text from "elements/Text";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import COLORS from "constants/colors";

type HeaderProps = {
  title: string;
  onMenuPress?: () => void;
  route?: any;
};

const Header: React.FC<HeaderProps> = ({ title, onMenuPress }) => {
  const pathname = usePathname(); // replaces useRoute().name
  const params = useLocalSearchParams(); // replaces route.params
  const canGoBack = router.canGoBack(); // safe back check

  // Your exact original logic
  const displayTitle =
    pathname.includes("/event/") || pathname.includes("/friend/")
      ? (params.name as string) || title
      : title;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {/* Back Button — uses router.back() → URL updates correctly */}
        {
          <TouchableOpacity
            onPress={() => {
              if (canGoBack) {
                router.back();
              } else {
                router.replace("/"); // or router.push("/index")
              }
            }} // This is the correct way
            style={styles.backButton}
          >
            <MaterialIcons
              name="keyboard-backspace"
              size={24}
              color={COLORS.dark}
            />
          </TouchableOpacity>
        }

        <Text style={styles.title}>{displayTitle}</Text>
      </View>

      {/* More menu — only on Event */}
      {pathname.includes("/event/") && onMenuPress && (
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color={COLORS.light} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: COLORS.dark,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    borderRadius: 5,
    backgroundColor: COLORS.light,
    padding: 2,
    marginRight: 8,
  },
  title: {
    fontSize: 18,

    color: COLORS.light,
  },
  menuButton: {
    padding: 4,
  },
});

export default Header;
