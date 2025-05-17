"use client";

// import libs
import {
  Home,
  LogOut,
  NotepadText,
  User,
  Menu,
  CircleDollarSign,
  Ticket,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

// import components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// import utils
import { getLastName } from "@/utils/string-utils";

export default function UserSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/login",
      });
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const getLevelStyle = (level: string | undefined) => {
    switch (level?.toLowerCase()) {
      case "diamond":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800";
      case "gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-200 dark:hover:bg-yellow-800";
      case "silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600";
      case "bronze":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800";
      default:
        return "bg-muted text-muted-foreground dark:bg-gray-800 dark:text-white hover:bg-muted/80 dark:hover:bg-gray-700";
    }
  };

  const getMembershipLabel = (level: string | undefined) => {
    switch (level?.toLowerCase()) {
      case "diamond":
        return "Kim cương";
      case "gold":
        return "Vàng";
      case "silver":
        return "Bạc";
      case "bronze":
        return "Đồng";
      default:
        return "Thành viên mới";
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        className="md:hidden fixed top-4 right-4 z-50 dark:text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <Card
        className={`
        md:flex h-auto md:h-[540px] w-full md:w-[380px] flex-col
        fixed md:relative top-0 left-0 z-40
        ${isMenuOpen ? "flex" : "hidden"}
        bg-white dark:bg-zinc-950
        md:bg-white
        transition-all duration-300
        border-none shadow-lg
      `}>
        {/* Profile Section */}
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-12 md:h-16 w-12 md:w-16">
            <AvatarImage src={session?.user?.userAvt} alt="Avatar" />
            <AvatarFallback>TT</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <div className="flex justify-between align-middle">
              <h5 className="font-semibold dark:text-white">
                Chào {getLastName(session?.user?.name)}
              </h5>
              <div className="flex items-center gap-2">
                <Badge
                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getLevelStyle(
                    session?.user?.membershipLevel
                  )}`}>
                  {getMembershipLabel(session?.user?.membershipLevel)}
                  <Link href="/membership">
                    <span className="text-[10px] font-bold">{">"}</span>
                  </Link>
                </Badge>
              </div>
            </div>
            <Link href="/my-profile">
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-muted-foreground dark:text-gray-400">
                Chỉnh sửa tài khoản
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2 md:gap-3">
          <Link href="/my-profile">
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 text-sm md:text-base px-4 md:px-6 py-5 md:py-7
                ${
                  pathname === "/my-profile"
                    ? "bg-selected-nav text-pri-1 font-bold rounded-none dark:bg-gray-900 dark:text-white"
                    : "dark:text-gray-300 dark:hover:bg-gray-700"
                }
              `}>
              <User className="h-5 md:h-6 w-5 md:w-6" />
              Thông tin tài khoản
            </Button>
          </Link>

          <Link href="/address">
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 text-sm md:text-base px-4 md:px-6 py-5 md:py-7
                ${
                  pathname.includes("/address")
                    ? "bg-selected-nav text-pri-1 font-bold rounded-none dark:bg-gray-900 dark:text-white"
                    : "dark:text-gray-300 dark:hover:bg-gray-700"
                }
              `}>
              <Home className="h-5 md:h-7 w-5 md:w-7" />
              Địa chỉ nhận hàng
            </Button>
          </Link>

          <Link href="/order-history">
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 text-sm md:text-base px-4 md:px-6 py-5 md:py-7
                ${
                  pathname.includes("/order-history")
                    ? "bg-selected-nav text-pri-1 font-bold rounded-none dark:bg-gray-900 dark:text-white"
                    : "dark:text-gray-300 dark:hover:bg-gray-700"
                }
              `}>
              <NotepadText className="h-5 md:h-6 w-5 md:w-6" />
              Đơn hàng của tôi
            </Button>
          </Link>

          <Link href="/my-coupons">
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 text-sm md:text-base px-4 md:px-6 py-5 md:py-7
                ${
                  pathname.includes("/my-coupons")
                    ? "bg-selected-nav text-pri-1 font-bold rounded-none dark:bg-gray-900 dark:text-white"
                    : "dark:text-gray-300 dark:hover:bg-gray-700"
                }
              `}>
              <Ticket className="h-5 md:h-6 w-5 md:w-6" />
              Kho ưu đãi
            </Button>
          </Link>

          <Link href="/reward-points">
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 text-sm md:text-base px-4 md:px-6 py-5 md:py-7
                ${
                  pathname.includes("/reward-points")
                    ? "bg-selected-nav text-pri-1 font-bold rounded-none dark:bg-gray-900 dark:text-white"
                    : "dark:text-gray-300 dark:hover:bg-gray-700"
                }
              `}>
              <CircleDollarSign className="h-5 md:h-6 w-5 md:w-6" />
              Meow House Xu
            </Button>
          </Link>
        </nav>

        {/* Sign Out Button */}
        <div className="p-4 h-[100%] flex items-center">
          <Button
            variant="custom"
            className="w-full justify-center gap-3 text-white text-sm md:text-base dark:bg-pri-8 dark:hover:bg-pri-9"
            onClick={handleSignOut}>
            <LogOut className="h-4 md:h-5 w-4 md:w-5" />
            Đăng xuất
          </Button>
        </div>
      </Card>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
