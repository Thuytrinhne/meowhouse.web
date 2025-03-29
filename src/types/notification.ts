export default interface Notification {
  _id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  actionUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
