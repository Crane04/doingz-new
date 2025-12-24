import { EventProvider } from "contexts/EventContext";
import Home from "./Home";
import { useWallet } from "contexts/WalletContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

const Home_ = () => {
  const { refreshWallet } = useWallet();

  useFocusEffect(
    useCallback(() => {
      refreshWallet();
    }, [refreshWallet])
  );

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active") {
        refreshWallet();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => subscription.remove();
  }, [refreshWallet]);

  return <Home />;
};

export default Home_;
