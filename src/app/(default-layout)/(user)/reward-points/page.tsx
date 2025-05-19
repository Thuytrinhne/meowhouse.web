"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  HelpCircle,
  PawPrintIcon as Paw,
  Calendar,
  Gift,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import DailyCheckIn from "@/components/(point)/daily-check-in";
import PointsHistory from "@/components/(point)/points-history";
import PointsEarned from "@/components/(point)/points-earned";
import PointsUsed from "@/components/(point)/points-used";
import MorePoints from "@/components/(point)/more-points";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { fetchWithAuth } from "@/utils/functions/server";
import { USER_POINTS } from "@/utils/constants/urls";
import { useRouter } from "next/navigation"; // thêm import này

export default function PointsPage() {
  const [summary, setSummary] = useState<PointsSummary | null>(null);
  const router = useRouter();

  const fetchSummary = async () => {
    try {
      const res = await fetchWithAuth(`${USER_POINTS}/summary`);
      if (res.success) {
        setSummary(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch point summary:", err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);
  return (
    <div className="w-[100%] dark:bg-black dark:border-gray-700 mx-auto bg-pink-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-400 to-amber-500 p-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="#" className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold text-white flex-1 text-center">
          Meow House Xu
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Points Balance */}
      <div className="bg-gradient-to-b from-amber-400 to-amber-300 p-6 pb-8 relative">
        <div className="flex items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-5xl font-bold text-white">
                {summary?.available_points ?? 0}
              </h2>
              <span className="text-amber-700 font-medium">Xu khả dụng</span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-6 w-6 p-0">
                <HelpCircle className="h-4 w-4 text-amber-700" />
              </Button>
            </div>

            {summary?.expiring_points?.length > 0 && (
              <div className="text-amber-700 mt-1 space-y-1">
                {summary.expiring_points.map((p, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <span>
                      {p.amount} xu sẽ hết hạn vào{" "}
                      {dayjs(p.expires_at).format("DD-MM-YYYY")}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-6 w-6 p-0 ml-1">
                      <HelpCircle className="h-4 w-4 text-amber-700" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg"
            onClick={() => router.push("reward-points/redeem")}>
            Đổi xu
          </Button>
        </div>

        {/* Cat ears decoration */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <div className="relative w-20 h-6 overflow-hidden">
            <div className="absolute w-10 h-10 bg-pink-50 rounded-full -top-5 -left-2 transform rotate-45"></div>
            <div className="absolute w-10 h-10 bg-pink-50 rounded-full -top-5 -right-2 transform -rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="daily" className="mt-2 px-4">
        <TabsList className="grid grid-cols-4 bg-pink-100 p-0 h-auto">
          <TabsTrigger
            value="daily"
            className="py-3 data-[state=active]:bg-pink-200 data-[state=active]:text-pink-800 rounded-none">
            <div className="flex flex-col items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">Hàng ngày</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="py-3 data-[state=active]:bg-pink-200 data-[state=active]:text-pink-800 rounded-none">
            <div className="flex flex-col items-center gap-1">
              <Paw className="h-4 w-4" />
              <span className="text-xs">Lịch sử</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="earned"
            className="py-3 data-[state=active]:bg-pink-200 data-[state=active]:text-pink-800 rounded-none">
            <div className="flex flex-col items-center gap-1">
              <Gift className="h-4 w-4" />
              <span className="text-xs">Đã nhận</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="used"
            className="py-3 data-[state=active]:bg-pink-200 data-[state=active]:text-pink-800 rounded-none">
            <div className="flex flex-col items-center gap-1">
              <ShoppingBag className="h-4 w-4" />
              <span className="text-xs">Đã dùng</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-4">
          <DailyCheckIn onEarned={fetchSummary} />
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <PointsHistory />
        </TabsContent>

        <TabsContent value="earned" className="mt-4">
          <PointsEarned />
        </TabsContent>

        <TabsContent value="used" className="mt-4">
          <PointsUsed />
        </TabsContent>
      </Tabs>

      {/* More ways to earn points */}
      <div className="px-4 mt-6 pb-20">
        <h3 className="text-lg font-bold text-pink-800 mb-4 flex items-center gap-2">
          <Paw className="h-5 w-5 fill-amber-400 stroke-amber-600" />
          SĂN THÊM XU DƯỚI ĐÂY
        </h3>
        <MorePoints />
      </div>
    </div>
  );
}
