"use client";
import { useEffect, useState } from "react";
import Notification from "@/types/notification";
import pusher from "@/utils/pusher";

export default function useOrderNotifications() {
  const [orderNotification, setOrderNotification] =
    useState<Notification | null>(null);

  useEffect(() => {
    const channel = pusher.subscribe("orders");
    console.log("📡 Subscribed to channel:", channel.name); // Kiểm tra đăng ký kênh

    channel.bind("orderNotification", (order: Notification) => {
      console.log("📩 Nhận được event:", order);
      setOrderNotification(order);
    });

    return () => {
      //channel.unsubscribe();
      pusher.unsubscribe("orders");
      console.log("🚪 Unsubscribed from channel");
    };
  }, []);

  return { orderNotification };
}
