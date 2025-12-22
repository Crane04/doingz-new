import { useNavigation as useReactNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "../types/navigation";

export function useNavigation() {
  const navigation = useReactNavigation<AppNavigationProp>();

  return {
    navigate: navigation.navigate,
    goBack: navigation.goBack,
    reset: navigation.reset,
  };
}
