import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, Clock } from "lucide-react";

type Notification = {
  _id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  actionUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

interface NotificationStatsProps {
  notifications: Notification[];
}

export function NotificationStats({ notifications }: NotificationStatsProps) {
  const totalCount = notifications.length;
  const unreadCount = notifications.filter((n) => !n.read).length;
  const readCount = totalCount - unreadCount;

  // Count by type
  const typeCount = notifications.reduce(
    (acc, notification) => {
      acc[notification.type] = (acc[notification.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Get notifications from last 24 hours
  const last24Hours = new Date();
  last24Hours.setHours(last24Hours.getHours() - 24);
  const recentCount = notifications.filter(
    (n) => new Date(n.createdAt) > last24Hours
  ).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Notification Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Total</span>
              </div>
              <span className="font-medium">{totalCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Read</span>
              </div>
              <span className="font-medium">{readCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-4 w-4 mr-2 rounded-full bg-blue-500" />
                <span className="text-sm">Unread</span>
              </div>
              <span className="font-medium">{unreadCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Last 24h</span>
              </div>
              <span className="font-medium">{recentCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">By Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(typeCount).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`h-3 w-3 rounded-full mr-2 ${getTypeColor(type)}`}
                  />
                  <span className="text-sm capitalize">{type}</span>
                </div>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getTypeColor(type: string) {
  switch (type) {
    case "order":
      return "bg-blue-500";
    case "payment":
      return "bg-green-500";
    case "system":
      return "bg-purple-500";
    case "account":
      return "bg-yellow-500";
    case "promotion":
      return "bg-pink-500";
    default:
      return "bg-gray-500";
  }
}
