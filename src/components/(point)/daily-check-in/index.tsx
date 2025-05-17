"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";

export default function DailyCheckIn() {
  const [currentDay, setCurrentDay] = useState(1);
  const [claimedToday, setClaimedToday] = useState(true);

  const days = [
    { day: "Hôm nay", points: 100 },
    { day: "Ngày 2", points: 100 },
    { day: "Ngày 3", points: 100 },
    { day: "Ngày 4", points: 100 },
    { day: "Ngày 5", points: 100 },
    { day: "Ngày 6", points: 100 },
    { day: "Ngày 7", points: 200 },
  ];

  const handleClaimExtra = () => {
    alert("Đã nhận thêm 2.600 xu!");
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-7 gap-1 p-4 bg-white">
            {days.map((day, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${index === 6 ? "col-span-1" : ""}`}>
                <div
                  className={`
                    relative w-full aspect-square rounded-md flex flex-col items-center justify-center p-1
                    ${
                      index === 0 && claimedToday
                        ? "border-2 border-red-400 bg-red-50"
                        : index < currentDay
                          ? "bg-gray-100"
                          : index === 6
                            ? "bg-amber-100"
                            : "bg-amber-50"
                    }
                  `}>
                  {index === 0 && claimedToday && (
                    <div className="absolute top-1 right-1 bg-red-500 rounded-full p-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}

                  <div className="text-amber-500 font-bold text-sm">
                    +{day.points}
                  </div>

                  <div className="mt-1">
                    <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        width={24}
                        height={24}
                        alt="Coin"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-xs mt-1 text-center text-gray-600">
                  {day.day}
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleClaimExtra}
            className="w-full py-6 rounded-none bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold text-lg">
            Nhận thêm{" "}
            <Image
              src="/placeholder.svg?height=24&width=24"
              width={24}
              height={24}
              alt="Coin"
              className="mx-1"
            />{" "}
            2.600 hôm nay!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
