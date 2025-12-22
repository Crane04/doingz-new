import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import server from "constants/server";
// const BASE_URL = "http://172.20.10.5:8000/api/"; // Customize as needed
const BASE_URL = `${server}/api/`; // Customize as needed

interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

// Generic API response type
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Configure Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("sessionToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Generic error handler
const handleError = (error: any): ApiError => {
  console.error(error);
  if (axios.isAxiosError(error)) {
    return {
      message:
        error.response?.data?.message || error.message || "Request failed",
      status: error.response?.status,
      data: error.response?.data,
    };
  }
  return { message: "An unexpected error occurred" };
};

// GET request
export const get = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(endpoint, config);
    return { data: response.data, status: response.status };
  } catch (error) {
    throw handleError(error);
  }
};

// POST request
export const post = async <T, D = any>(
  endpoint: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(
      endpoint,
      data,
      config
    );

    return { data: response.data, status: response.status };
  } catch (error) {
    throw handleError(error);
    // return { data: response.data, status: response.status };
  }
};

// PUT request
export const put = async <T, D = any>(
  endpoint: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.put(
      endpoint,
      data,
      config
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    throw handleError(error);
  }
};

// DELETE request
export const del = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.delete(endpoint, config);
    return { data: response.data, status: response.status };
  } catch (error) {
    throw handleError(error);
  }
};
