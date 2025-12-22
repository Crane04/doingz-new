import { post, get, put } from "utils/api";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// What the backend sends on login
interface LoginResponse {
  status: "success" | "error";
  message: string;
  data: User; // <-- the actual user object inside `data.data`
}

// User object
interface User {
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

// Add validation function for iOS
const validateUserData = (data: any): User => {
  // iOS-specific: Ensure all fields are proper types
  const validatedData: User = {
    _id: String(data._id),
    fullname: String(data.fullname),
    username: String(data.username),
    email: String(data.email),
    createdAt: String(data.createdAt),
    updatedAt: String(data.updatedAt),
    profilePic: data.profilePic ? String(data.profilePic) : undefined,
  };

  // Handle wallet separately with type validation
  if (data.wallet) {
    validatedData.wallet = {
      _id: String(data.wallet._id),
      balance: Number(data.wallet.balance) || 0,
      user: String(data.wallet.user),
    };
  }

  return validatedData;
};

export const login = async (
  email: string,
  password: string
): Promise<{ data: User }> => {
  const response = await post<LoginResponse>("users/login", {
    email,
    password,
  });

  if (!response?.data) {
    throw new Error("No response data received");
  }

  const loginResponse = response.data;

  if (loginResponse.status !== "success" || !loginResponse.data) {
    throw new Error(loginResponse.message || "Login failed");
  }

  // Validate and clean the user data, especially for iOS
  const validatedUser = validateUserData(loginResponse.data);

  const token = loginResponse.data.authentication?.sessionToken;
  if (token) {
    await AsyncStorage.setItem("sessionToken", token);
    console.log("Session Token stored:", token);
  } else {
    console.warn("No session token found in response");
  }

  return { data: validatedUser };
};

// A generic wrapper for axios responses
export interface ApiResponse<T> {
  data: T; // backend payload
  status: number; // http status
}

interface AuthResponse {
  status: "success" | "error";
  message: string;
  data?: User; // only present when success
}

export type SignupPayload = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};

export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const response: ApiResponse<AuthResponse> = await post(
    "users/register",
    payload
  );

  // Validate user data if present
  if (response.data.data) {
    response.data.data = validateUserData(response.data.data);
  }

  return response.data;
};

interface RetrieveResponse {
  status: "success" | "error";
  message: string;
  data?: User;
}

export const retrieveUser = async (): Promise<User | null> => {
  try {
    const response: ApiResponse<RetrieveResponse> = await get("users/retrieve");

    if (response.data.status === "success" && response.data.data) {
      // Validate user data for iOS
      return validateUserData(response.data.data);
    }

    return null;
  } catch (err) {
    return null;
  }
};

export const logout = async (): Promise<void> => {
  await post<ApiResponse<null>>("users/logout", {});
};

interface UpdateProfileData {
  username: string;
  email: string;
  fullname: string;
}

interface UpdateResponse {
  status: "success" | "error";
  message: string;
  data: User;
}

export const updateProfile = async (
  data: UpdateProfileData,
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
  setUser: (user: User) => void,
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
  try {
    const response = await put<UpdateResponse, UpdateProfileData>(
      "users/update",
      data
    );

    const user = validateUserData(response.data.data); // Validate for iOS
    setUser(user);
    setSuccess("Profile updated successfully ✅");
  } catch (error: any) {
    setErrors({ submit: error.message || "Failed to update profile" });
    throw error;
  }
};

export const updateProfilePic = async (
  image: string | File,
  setUser: (user: User) => void
): Promise<void> => {
  try {
    const formData = new FormData();

    if (typeof image === "string") {
      // Mobile: URI object
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "profile.jpg",
      } as any);
    } else {
      console.log("here");
      formData.append("image", image);
    }

    const response = await put<UpdateResponse, FormData>(
      "users/update-pic",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const user = validateUserData(response.data.data);
    setUser(user);
    alert("Profile picture updated successfully");
  } catch (error: any) {
    console.error("Upload failed:", error);
    alert(error.message || "Failed to update profile picture");
    throw error;
  }
};
type SearchUserResult = { user: User | null; error?: string };

export const searchUser = async (
  username: string
): Promise<SearchUserResult> => {
  try {
    const response: ApiResponse<RetrieveResponse> = await get(
      `users/search?username=${username}`
    );

    if (response.data.status === "success" && response.data.data) {
      return { user: validateUserData(response.data.data) };
    }

    // Backend returned failure
    return { user: null, error: response.data.message || "User not found" };
  } catch (err: any) {
    // Catch network or unexpected errors
    const message =
      err?.response?.data?.message || err?.message || "Something went wrong";
    return { user: null, error: message };
  }
};


interface ForgotPasswordResponse {
  status: "success" | "error";
  message: string;
}

export const requestPasswordReset = async (
  email: string
): Promise<ForgotPasswordResponse> => {
  try {
    const response: ApiResponse<ForgotPasswordResponse> = await post(
      "users/forgot-pass",
      { email }
    );

    return response.data;
  } catch (error: any) {
    return {
      status: "error",
      message: error.message || "Failed to send password reset code",
    };
  }
};

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  data: {
    message: string;
  };
}

export const changePassword = async (
  data: ChangePasswordData,
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
  try {
    const response = await put<ChangePasswordResponse, ChangePasswordData>(
      "users/change-pass",
      data
    );

    setSuccess("Password changed successfully ✅");
  } catch (error: any) {
    setErrors({ submit: error.message || "Failed to change password" });
    throw error;
  }
};

interface PushTokenData {
  pushToken: string;
}

export const setPushToken = async (token: string): Promise<void> => {
  try {
    const response = await put<any, PushTokenData>("users/update", {
      pushToken: token,
    });
    console.log(response);
  } catch (error: any) {
    console.error(error);
  }
};

export type { User };
