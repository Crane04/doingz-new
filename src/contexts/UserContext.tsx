// contexts/UserContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  login,
  logout,
  retrieveUser,
  setPushToken,
} from "services/authService";
import { usePushNotifications } from "hooks/usePushNotifications";
import { router } from "expo-router";

export interface User {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profilePic?: string;
  pushToken?: string;
  wallet?: {
    _id: string;
    balance: number;
    user: string;
  };
  authentication?: {
    sessionToken: string;
  };
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const push = usePushNotifications();
  const expoPushToken = push?.expoPushToken;
  const [user, setUser] = useState<User | null>(null);

  const saveUserToStorage = async (userData: User | null) => {
    if (userData) {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } else {
      await AsyncStorage.removeItem("user");
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await login(email, password);
      setUser(data);
      await saveUserToStorage(data);
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  };

  const signOut = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      router.push("/(auth)");
    }
  };

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchedUser = await retrieveUser();
    if (!fetchedUser) return;

    setUser(fetchedUser);
    await saveUserToStorage(fetchedUser);
  };

  // Load user once on app start
  useEffect(() => {
    loadUser();
  }, []);

  // ✅ Sync push token AFTER user + token are available
  useEffect(() => {
    const updatePushToken = async () => {
      if (!user) return;
      if (!expoPushToken?.data) return;

      console.log({ expoPushToken });

      if (expoPushToken.data !== user.pushToken) {
        await setPushToken(expoPushToken.data);

        const updated = { ...user, pushToken: expoPushToken.data };
        setUser(updated);
        await saveUserToStorage(updated);
      }
    };

    updatePushToken();
  }, [expoPushToken?.data, user]);

  return (
    <UserContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
