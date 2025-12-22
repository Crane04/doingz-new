import { post, get, put } from "../utils/api"; // adjust path if needed

export interface WithdrawalPayload {
  type: "event" | "personal";
  amount?: number;
  identifier?: string;
}

export interface Withdrawal {
  type: "event" | "personal";
  amount: number;
  identifier: string;
}

export const createWithdrawal = async (payload: WithdrawalPayload) => {
  return await post<{ message: string; data: Withdrawal }>(
    `withdrawal/${payload.type}`,
    payload
  );
};
