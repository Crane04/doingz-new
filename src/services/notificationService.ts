import { get } from "utils/api";

interface Notification {
  id: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

interface NotificationsResponse {
  message: string;
  data: Notification[];
  status: string;
}

export const getUnreadNotificationCount = async (): Promise<number> => {
  try {
    const response = await get<{
      message: string;
      data: { total: number; unread: number };
      status: string;
    }>("notifications/user/count");
    return response.data.data.unread;
  } catch (error) {
    console.error("Error fetching notification count:", error);
    return 0;
  }
};

export const getUserNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await get<NotificationsResponse>("notifications/user");
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};
