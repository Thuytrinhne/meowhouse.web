"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";
import { USER_POINTS } from "@/utils/constants/urls";
import { useSession } from "next-auth/react";
import { fetchWithAuth } from "@/utils/functions/server";

export default function DailyCheckIn({ onEarned }: { onEarned?: () => void }) {
  const [days, setDays] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [claimedToday, setClaimedToday] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await fetchWithAuth(`${USER_POINTS}/checkin/status`);
      if (res.success && res.data) {
        const data = res.data;
        setClaimedToday(!data.can_checkin_today);
        if (!data.can_checkin_today) {
          setCurrentDay(data.current_day_index - 1);
        } else {
          setCurrentDay(data.current_day_index);
        }
        setDays(data.days);
      }
    } catch (err) {
      console.error("Error fetching checkin status:", err);
    }
  };
  useEffect(() => {
    fetchStatus();
  }, []);

  const handleCheckin = async () => {
    try {
      const res = await fetchWithAuth(`${USER_POINTS}/checkin`, {
        method: "POST",
      });
      const data = res.data;

      if (res.success) {
        setClaimedToday(true);
        alert(`✅ Nhận ${data.reward} xu cho ngày ${data.day_index}`);
        onEarned?.();

        await fetchStatus();
      } else {
        alert(`❌ ${data.message || "Check-in thất bại"}`);
      }
    } catch (err) {
      console.error("Check-in failed:", err);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-7 gap-1 p-4 bg-white">
            {days.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`
                  relative w-full aspect-square rounded-md flex flex-col items-center justify-center p-1
                  ${
                    index + 1 === currentDay
                      ? claimedToday
                        ? "border-2 border-red-400 bg-red-50"
                        : "border border-red-300 bg-white"
                      : day.checked_in
                        ? "bg-gray-100"
                        : index === 6
                          ? "bg-amber-100"
                          : "bg-amber-50"
                  }
                `}>
                  {day.checked_in ? (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="text-white w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center">
                      <Image
                        src="/imgs/points/coin.png"
                        width={40}
                        height={40}
                        alt="Coin"
                        className="object-contain"
                      />
                    </div>
                  )}

                  <div className="text-amber-500 font-bold text-sm mt-1">
                    +{day.reward}
                  </div>
                </div>
                <div className="text-xs mt-1 text-center text-gray-600">
                  {day.day === currentDay ? "Hôm nay" : `Ngày ${day.day}`}
                </div>
              </div>
            ))}
          </div>

          {claimedToday ? (
            <Button
              disabled
              className="w-full py-6 rounded-none bg-gray-300 text-gray-700 font-bold text-lg cursor-not-allowed">
              Đã nhận, quay lại MeowHouse vào hôm sau bạn nhé !!!
            </Button>
          ) : (
            <Button
              onClick={handleCheckin}
              className="w-full py-6 rounded-none bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold text-lg flex items-center justify-center">
              Nhận ngay
              <Image
                src="/imgs/points/coin.png"
                width={40}
                height={40}
                alt="Coin"
                className="ml-2"
              />
              100 xu
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
