import { useState, useEffect, useCallback, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { getEventById } from "services/eventService";
import { useWallet } from "contexts/WalletContext";
import { useSpraySocket } from "../hooks/useSpray";
import { useUser } from "contexts/UserContext";
import { useSound } from "./useSound";
import { useLocalSearchParams } from "expo-router";

export interface TopSpender {
  username: string;
  amount: number;
}

export interface ChatMessage {
  id: string;
  username: string;
  text: string;
  time: string;
  isUser: boolean;
}

export const useEvent = (type: "user" | "event") => {
  const params = useLocalSearchParams<{
    id: string;
    name?: string;
  }>();

  const eventId = params.id;
  const { balance, setBalance, refreshWallet } = useWallet();
  const { user } = useUser();
  const { playSound } = useSound();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sprays, setSprays] = useState<number[]>([]);
  const [amountError, setAmountError] = useState<string>("");
  const [topSpenders, setTopSpenders] = useState<TopSpender[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const selectedAmountRef = useRef<number>(1000);
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);

  const setSelectedAmountStable = useCallback(
    (value: React.SetStateAction<number>) => {
      if (typeof value === "function") {
        setSelectedAmount((prev) => {
          const newValue = (value as (prevState: number) => number)(prev);
          selectedAmountRef.current = newValue;
          return newValue;
        });
      } else {
        selectedAmountRef.current = value;
        setSelectedAmount(value);
      }
    },
    []
  );

  const username = user?.username || "Guest";

  // --- Socket logic ---
  const { joinRoom, spray, sendMessage } = useSpraySocket({
    onConnected: () => {},
    onJoinedRoom: () => {},
    onJoinRoomError: (err) => {},
    onSprayError: (err) => {},
    onLeaderboard: (data) => setTopSpenders(data),
    onSprayed: (data) => setSprays((prev) => [...prev, data]),
    onMessaged: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          username: data.username,
          text: data.text,
          time: data.time,
          isUser: data.username === username,
        },
      ]);
    },
  });

  // --- Fetch event and wallet ---
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        if (type === "user") {
          await refreshWallet();
        } else {
          const [eventRes, walletRes] = await Promise.all([
            getEventById(eventId),
            await refreshWallet(),
          ]);
          setEvent(eventRes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    interval = setInterval(async () => {
      try {
        await refreshWallet();
      } catch (err) {
        console.error("Error fetching wallet:", err);
      }
    }, 3000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [eventId, type, setBalance]);

  // --- Join socket room once eventId is available ---
  useEffect(() => {
    joinRoom(eventId, type);
  }, [joinRoom, eventId, type]);

  // --- Spray handler ---
  const handleSwipe = useCallback(async () => {
    try {
      spray({
        username,
        amount: selectedAmountRef.current,
        identifier: eventId,
        type,
      });
      await playSound();
    } catch (err) {
      console.error("Spray failed:", err);
    }
  }, [spray, username, eventId, type]);

  // --- Chat handlers ---
  const handleSendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const payload = {
        identifier: eventId,
        username,
        text,
      };
      sendMessage(payload);
    },
    [sendMessage, username, eventId]
  );

  const openChat = useCallback(() => setIsChatOpen(true), []);
  const closeChat = useCallback(() => setIsChatOpen(false), []);

  return {
    // State
    event,
    loading,
    isChatOpen,
    sprays,
    selectedAmount,
    amountError,
    topSpenders,
    balance,
    messages,

    // Setters
    setSelectedAmount: setSelectedAmountStable,
    setAmountError,
    setSprays,

    // Event handlers
    handleSwipe,
    openChat,
    closeChat,
    handleSendMessage, // 👈 new
  };
};
