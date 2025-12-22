import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import server from "constants/server";
const BASE_URL = `${server}/spray`;

interface SprayPayload {
  username: string;
  amount: number;
  identifier: string;
  type: "event" | "user";
}

interface ChatPayload {
  identifier: string;
  username: string;
  text: string;
}

interface UseSpraySocketProps {
  onConnected?: () => void;
  onJoinedRoom?: () => void;
  onJoinRoomError?: (error: string) => void;
  onSprayError?: (error: string) => void;
  onLeaderboard?: (data: any) => void;
  onSprayed?: (data: any) => void;
  onMessaged?: (data: any) => void; // Receives messages
}

export function useSpraySocket({
  onConnected,
  onJoinedRoom,
  onJoinRoomError,
  onSprayError,
  onLeaderboard,
  onSprayed,
  onMessaged,
}: UseSpraySocketProps) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(BASE_URL, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      auth: {
        sessionToken: localStorage.getItem("sessionToken"),
      },
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      onConnected?.();
    });

    socket.on("joinedRoom", () => {
      onJoinedRoom?.();
    });

    socket.on("joinRoom_error", (error) => {
      console.error("❌ Join room error:", error.message);
      onJoinRoomError?.(error.message);
    });

    socket.on("spray_error", (error) => {
      onSprayError?.(error.message);
    });

    socket.on("leaderboard", (data) => {
      onLeaderboard?.(data);
    });

    socket.on("sprayed", (data) => {
      onSprayed?.(data);
    });

    socket.on("message", (data) => {
      console.log("💬 New message:", data);
      onMessaged?.(data);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      console.log("🔌 Disconnected from Spray socket");
    };
  }, []);

  // --- Exposed functions ---
  const joinRoom = useCallback((identifier: string, type: "event" | "user") => {
    socketRef.current?.emit("joinRoom", { identifier, type });
  }, []);

  const spray = useCallback((payload: SprayPayload) => {
    socketRef.current?.emit("spray", payload);
  }, []);

  const sendMessage = useCallback((payload: ChatPayload) => {
    socketRef.current?.emit("message", payload);
  }, []);

  return {
    joinRoom,
    spray,
    sendMessage,
  };
}
