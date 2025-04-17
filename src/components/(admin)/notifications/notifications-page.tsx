"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle, Filter, RefreshCcw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotificationList } from "./notification-list";
import { NotificationFilters } from "./notification-filters";
import { NotificationStats } from "./notification-stats";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ADMIN_NOTIFICATIONS } from "@/utils/constants/urls";

// Mock data based on the Mongoose schema
const mockNotifications = [
  {
    _id: "1",
    userId: "user123",
    type: "order",
    title: "New Order Received",
    message: "Order #12345 has been placed and is awaiting processing",
    read: false,
    actionUrl: "/admin/orders/12345",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    _id: "2",
    userId: "user456",
    type: "payment",
    title: "Payment Successful",
    message: "Payment of $199.99 has been received for order #12346",
    read: true,
    actionUrl: "/admin/payments/12346",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    _id: "3",
    userId: "user789",
    type: "system",
    title: "System Update",
    message: "The system will undergo maintenance tonight at 2:00 AM UTC",
    read: false,
    actionUrl: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    _id: "4",
    userId: "user123",
    type: "promotion",
    title: "New Promotion Created",
    message:
      "Summer Sale promotion has been created and scheduled to start tomorrow",
    read: false,
    actionUrl: "/admin/promotions/summer-sale",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    _id: "5",
    userId: "user456",
    type: "account",
    title: "New Admin User",
    message: "A new admin user 'john.doe' has been created",
    read: true,
    actionUrl: "/admin/users/john-doe",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
];

export default function NotificationsPage() {
  const { data: session } = useSession(); // Lấy thông tin session
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Fetch API lấy danh sách thông báo
  const fetchNotifications = async () => {
    setLoading(true);
    setError("");

    try {
      const url = `${ADMIN_NOTIFICATIONS}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        throw new Error(errorData?.message || "Failed to fetch notifications");
      }

      const responseData = await response.json();
      if (!responseData.success) {
        throw new Error("Failed to fetch notifications");
      }

      setNotifications(responseData.data.notifications);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Không thể tải danh sách đơn hàng"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchNotifications();
    }
  }, [session]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };
  const handleMarkAsRead = async (id: string) => {
    try {
      // Gửi request PUT đến API
      const res = await fetch(`${ADMIN_NOTIFICATIONS}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }), // cập nhật field 'read'
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Cập nhật thất bại");

      // Cập nhật UI nếu thành công
      setNotifications(
        notifications.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Lỗi cập nhật thông báo:", err);
    }
  };

  const handleMarkAsUnread = async (id: string) => {
    try {
      // Gửi request PUT đến API
      const res = await fetch(`${ADMIN_NOTIFICATIONS}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: false }), // cập nhật field 'read'
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Cập nhật thất bại");

      // Cập nhật UI nếu thành công
      setNotifications(
        notifications.map((n) => (n._id === id ? { ...n, read: false } : n))
      );
    } catch (err) {
      console.error("Lỗi cập nhật thông báo:", err);
    }
  };

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data from the API
    console.log("Refreshing notifications...");
  };

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.type === activeTab);

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Manage and view system notifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Center
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount} unread
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                View and manage all system notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="order">Orders</TabsTrigger>
                  <TabsTrigger value="payment">Payments</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="promotion">Promotions</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="m-0">
                  <NotificationList
                    notifications={filteredNotifications}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAsUnread={handleMarkAsUnread}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <NotificationStats notifications={notifications} />

          {showFilters && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <NotificationFilters />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
