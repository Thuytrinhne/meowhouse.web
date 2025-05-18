import { Card, CardContent } from "@/components/ui/card";
import { PawPrintIcon as Paw, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function PointsEarned() {
  const transactions = [
    {
      id: 1,
      title: "Đăng nhập mỗi ngày",
      description: "Meow House Xu từ đăng nhập mỗi ngày",
      date: "20:38 17-05-2025",
      amount: 100,
      icon: <Paw className="h-4 w-4" />,
    },
    {
      id: 2,
      title: "Hoàn thành đơn hàng",
      description: "Đơn hàng #MH12345",
      date: "14:22 15-05-2025",
      amount: 250,
      icon: <ShoppingBag className="h-4 w-4" />,
    },
    {
      id: 3,
      title: "Giới thiệu bạn bè",
      description: "Bạn bè đăng ký thành công",
      date: "11:05 12-05-2025",
      amount: 500,
      icon: <Paw className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Image
                  src="/imgs/points/coin.png"
                  width={24}
                  height={24}
                  alt="Coin"
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{transaction.title}</h3>
                <p className="text-sm text-gray-500">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">{transaction.date}</p>
              </div>

              <div className="font-bold text-amber-500">
                +{transaction.amount}
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
