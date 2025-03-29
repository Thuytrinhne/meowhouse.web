"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Notification from "@/types/notification";
export default function useOrderNotifications() {
  const [orderNotification, setorderNotification] =
    useState<Notification | null>(null);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:8080");
    setSocket(socketInstance);

    socketInstance.on("orderNotification", (order) => {
      setorderNotification(order);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { orderNotification, socket };
}
