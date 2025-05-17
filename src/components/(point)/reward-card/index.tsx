"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Gift, Ticket, Award, AlertCircle } from "lucide-react";

interface RewardCardProps {
  title: string;
  description: string;
  points: number;
  image: string;
  type: "voucher" | "gift" | "special";
  featured?: boolean;
}

export default function RewardCard({
  title,
  description,
  points,
  image,
  type,
  featured = false,
}: RewardCardProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleRedeem = () => {
    // Check if user has enough points
    const userPoints = 100; // This would come from your state/context

    if (userPoints >= points) {
      setShowDialog(false);
      setShowSuccess(true);
    } else {
      setShowDialog(false);
      setShowError(true);
    }
  };

  const getIcon = () => {
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

  const getBgColor = () => {
    switch (type) {
      case "voucher":
        return "bg-pink-100";
      case "gift":
        return "bg-amber-100";
      case "special":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <>
      <Card
        className={`border-none shadow-md overflow-hidden h-full ${featured ? "ring-2 ring-amber-400" : ""}`}>
        <CardContent className="p-0 flex flex-col h-full">
          <div
            className={`${getBgColor()} p-2 flex items-center justify-center h-32 relative`}>
            {featured && (
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs py-1 px-2 rounded-bl-md">
                Hot
              </div>
            )}
            <Image
              src={image || "/placeholder.svg"}
              width={80}
              height={80}
              alt={title}
              className="object-contain"
            />
          </div>
          <div className="p-3 bg-white flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 mb-1">
                {getIcon()}
                <h3 className="text-sm font-medium text-gray-800">{title}</h3>
              </div>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Image
                  src="/placeholder.svg?height=16&width=16"
                  width={16}
                  height={16}
                  alt="Coin"
                  className="object-contain"
                />
                <span className="text-sm font-bold text-amber-500">
                  {points}
                </span>
              </div>
              <Button
                size="sm"
                onClick={() => setShowDialog(true)}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white">
                Đổi
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Xác nhận đổi xu</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn đổi {points} xu để nhận {title}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <div className="bg-amber-100 p-4 rounded-full">
              <Image
                src={image || "/placeholder.svg"}
                width={100}
                height={100}
                alt={title}
                className="object-contain"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Phần thưởng:</span>
              <span className="text-sm font-medium">{title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Mô tả:</span>
              <span className="text-sm">{description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Xu cần thiết:</span>
              <span className="text-sm font-bold text-amber-500">{points}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Xu hiện có:</span>
              <span className="text-sm font-bold text-amber-500">100</span>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Hủy
            </Button>
            <Button
              onClick={handleRedeem}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white">
              Xác nhận đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">
              Đổi xu thành công!
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <Image
                src="/placeholder.svg?height=80&width=80"
                width={80}
                height={80}
                alt="Success"
                className="object-contain"
              />
            </div>
            <p className="text-center">
              Bạn đã đổi thành công {points} xu để nhận {title}. Phần thưởng của
              bạn sẽ được áp dụng ngay lập tức hoặc gửi đến địa chỉ của bạn.
            </p>
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white"
              onClick={() => setShowSuccess(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-red-600">
              Không đủ xu
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
            <p className="text-center">
              Bạn không có đủ xu để đổi phần thưởng này. Hãy tích lũy thêm xu
              bằng cách đăng nhập hàng ngày hoặc hoàn thành các nhiệm vụ.
            </p>
          </div>
          <DialogFooter>
            <Button
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white"
              onClick={() => setShowError(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
