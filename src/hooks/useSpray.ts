import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

interface JoinRoomPayload {
  identifier: string;
  type: "event" | "user";
}

interface UseSpraySocketProps {
  onConnected?: () => void;
  onJoinedRoom?: () => void;
  onJoinRoomError?: (error: string) => void;
  onSprayError?: (error: string) => void;
  onLeaderboard?: (data: any) => void;
  onSprayed?: (data: any) => void;
  onMessaged?: (data: any) => void;
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

  // 🔐 Persist room info for reconnects
  const joinRoomRef = useRef<JoinRoomPayload | null>(null);

  useEffect(() => {
    let socket: Socket | null = null;
    let mounted = true;

    const connectSocket = async () => {
      const sessionToken = await AsyncStorage.getItem("sessionToken");
      if (!mounted) return;

      socket = io(BASE_URL, {
        reconnection: true,
        reconnectionAttempts: Infinity,
        auth: {
          sessionToken,
        },
      });

      socketRef.current = socket;

      // 🔌 Connected or reconnected
      socket.on("connect", () => {
        onConnected?.();

        // ✅ Always rejoin room on connect / reconnect
        if (joinRoomRef.current) {
          socket?.emit("joinRoom", joinRoomRef.current);
        }
      });

      socket.on("joinedRoom", () => {
        onJoinedRoom?.();
      });

      socket.on("joinRoom_error", (error) => {
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
        onMessaged?.(data);
      });
    };

    connectSocket();

    return () => {
      mounted = false;
      socket?.disconnect();
      socketRef.current = null;
    };
  }, []);

  // 🏠 Join or queue room
  const joinRoom = useCallback((identifier: string, type: "event" | "user") => {
    const payload: JoinRoomPayload = { identifier, type };

    // Save for reconnect
    joinRoomRef.current = payload;

    if (socketRef.current?.connected) {
      socketRef.current.emit("joinRoom", payload);
    }
  }, []);

  // 💸 Spray event
  const spray = useCallback((payload: SprayPayload) => {
    socketRef.current?.emit("spray", payload);
  }, []);

  // 💬 Chat message
  const sendMessage = useCallback((payload: ChatPayload) => {
    socketRef.current?.emit("message", payload);
  }, []);

  return {
    joinRoom,
    spray,
    sendMessage,
  };
}
