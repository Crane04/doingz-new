import { get, post } from "utils/api";
import { ApiResponse } from "./authService";

interface WalletData {
  balance: number;
}

interface WalletResponse {
  status: number;
  message: string;
  data?: WalletData;
}

interface FundWalletResponse {
  status: number;
  message: string;
  data?: {
    authorization_url: string;
  };
}
export const fetchWallet = async (): Promise<number | null> => {
  try {
    const response: ApiResponse<WalletResponse> = await get("wallet/get");

    if (response.status === 200 && response.data?.data) {
      return response.data.data.balance;
    }

    return null; // ✅ instead of 0
  } catch (err) {
    console.error("Failed to fetch wallet:", err);
    return null; // ✅ instead of 0
  }
};

export const fundWallet = async (
  amount: number,
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
  hidden: boolean
): Promise<{ authorization_url?: string; autoCredit?: boolean }> => {
  try {
    const response: ApiResponse<FundWalletResponse> = await post(
      "/wallet/fund",
      { amount, hidden }
    );

    if (response.status === 200 && response.data.data) {
      return response.data.data;
    }
    throw new Error("No authorization URL returned");
  } catch (err: any) {
    setErrors({ submit: err.message || "Failed to initiate funding" });
    throw err;
  }
};
