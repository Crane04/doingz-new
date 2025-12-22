import React, { createContext, useContext, useState, useEffect } from "react";
import { get } from "utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appversion from "constants/version";

interface Version {
  _id: string;
  name: string;
  hidden: boolean;
  createdAt: string;
  updatedAt: string;
}

interface VersionContextType {
  version: Version | null;
  refreshVersion: () => Promise<void>;
  loading: boolean;
}

const VersionContext = createContext<VersionContextType>({
  version: null,
  refreshVersion: async () => {},
  loading: true,
});

export const VersionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [version, setVersion] = useState<Version | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshVersion = async () => {
    try {
      setLoading(true);

      // Fetch version from backend
      const response = await get<{ data: Version }>(`/version/${appversion}`);

      if (response?.data?.data) {
        const latestVersion = response.data.data;

        setVersion(latestVersion);
        await AsyncStorage.setItem("appVersion", JSON.stringify(latestVersion));
      }
    } catch (error) {
      console.warn("Version fetch failed:", error);

      // Fallback to stored version
      const stored = await AsyncStorage.getItem("appVersion");
      if (stored) setVersion(JSON.parse(stored));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshVersion();
  }, []);

  return (
    <VersionContext.Provider value={{ version, refreshVersion, loading }}>
      {children}
    </VersionContext.Provider>
  );
};

export const useVersion = () => useContext(VersionContext);
