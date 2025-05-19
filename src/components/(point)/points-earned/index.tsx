"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PawPrintIcon as Paw, ShoppingBag, Users } from "lucide-react";
import { fetchWithAuth } from "@/utils/functions/server"; // đã có sẵn trong project
import dayjs from "dayjs";
import { USER_POINTS } from "@/utils/constants/urls";

export default function PointsEarned() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetchWithAuth(`${USER_POINTS}/history?type=earn`);
        if (res.success && res.data) {
          setTransactions(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      }
    };

    fetchTransactions();
  }, []);

  const getIcon = (source: string) => {
    switch (source) {
      case "daily_checkin":
        return <Paw className="h-4 w-4 text-amber-500" />;
      case "purchase":
        return <ShoppingBag className="h-4 w-4 text-green-500" />;
      case "referral":
        return <Users className="h-4 w-4 text-blue-500" />;
      default:
        return <Paw className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {transactions.map((transaction: any) => (
        <Card key={transaction._id} className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                {getIcon(transaction.source)}
              </div>

              <div className="flex-1">
                <h3 className="font-medium">
                  {transaction.description || "Giao dịch nhận điểm"}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {dayjs(transaction.createdAt).format("HH:mm DD-MM-YYYY")}
                </p>
              </div>

              <div className="font-bold text-amber-500">
                +{transaction.amount}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <p className="text-center text-sm text-gray-400 py-4">
        Chỉ hiển thị giao dịch trong vòng 1 năm gần nhất
      </p>
    </div>
  );
}
