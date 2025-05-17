import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function MorePoints() {
  const activities = [
    {
      id: 1,
      title: "Quay số may mắn",
      image: "/placeholder.svg?height=120&width=120",
      reward: "Trúng 30 TRIỆU xu",
      color: "bg-amber-500",
    },
    {
      id: 2,
      title: "Mèo may mắn",
      image: "/placeholder.svg?height=120&width=120",
      reward: "X5 XU THƯỞNG",
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "Meow thú cưng",
      image: "/placeholder.svg?height=120&width=120",
      reward: "NHẬN 22.000 XU",
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Săn xu bông bông",
      image: "/placeholder.svg?height=120&width=120",
      reward: "SĂN 50.000 XU",
      color: "bg-purple-500",
    },
    {
      id: 5,
      title: "Vòng quay voucher",
      image: "/placeholder.svg?height=120&width=120",
      reward: "SĂN VOUCHER 100.000Đ",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {activities.map((activity) => (
        <Link href="#" key={activity.id}>
          <Card className="border-none shadow-md overflow-hidden h-full">
            <CardContent className="p-0 flex flex-col h-full">
              <div
                className={`${activity.color} p-2 flex items-center justify-center h-24`}>
                <Image
                  src={activity.image || "/placeholder.svg"}
                  width={80}
                  height={80}
                  alt={activity.title}
                  className="object-contain"
                />
              </div>
              <div className="p-2 text-center bg-white flex-1 flex flex-col justify-center">
                <h3 className="text-xs font-medium text-gray-800">
                  {activity.title}
                </h3>
                <p className="text-xs font-bold text-amber-600 mt-1">
                  {activity.reward}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
