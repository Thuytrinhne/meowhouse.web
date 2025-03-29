"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Bell, Eye, EyeOff, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
}

export function NotificationList({
  notifications,
  onMarkAsRead,
  onMarkAsUnread,
}: NotificationListProps) {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "payment":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "system":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "account":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "promotion":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const handleRowClick = (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      onMarkAsRead(notification._id);
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Bell className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No notifications found</h3>
        <p className="text-muted-foreground mt-1">
          There are no notifications matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Time</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow
              key={notification._id}
              className={`cursor-pointer ${!notification.read ? "bg-muted/50" : ""}`}
              onClick={() => handleRowClick(notification)}>
              <TableCell>
                <Badge className={`${getTypeColor(notification.type)}`}>
                  {notification.type}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-start gap-2">
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5" />
                  )}
                  <div>
                    {notification.title}
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">
                {format(new Date(notification.createdAt), "MMM dd, h:mm a")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  {notification.read ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkAsUnread(notification._id);
                      }}
                      title="Mark as unread">
                      <EyeOff className="h-4 w-4" />
                      <span className="sr-only">Mark as unread</span>
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkAsRead(notification._id);
                      }}
                      title="Mark as read">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={!!selectedNotification}
        onOpenChange={(open) => !open && setSelectedNotification(null)}>
        {selectedNotification && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedNotification.title}</DialogTitle>
              <DialogDescription>
                <Badge
                  className={`${getTypeColor(selectedNotification.type)} mt-2`}>
                  {selectedNotification.type}
                </Badge>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <p>{selectedNotification.message}</p>

              <div className="text-sm text-muted-foreground">
                <p>
                  Created:{" "}
                  {format(new Date(selectedNotification.createdAt), "PPpp")}
                </p>
                <p>User ID: {selectedNotification.userId}</p>
              </div>

              <div className="flex justify-between">
                {selectedNotification.actionUrl ? (
                  <Button asChild>
                    <a
                      href={selectedNotification.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </a>
                  </Button>
                ) : (
                  <div></div>
                )}

                <Button
                  variant="outline"
                  onClick={() => setSelectedNotification(null)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
