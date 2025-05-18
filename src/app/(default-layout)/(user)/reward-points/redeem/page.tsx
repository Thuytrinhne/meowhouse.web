import { ArrowLeft, Search, Filter, PawPrintIcon as Paw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RewardCard from "@/components/(point)/reward-card";
import Image from "next/image";

export default function RedeemPage() {
  return (
    <div className="w-[100%] dark:bg-black dark:border-gray-700 mx-auto bg-pink-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-400 to-amber-500 p-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/reward-points" className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold text-white flex-1 text-center">
          Đổi Xu Meow House
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Points Balance */}
      <div className="bg-gradient-to-b from-amber-400 to-amber-300 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <Image
              src="/imgs/points/coin.png"
              width={24}
              height={24}
              alt="Coin"
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-amber-800 text-sm">Xu khả dụng</span>
            <h2 className="text-xl font-bold text-white">100</h2>
          </div>
        </div>
        <Link href="points-history">
          <Button
            variant="outline"
            className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Lịch sử đổi xu
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="p-4 bg-white shadow-sm">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm phần thưởng"
              className="pl-9 bg-gray-50 border-gray-200"
            />
          </div>
          <Button variant="outline" size="icon" className="border-gray-200">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Cat ears decoration */}
      <div className="relative h-6 overflow-hidden bg-white">
        <div className="absolute w-10 h-10 bg-pink-50 rounded-full -bottom-5 left-1/2 -translate-x-[20px] transform rotate-45"></div>
        <div className="absolute w-10 h-10 bg-pink-50 rounded-full -bottom-5 left-1/2 translate-x-[10px] transform -rotate-45"></div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 bg-pink-100 p-0 h-auto">
            <TabsTrigger
              value="all"
              className="py-3 data-[state=active]:bg-pink-200 data-[state=active]:text-pink-800 rounded-none">
              Tất cả
            </TabsTrigger>
            <TabsTrigger
              value="vouchers"
              className="py-3 data-[state=active]:bg-pink-200 data-[state=active]:text-pink-800 rounded-none">
              Voucher
            </TabsTrigger>
            <TabsTrigger
              value="gifts"
              className="py-3 data-[state=active]:bg-pink-200 data-[state=active]:text-pink-800 rounded-none">
              Quà tặng
            </TabsTrigger>
            <TabsTrigger
              value="special"
              className="py-3 data-[state=active]:bg-pink-200 data-[state=active]:text-pink-800 rounded-none">
              Đặc biệt
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-pink-800 mb-4 flex items-center gap-2">
                  <Paw className="h-5 w-5 fill-amber-400 stroke-amber-600" />
                  VOUCHER GIẢM GIÁ
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <RewardCard
                    title="Giảm 20.000đ"
                    description="Đơn hàng từ 100.000đ"
                    points={500}
                    image="/placeholder.svg?height=120&width=120"
                    type="voucher"
                  />
                  <RewardCard
                    title="Giảm 50.000đ"
                    description="Đơn hàng từ 200.000đ"
                    points={1000}
                    image="/placeholder.svg?height=120&width=120"
                    type="voucher"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-pink-800 mb-4 flex items-center gap-2">
                  <Paw className="h-5 w-5 fill-amber-400 stroke-amber-600" />
                  QUÀ TẶNG MEOW HOUSE
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <RewardCard
                    title="Móc khóa mèo"
                    description="Móc khóa mèo Meow House"
                    points={1500}
                    image="/placeholder.svg?height=120&width=120"
                    type="gift"
                  />
                  <RewardCard
                    title="Gối ôm mèo"
                    description="Gối ôm mèo siêu mềm"
                    points={3000}
                    image="/placeholder.svg?height=120&width=120"
                    type="gift"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-pink-800 mb-4 flex items-center gap-2">
                  <Paw className="h-5 w-5 fill-amber-400 stroke-amber-600" />
                  ƯU ĐÃI ĐẶC BIỆT
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <RewardCard
                    title="Miễn phí vận chuyển"
                    description="Áp dụng mọi đơn hàng"
                    points={800}
                    image="/placeholder.svg?height=120&width=120"
                    type="special"
                    featured={true}
                  />
                  <RewardCard
                    title="Thẻ thành viên VIP"
                    description="Ưu đãi 1 tháng"
                    points={5000}
                    image="/placeholder.svg?height=120&width=120"
                    type="special"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vouchers" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <RewardCard
                title="Giảm 20.000đ"
                description="Đơn hàng từ 100.000đ"
                points={500}
                image="/placeholder.svg?height=120&width=120"
                type="voucher"
              />
              <RewardCard
                title="Giảm 50.000đ"
                description="Đơn hàng từ 200.000đ"
                points={1000}
                image="/placeholder.svg?height=120&width=120"
                type="voucher"
              />
              <RewardCard
                title="Giảm 100.000đ"
                description="Đơn hàng từ 500.000đ"
                points={2000}
                image="/placeholder.svg?height=120&width=120"
                type="voucher"
              />
              <RewardCard
                title="Giảm 10%"
                description="Tối đa 30.000đ"
                points={600}
                image="/placeholder.svg?height=120&width=120"
                type="voucher"
              />
            </div>
          </TabsContent>

          <TabsContent value="gifts" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <RewardCard
                title="Móc khóa mèo"
                description="Móc khóa mèo Meow House"
                points={1500}
                image="/placeholder.svg?height=120&width=120"
                type="gift"
              />
              <RewardCard
                title="Gối ôm mèo"
                description="Gối ôm mèo siêu mềm"
                points={3000}
                image="/placeholder.svg?height=120&width=120"
                type="gift"
              />
              <RewardCard
                title="Ly sứ mèo"
                description="Ly sứ hình mèo dễ thương"
                points={2000}
                image="/placeholder.svg?height=120&width=120"
                type="gift"
              />
              <RewardCard
                title="Túi vải mèo"
                description="Túi vải canvas Meow House"
                points={2500}
                image="/placeholder.svg?height=120&width=120"
                type="gift"
              />
            </div>
          </TabsContent>

          <TabsContent value="special" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <RewardCard
                title="Miễn phí vận chuyển"
                description="Áp dụng mọi đơn hàng"
                points={800}
                image="/placeholder.svg?height=120&width=120"
                type="special"
                featured={true}
              />
              <RewardCard
                title="Thẻ thành viên VIP"
                description="Ưu đãi 1 tháng"
                points={5000}
                image="/placeholder.svg?height=120&width=120"
                type="special"
              />
              <RewardCard
                title="Ưu tiên giao hàng"
                description="Áp dụng 3 đơn hàng"
                points={1200}
                image="/placeholder.svg?height=120&width=120"
                type="special"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
