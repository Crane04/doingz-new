import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "./Home_";
import Profile from "./Profile";
import COLORS from "constants/colors";
import TabsHeader from "components/TabsHeader";
import { useUser } from "contexts/UserContext";
import { getUnreadNotificationCount } from "services/notificationService";
import { useIsFocused } from "@react-navigation/native";

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigation() {
  const { user } = useUser();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchNotifications = async () => {
      const count = await getUnreadNotificationCount();
      setUnreadCount(count);
    };

    fetchNotifications();
  }, [isFocused]); // refetch when the tab navigation becomes active

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.dark,
          borderTopColor: "transparent",
        },
        tabBarActiveTintColor: COLORS.primary,
        header: () => (
          <TabsHeader
            avatar={user?.profilePic || ""}
            username={user?.username || ""}
            notificationsCount={unreadCount}
          />
        ),
        tabBarInactiveTintColor: COLORS.gray,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
