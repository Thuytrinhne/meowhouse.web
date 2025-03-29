import type { Metadata } from "next";
import NotificationsPage from "../../../components/(admin)/notifications/notifications-page";

export const metadata: Metadata = {
  title: "Notifications | Admin Dashboard",
  description: "Manage system notifications",
};

export default function Page() {
  return <NotificationsPage />;
}
