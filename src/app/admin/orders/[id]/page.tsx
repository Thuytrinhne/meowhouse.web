import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Printer,
  ChevronDown,
  Phone,
  Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OrderDetailsPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <span>Orders</span>
        <ChevronRight className="h-4 w-4" />
        <span>Order details</span>
      </div>

      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order #32543</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5"></span>
              Paid
            </Badge>
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5"></span>
              Fulfilled
            </Badge>
            <span className="text-muted-foreground text-sm ml-2">
              <span className="inline-block mr-1">📅</span> Aug 17, 2020, 5:48
              (ET)
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
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print order
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          More options
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <Separator className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Order Details */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Order details</h2>
              <Badge variant="secondary" className="rounded-md">
                4
              </Badge>
            </div>
            <Button variant="link" className="text-blue-500 p-0 h-auto">
              Edit
            </Button>
          </div>

          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="divide-y">
                {/* Product 1 */}
                <div className="flex items-start p-4 gap-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Topman shoe in green"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">Topman shoe in green</h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      <div>Gender: Women</div>
                      <div>Color: Green</div>
                      <div>Size: UK 7</div>
                    </div>
                  </div>
                  <div className="text-center px-4">
                    <div className="font-medium">$21.00</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="font-medium">2</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$42.00</div>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="flex items-start p-4 gap-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Office Notebook"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">Office Notebook</h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      <div>Color: Gray</div>
                    </div>
                  </div>
                  <div className="text-center px-4">
                    <div className="font-medium">$9.00</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="font-medium">1</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$9.00</div>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="flex items-start p-4 gap-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="RayBan sunglasses"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">RayBan sunglasses</h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      <div>Gender: Unisex</div>
                      <div>Color: Black</div>
                      <div>Size: One size</div>
                    </div>
                  </div>
                  <div className="text-center px-4">
                    <div className="font-medium">$14.00</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="font-medium">1</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$14.00</div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-4">
                  <div className="ml-auto w-full max-w-xs space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-medium">$65.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Shipping fee:
                      </span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax:</span>
                      <span className="font-medium">$7.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>$65.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Amount paid:
                      </span>
                      <span className="font-medium">$65.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {/* Customer Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Customer</h2>
              <Card>
                <CardContent className="p-4">
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
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4">
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
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Contact info</h2>
                <Button variant="link" className="text-blue-500 p-0 h-auto">
                  Edit
                </Button>
              </div>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>ella@site.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+1 (609) 972-22-22</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shipping Address */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Shipping address</h2>
                <Button variant="link" className="text-blue-500 p-0 h-auto">
                  Edit
                </Button>
              </div>
              <Card>
                <CardContent className="p-4">
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
                </CardContent>
              </Card>
            </div>

            {/* Billing Address */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Billing address</h2>
                <Button variant="link" className="text-blue-500 p-0 h-auto">
                  Edit
                </Button>
              </div>
              <Card>
                <CardContent className="p-4">
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
                </CardContent>
              </Card>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Mastercard</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>Card Number: ******4291</div>
                    <Button variant="outline" className="h-8">
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
