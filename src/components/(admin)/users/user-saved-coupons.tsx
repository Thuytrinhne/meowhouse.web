"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TicketIcon,
  CalendarIcon,
  PercentIcon,
  TagIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface UserSavedCouponsProps {
  coupons: string[];
}

// This would be replaced with actual API call in a real application
const fetchCouponDetails = async (couponId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Mock data
  const isExpired = Math.random() > 0.7;
  const expiryDate = new Date();
  expiryDate.setDate(
    expiryDate.getDate() +
      (isExpired
        ? -Math.floor(Math.random() * 30)
        : Math.floor(Math.random() * 30))
  );

  return {
    id: couponId,
    code: `COUPON${Math.floor(Math.random() * 10000)}`,
    discount: Math.floor(Math.random() * 50) + 5,
    type: Math.random() > 0.5 ? "percent" : "fixed",
    minPurchase: Math.floor(Math.random() * 500000) + 100000,
    expiryDate: expiryDate.toISOString(),
    isExpired,
    description: `Discount for ${["all products", "electronics", "clothing", "accessories"][Math.floor(Math.random() * 4)]}`,
  };
};

export default function UserSavedCoupons({ coupons }: UserSavedCouponsProps) {
  const [couponDetails, setCouponDetails] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCoupons = async () => {
      if (coupons.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const details: Record<string, any> = {};

        for (const couponId of coupons) {
          details[couponId] = await fetchCouponDetails(couponId);
        }

        setCouponDetails(details);
      } catch (error) {
        console.error("Error fetching coupon details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCoupons();
  }, [coupons]);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TicketIcon className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl font-bold">Saved Coupons</CardTitle>
          </div>
          <Badge variant="outline">{coupons.length} coupons</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : coupons.length > 0 ? (
          <div className="space-y-4">
            {coupons.map((couponId) => {
              const coupon = couponDetails[couponId];
              if (!coupon) return null;

              return (
                <div
                  key={couponId}
                  className={`border rounded-lg p-4 ${coupon.isExpired ? "bg-muted/30" : ""}`}>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{coupon.code}</h3>
                        {coupon.isExpired ? (
                          <Badge
                            variant="outline"
                            className="text-muted-foreground">
                            Expired
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Active</Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {coupon.description}
                      </p>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          {coupon.type === "percent" ? (
                            <PercentIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          ) : (
                            <TagIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                          <span>
                            {coupon.type === "percent"
                              ? `${coupon.discount}% off`
                              : `${formatCurrency(coupon.discount)} off`}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{formatDate(coupon.expiryDate)}</span>
                        </div>
                      </div>

                      {coupon.minPurchase > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Min. purchase: {formatCurrency(coupon.minPurchase)}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      title="View Coupon Details"
                      asChild>
                      <a
                        href={`/admin/coupons/${couponId}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <TicketIcon className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">No saved coupons</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
