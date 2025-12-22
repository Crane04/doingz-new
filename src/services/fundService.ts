// services/walletService.ts
import { get, post } from "utils/api";

export interface Wallet {
  _id: string;
  user: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

interface WalletResponse {
  message: string;
  status: string;
  data: Wallet;
}

export const fetchWallet = async (): Promise<Wallet> => {
  const res = await get<WalletResponse>("wallet/get");

  if (res.data && res.data.status === "success") {
    return res.data.data;
  } else {
    throw new Error("Failed to fetch wallet");
  }
};



export const sprayFriend = async (eventId: string, amount: number) => {
  return post<{ message: string; data: { balance: number } }>(  
    `/wallet/spray`,
    { eventId, amount }
  );
};