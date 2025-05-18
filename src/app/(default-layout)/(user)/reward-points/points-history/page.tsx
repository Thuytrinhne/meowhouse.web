import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Ticket, Award } from "lucide-react";
import Image from "next/image";

export default function PointsHistoryPage() {
  const redeemHistory = [
    {
      id: 1,
      title: "Giảm 20.000đ",
      description: "Đơn hàng từ 100.000đ",
      date: "15-05-2025",
      points: 500,
      type: "voucher",
      status: "Đã sử dụng",
    },
    {
      id: 2,
      title: "Móc khóa mèo",
      description: "Móc khóa mèo Meow House",
      date: "10-05-2025",
      points: 1500,
      type: "gift",
      status: "Đang giao hàng",
    },
    {
      id: 3,
      title: "Miễn phí vận chuyển",
      description: "Áp dụng mọi đơn hàng",
      date: "05-05-2025",
      points: 800,
      type: "special",
      status: "Còn hiệu lực",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "voucher":
        return <Ticket className="h-4 w-4 text-pink-500" />;
      case "gift":
        return <Gift className="h-4 w-4 text-amber-500" />;
      case "special":
        return <Award className="h-4 w-4 text-purple-500" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã sử dụng":
        return "text-gray-500";
      case "Đang giao hàng":
        return "text-blue-500";
      case "Còn hiệu lực":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-[100%] dark:bg-black dark:border-gray-700 mx-auto bg-pink-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-400 to-amber-500 p-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="redeem" className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold text-white flex-1 text-center">
          Lịch sử đổi xu
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Tabs */}
      <div className="p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 bg-pink-100 p-0 h-auto">
            <TabsTrigger
              value="all"
              className="py-3 data-[state=active]:bg-pink-200 data-[state=active]:text-pink-800 rounded-none">
              Tất cả
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="py-3 data-[state=active]:bg-pink-200 data-[state=active]:text-pink-800 rounded-none">
              Còn hiệu lực
            </TabsTrigger>
            <TabsTrigger
              value="used"
              className="py-3 data-[state=active]:bg-pink-200 data-[state=active]:text-pink-800 rounded-none">
              Đã sử dụng
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {redeemHistory.map((item) => (
                <Card key={item.id} className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          width={32}
                          height={32}
                          alt={item.title}
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          {getIcon(item.type)}
                          <h3 className="font-medium">{item.title}</h3>
                        </div>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-400">{item.date}</p>
                          <p
                            className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Image
                            src="/imgs/points/coin.png"
                            width={16}
                            height={16}
                            alt="Coin"
                            className="object-contain"
                          />
                          <span className="text-sm font-bold text-amber-500">
                            -{item.points}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-4">
            <div className="space-y-4">
              {redeemHistory
                .filter(
                  (item) =>
                    item.status === "Còn hiệu lực" ||
                    item.status === "Đang giao hàng"
                )
                .map((item) => (
                  <Card key={item.id} className="border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=48&width=48"
                            width={32}
                            height={32}
                            alt={item.title}
                            className="object-contain"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            {getIcon(item.type)}
                            <h3 className="font-medium">{item.title}</h3>
                          </div>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                          <div className="flex justify-between mt-1">
                            <p className="text-xs text-gray-400">{item.date}</p>
                            <p
                              className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Image
                              src="/imgs/points/coin.png"
                              width={16}
                              height={16}
                              alt="Coin"
                              className="object-contain"
                            />
                            <span className="text-sm font-bold text-amber-500">
                              -{item.points}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="used" className="mt-4">
            <div className="space-y-4">
              {redeemHistory
                .filter((item) => item.status === "Đã sử dụng")
                .map((item) => (
                  <Card key={item.id} className="border-none shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=48&width=48"
                            width={32}
                            height={32}
                            alt={item.title}
                            className="object-contain"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            {getIcon(item.type)}
                            <h3 className="font-medium">{item.title}</h3>
                          </div>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                          <div className="flex justify-between mt-1">
                            <p className="text-xs text-gray-400">{item.date}</p>
                            <p
                              className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Image
                              src="/imgs/points/coin.png"
                              width={16}
                              height={16}
                              alt="Coin"
                              className="object-contain"
                            />
                            <span className="text-sm font-bold text-amber-500">
                              -{item.points}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
