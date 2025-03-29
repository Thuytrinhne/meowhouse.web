import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";

import Notification from "@/types/notification";
export default function SidebarNotificationItem() {
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!session?.user?.accessToken) return;

      try {
        const url = "http://localhost:8080/api/admin/notifications";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch notifications");

        const responseData = await response.json();
        if (!responseData.success) throw new Error("Failed to fetch data");

        const unreadNotifications = responseData.data.notifications.filter(
          (n: Notification) => !n.read
        ).length;

        setUnreadCount(unreadNotifications);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, [session]);

  return (
    <SidebarMenuItem>
      <Link href="/admin/notifications">
        <SidebarMenuButton className="relative">
          <Bell className="mr-2" />
          Thông báo
          {unreadCount > 0 && (
            <Badge className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-red-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}
