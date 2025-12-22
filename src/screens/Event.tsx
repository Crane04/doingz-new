import React, { useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import MessageIcon from "components/MessageIcon";
import ChatModal from "components/ChatModal";
import TopSpenders from "components/TopSpenders";
import BalanceDisplay from "components/BalanceDisplay";
import SwipeSection from "components/SwipeSection";
import AmountSelector from "components/AmountSelector";
import COLORS from "../constants/colors";
import { useEvent } from "../hooks/useEvent";
import Loading from "components/common/Loading";
import { useVersion } from "contexts/VersionContext";
import Header from "components/Header";

const Event: React.FC = () => {
  const {
    event,
    loading,
    isChatOpen,
    sprays,
    selectedAmount,
    amountError,
    topSpenders,
    balance,
    messages,
    handleSendMessage,

    // Setters
    setSelectedAmount,
    setAmountError,
    setSprays,

    // Event handlers
    handleSwipe,
    openChat,
    closeChat,
  } = useEvent("event");
  const { version } = useVersion();

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    // Only block scroll when user is actively touching
    const handleTouchStart = () => {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      window.addEventListener("touchmove", preventScroll, { passive: false });
    };

    const handleTouchEnd = () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      window.removeEventListener("touchmove", preventScroll);
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  if (loading) {
    return (
      <>
        <View style={styles.center}>
          <Loading />
        </View>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Header title={event?.name} route={""} />
        <View style={styles.center}>
          <Loading />
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Header title={event?.name} />
        <TopSpenders topSpenders={topSpenders} />
        <BalanceDisplay balance={balance} />
        <SwipeSection
          selectedAmount={selectedAmount}
          sprays={sprays}
          setSprays={setSprays}
          handleSwipe={handleSwipe}
        />
        {!version?.hidden && (
          <AmountSelector
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
            amountError={amountError}
            setAmountError={setAmountError}
          />
        )}
        <MessageIcon onPress={openChat} />
        <ChatModal
          visible={isChatOpen}
          onClose={closeChat}
          messages={messages}
          onSend={handleSendMessage}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
    // padding: 16,
    marginVertical: 20,
    // justifyContent: "space-evenly",
  },
  messageIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dark,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.danger,
  },
});

export default Event;
