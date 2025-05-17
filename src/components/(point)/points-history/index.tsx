import { Card, CardContent } from "@/components/ui/card";
import { PawPrintIcon as Paw, ShoppingBag, Gift } from "lucide-react";

export default function PointsHistory() {
  const transactions = [
    {
      id: 1,
      type: "earned",
      title: "Đăng nhập mỗi ngày",
      description: "Meow House Xu từ đăng nhập mỗi ngày",
      date: "20:38 17-05-2025",
      amount: 100,
      icon: <Paw className="h-4 w-4" />,
    },
    {
      id: 2,
      type: "earned",
      title: "Hoàn thành đơn hàng",
      description: "Đơn hàng #MH12345",
      date: "14:22 15-05-2025",
      amount: 250,
      icon: <ShoppingBag className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "used",
      title: "Đổi voucher",
      description: "Voucher giảm giá 20.000đ",
      date: "09:15 10-05-2025",
      amount: -500,
      icon: <Gift className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === "earned" ? "bg-amber-100" : "bg-pink-100"
                }`}>
                {transaction.icon}
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{transaction.title}</h3>
                <p className="text-sm text-gray-500">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">{transaction.date}</p>
              </div>

              <div
                className={`font-bold ${transaction.type === "earned" ? "text-amber-500" : "text-pink-500"}`}>
                {transaction.type === "earned" ? "+" : ""}
                {transaction.amount}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <p className="text-center text-sm text-gray-400 py-4">
        Only transactions within the past year are displayed
      </p>
    </div>
  );
}
