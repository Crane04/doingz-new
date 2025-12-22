import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

// Define types for the hook's return value
interface PushNotificationHook {
  expoPushToken: Notifications.ExpoPushToken | null;
  notification: Notifications.Notification | null;
}

export const usePushNotifications = (): PushNotificationHook | void => {
  if (Platform.OS === "web") return;
  // Set up the notification handler with proper NotificationBehavior type
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: true,
      shouldShowBanner: true, // Add this property
      shouldShowList: true, // Add this property
    }),
  });

  const [expoPushToken, setExpoPushToken] =
    useState<Notifications.ExpoPushToken | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);

  const notificationListener = useRef<Notifications.EventSubscription>(null);
  const responseListener = useRef<Notifications.EventSubscription>(null);

  async function registerForPushNotificationsAsync(): Promise<
    Notifications.ExpoPushToken | undefined
  > {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId as string,
      });
    } else {
      console.log("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#800020",
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // Handle notification response if needed
        console.log("Notification response:", response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  console.log(expoPushToken);
  return {
    expoPushToken,
    notification,
  };
};
