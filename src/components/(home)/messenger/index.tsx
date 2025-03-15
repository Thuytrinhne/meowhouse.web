"use client"; // 🔹 Bắt buộc Next.js hiểu đây là client component

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function MessengerButton() {
  const pathname = usePathname(); // ✅ Lấy đường dẫn hiện tại

  // Kiểm tra nếu đang ở trang /admin thì không hiển thị nút
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-10 right-4 flex items-center space-x-2">
      {/* Hộp chứa chữ "Chat with us" + Mũi tên */}
      <div className="relative flex items-center bg-pri-1 text-white px-3 py-1 rounded-lg shadow-lg animate-slide-in">
        Chat with us
        {/* Mũi tên */}
        <div className="absolute right-[-10px] top-1/2 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-pri-1"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>

      {/* Nút Messenger */}
      <a
        href="https://m.me/meowhouse.pet"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-3 rounded-full shadow-lg animate-bubble">
        <Image
          src="/imgs/chat/messenger-icon.webp"
          alt="Messenger"
          width={40}
          height={40}
        />
      </a>
    </div>
  );
}
