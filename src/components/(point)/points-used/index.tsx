import { Card, CardContent } from "@/components/ui/card";
import { Gift } from "lucide-react";
import Image from "next/image";

export default function PointsUsed() {
  const transactions = [
    {
      id: 1,
      title: "Đổi voucher",
      description: "Voucher giảm giá 20.000đ",
      date: "09:15 10-05-2025",
      amount: 500,
      icon: <Gift className="h-4 w-4" />,
    },
    {
      id: 2,
      title: "Đổi quà tặng",
      description: "Móc khóa mèo Meow House",
      date: "16:40 05-05-2025",
      amount: 1000,
      icon: <Gift className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-4">
      {transactions.length > 0 ? (
        <>
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    {transaction.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{transaction.title}</h3>
                    <p className="text-sm text-gray-500">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {transaction.date}
                    </p>
                  </div>

                  <div className="font-bold text-pink-500">
                    -{transaction.amount}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <p className="text-center text-sm text-gray-400 py-4">
            Only transactions within the past year are displayed
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-24 h-24 mb-4">
            <Image
              src="/placeholder.svg?height=96&width=96"
              width={96}
              height={96}
              alt="Empty"
              className="opacity-50"
            />
          </div>
          <p className="text-gray-400 text-center">Bạn chưa sử dụng xu nào</p>
        </div>
      )}
    </div>
  );
}
