"use client";
import React, { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSideBar } from "@/partials";
import useOrderNotifications from "@/hooks/useOrderNotifications";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

// Function phát âm thanh thông báo
const playNotificationSound = () => {
  const audio = new Audio("/sounds/notification.mp3");
  audio.play();
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { orderNotification } = useOrderNotifications();
  const router = useRouter();
  const [duration, setDuration] = useState(20000); // Mặc định 20 giây

  useEffect(() => {
    if (orderNotification) {
      // Phát âm thanh
      playNotificationSound();
      console.log(orderNotification);
      // Hiển thị thông báo với hiệu ứng rung
      toast.custom(
        (t) => (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotate: [0, -3, 3, 0] }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-4 cursor-pointer w-[400px] max-w-md"
            onClick={() => {
              toast.dismiss(t);
              router.push(orderNotification.actionUrl);
            }}
            onMouseEnter={() => setDuration(Infinity)} // Khi hover, không đóng
            onMouseLeave={() => setDuration(20000)} // Khi rời chuột, đặt lại 20 giây
          >
            {/* Nút đóng thông báo */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
                toast.dismiss(t);
              }}
              className="absolute top-2 right-4 text-white hover:text-gray-300 text-xl font-bold">
              <X size={24} />
            </button>
            🔔
            <div>
              <p className="font-semibold text-lg">{orderNotification.title}</p>
              <p className="text-sm">{orderNotification.message}</p>
            </div>
          </motion.div>
        ),
        {
          position: "bottom-right",
          duration: duration, // Dùng state để kiểm soát thời gian
        }
      );
    }
  }, [orderNotification]);
  return (
    <SidebarProvider>
      <Toaster richColors />
      <AdminSideBar />
      <div className="p-2 mx-auto w-full h-fit">
        <SidebarTrigger className="absolute top-4 bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full hover:bg-white hover:shadow-md" />
        {children}
      </div>
    </SidebarProvider>
  );
}
