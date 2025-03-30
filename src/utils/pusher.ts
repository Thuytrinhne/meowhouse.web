import Pusher from "pusher-js";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});
pusher.connection.bind("connected", () => {
  console.log("🔗 Pusher đã kết nối!");
});

pusher.connection.bind("error", (err: any) => {
  console.error("❌ Lỗi kết nối Pusher:", err);
});

export default pusher;
