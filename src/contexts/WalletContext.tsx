// contexts/WalletContext.ts
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWallet } from "services/walletService";

interface WalletContextType {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  refreshWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [balance, setBalance] = useState(0);

  const loadWalletFromStorage = async () => {
    const stored = await AsyncStorage.getItem("walletBalance");
    if (stored) setBalance(Number(stored)); // ✅ restore
  };

  const saveWalletToStorage = async (newBalance: number) => {
    await AsyncStorage.setItem("walletBalance", String(newBalance));
  };

  const refreshWallet = async () => {
    const fetchedBalance = await fetchWallet();
    if (fetchedBalance === null) return; // ✅ do nothing if failed

    setBalance(fetchedBalance);
    await saveWalletToStorage(fetchedBalance);
  };

  useEffect(() => {
    loadWalletFromStorage(); // load cached balance first for fast UI
    refreshWallet(); // then fetch fresh balance
  }, []);

  return (
    <WalletContext.Provider value={{ balance, setBalance, refreshWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
