"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  PawPrintIcon as Paw,
  ShoppingBag,
  Gift,
  Undo2,
  Hourglass,
} from "lucide-react";
import { fetchWithAuth } from "@/utils/functions/server"; // đã có sẵn trong project
import dayjs from "dayjs";
import { USER_POINTS } from "@/utils/constants/urls";

type PointTransactionSource =
  | "daily_checkin"
  | "purchase"
  | "gift"
  | "refund"
  | "expired";

type Transaction = {
  _id: string;
  amount: number;
  type: "earn" | "redeem";
  source: PointTransactionSource;
  description: string;
  createdAt: string;
};

const ICON_MAP: Record<PointTransactionSource, JSX.Element> = {
  daily_checkin: <Paw className="h-4 w-4" />,
  purchase: <ShoppingBag className="h-4 w-4" />,
  gift: <Gift className="h-4 w-4" />,
  refund: <Undo2 className="h-4 w-4" />,
  expired: <Hourglass className="h-4 w-4" />,
};

export default function PointsHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await fetchWithAuth(`${USER_POINTS}/history?page=1&limit=10`);
      if (res.success) {
        setTransactions(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch point history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) return <p className="text-center text-sm py-8">Đang tải...</p>;

  if (transactions.length === 0)
    return (
      <p className="text-center text-gray-500 text-sm py-8">
        Chưa có lịch sử giao dịch nào.
      </p>
    );

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => {
        const isEarned = transaction.amount > 0;
        const icon = ICON_MAP[transaction.source];

        return (
          <Card key={transaction._id} className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isEarned ? "bg-amber-100" : "bg-pink-100"
                  }`}>
                  {icon}
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">
                    {transaction.description || "Giao dịch"}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {dayjs(transaction.createdAt).format("HH:mm DD-MM-YYYY")}
                  </p>
                </div>

                <div
                  className={`font-bold ${
                    isEarned ? "text-amber-500" : "text-pink-500"
                  }`}>
                  {isEarned ? "+" : ""}
                  {transaction.amount}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <p className="text-center text-sm text-gray-400 py-4">
        Chỉ hiển thị các giao dịch trong vòng 1 năm qua
      </p>
    </div>
  );
}
