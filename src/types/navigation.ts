import type { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  Prelog: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  SavedEvents: undefined;
  SavedCreatedEvents: undefined;
  MyEvents: undefined;
  ChangePassword: undefined;
  Transactions: undefined;
  EditProfile: undefined;
  EditBank: undefined;
  Settings: undefined;
  Event: { id: string } | undefined;
  Friend: { id: string } | undefined;
  ManageEvent: { id: string } | undefined;
};

export type AppNavigationProp = NavigationProp<RootStackParamList>;
