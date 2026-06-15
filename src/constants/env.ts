const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const API_BASE_URL = trimTrailingSlash(
  process.env.EXPO_PUBLIC_API_URL || "https://api.doingz.shop"
);
