import { post, get, put } from "utils/api";
export interface BankDetails {
  bank_name: string;
  acct_number: string;
  acct_name: string;
}

export interface BankResponse {
  status: string;
  message: string;
  data?: BankDetails;
}

export const updateBankDetails = async (
  bankDetails: BankDetails
): Promise<BankResponse> => {
  const response = await put<BankResponse>("bank/update", bankDetails);
  return response.data;
};

export const getBankDetails = async (): Promise<BankResponse> => {
  const response = await get<BankResponse>("bank/");
  return response.data;
};

interface BanksResponse {
  message: string;
  data: string[];
}

export const getBanks = async (): Promise<string[]> => {
  const response = await get<BanksResponse>("bank/available");
  return response.data.data; // ✅ access nested data correctly
};
