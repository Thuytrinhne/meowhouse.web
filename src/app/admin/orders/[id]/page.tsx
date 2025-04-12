"use client";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Printer,
  ChevronDown,
  Phone,
  Mail,
  Copy,
  X,
  Archive,
  Eye,
  Pencil,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { fetchData } from "@/utils/functions/server";
import { ADMIN_ORDER_URL } from "@/utils/constants/urls";
import { formatDateTime } from "@/utils/functions/convert";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetchData(`${ADMIN_ORDER_URL}/${id}`);
        if (res.order) {
          setOrder(res.order);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);
  const orderStatuses = ["unpaid", "delivering", "delivered", "canceled"];
  const statusLabels: Record<(typeof orderStatuses)[number], string> = {
    unpaid: "Chưa thanh toán",
    delivering: "Đang giao hàng",
    delivered: "Đã giao",
    canceled: "Đã hủy",
  };

  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    console.log("jjj");
    if (newStatus === order.order_status || updatingStatus) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`${ADMIN_ORDER_URL}/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrder({ ...order, order_status: newStatus });
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="w-full py-2 flex flex-col items gap-4">
      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center ml-8">
        <div className="flex gap-3">
          <h1 className="text-2xl font-bold">
            Order #{order.order_id.split(".")[0]}
          </h1>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5"></span>
              {statusLabels[order.order_status] || order.order_status}
            </Badge>
            <span className="text-muted-foreground text-sm ml-2">
              <span className="inline-block mr-1">📅</span>{" "}
              {formatDateTime(order.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mb-5 justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print order
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                More options
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <X className="h-4 w-4 mr-2" />
                Cancel order
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View order status page
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Edit order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex overflow-x-auto px-2 pb-3">
          {orderStatuses.map((status, index) => {
            const isActive = order.order_status === status;
            const isFirst = index === 0;
            const isLast = index === orderStatuses.length - 1;

            return (
              <Button
                key={status}
                onClick={() => handleStatusChange(status)}
                variant={isActive ? "default" : "ghost"}
                className={`
          text-sm px-4 py-2 
          transition-colors border 
          ${isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-accent"}
          ${isFirst ? "rounded-l-full" : ""}
          ${isLast ? "rounded-r-full" : ""}
          ${!isFirst && !isLast ? "rounded-none" : ""}
          -ml-px
        `}>
                {statusLabels[status] || status}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator className="mb-5" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Order Detail */}
        <div className="lg:col-span-2  bg-white p-4 rounded">
          {/* Order Details */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Order details</h2>
              <Badge variant="secondary" className="rounded-md">
                {order.order_products.length}
              </Badge>
            </div>

            <Button variant="link" className="text-blue-500 p-0 h-auto">
              Edit
            </Button>
          </div>
          <Separator />

          <div className="divide-y">
            {/* Products*/}
            {order?.order_products?.map((product: any, index: number) => (
              <div className="flex items-start gap-4 py-6" key={index}>
                {/* Image */}
                <div className="w-16 h-16 overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image
                    src={product.variant_img}
                    alt={product.product_name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                {/* Remaining */}
                <div className="flex-1 grid grid-cols-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">{product.product_name}</h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      <div>Gender: Women</div>
                      <div>Color: Green</div>
                      <div>Size: UK 7</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-left grow px-4">
                      <div className="font-medium">
                        {(
                          product.unit_price *
                          ((100 - product.discount_percent) / 100)
                        ).toFixed(0)}
                      </div>
                    </div>
                    <div className="text-center grow px-4">
                      <div className="font-medium">{product.quantity}</div>
                    </div>
                    <div className="text-right grow">
                      <div className="font-medium">
                        {(
                          product.unit_price *
                          ((100 - product.discount_percent) / 100) *
                          product.quantity
                        ).toFixed(0)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Order Summary */}
            <div className="p-4">
              <div className="ml-auto w-full max-w-xs space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">
                    {order.final_cost - order.shipping_cost}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping fee:</span>
                  <span className="font-medium">{order.shipping_cost}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax:</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>{order.final_cost}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount paid:</span>
                  <span className="font-medium">{order.final_cost}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Customer Info */}
        <div className=" bg-white rounded">
          {/* Customer Information */}
          <h2 className="text-lg font-semibold p-4 ">Customer</h2>
          <Separator />
          <div className="space-y-6 p-4 mt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Amanda Harvey"
                  />
                  <AvatarFallback>AH</AvatarFallback>
                </Avatar>
                <span className="font-medium">Amanda Harvey</span>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Separator />

            {/* Order  */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <span>7 orders</span>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Separator />
            {/* Contact Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Contact info</h3>
                <Button variant="link" className="text-blue-500 p-0 h-auto">
                  Edit
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>ella@site.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (609) 972-22-22</span>
              </div>
            </div>
            <Separator />

            {/* Shipping Address */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Shipping address</h3>
                <Button variant="link" className="text-blue-500 p-0 h-auto">
                  Edit
                </Button>
              </div>

              <div className="space-y-1">
                <p>45 Roker Terrace</p>
                <p>Latheronwheel</p>
                <p>KW5 8NW, London</p>
                <p className="flex items-center gap-1">
                  UK{" "}
                  <span className="inline-block w-5 h-3.5 rounded-sm overflow-hidden bg-red-100">
                    🇬🇧
                  </span>
                </p>
              </div>
            </div>
            <Separator />

            {/* Billing Address */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Billing address</h3>
                <Button variant="link" className="text-blue-500 p-0 h-auto">
                  Edit
                </Button>
              </div>

              <div className="space-y-1">
                <p>45 Roker Terrace</p>
                <p>Latheronwheel</p>
                <p>KW5 8NW, London</p>
                <p className="flex items-center gap-1">
                  UK{" "}
                  <span className="inline-block w-5 h-3.5 rounded-sm overflow-hidden bg-red-100">
                    🇬🇧
                  </span>
                </p>
              </div>
            </div>
            <Separator />

            {/* Payment Method */}
            <div>
              <h3 className="text-base font-semibold mb-4">Mastercard</h3>

              <div className="flex justify-between items-center">
                <div>Card Number: ******4291</div>
                <Button variant="outline" className="h-8">
                  Customize
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
