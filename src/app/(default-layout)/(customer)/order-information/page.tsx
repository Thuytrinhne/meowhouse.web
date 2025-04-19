"use client";

// import libs
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  ChevronRight,
  Ticket,
  MapPin,
  CreditCard,
  Wallet,
  X,
  Check,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/libs/utils";

// import components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// import utils
import { convertNumberToVND } from "@/utils/functions/convert";
import { PRODUCT_ORDER_URL, USER_URL } from "@/utils/constants/urls";
import { SHIPPING_COST } from "@/utils/constants/variables";

// import types
import { IOrderProduct } from "@/types/interfaces";
import { Address } from "@/types/address";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { ICoupon } from "@/types/interfaces";
import { PUBLIC_CUSTOMER_COUPON_URL } from "@/utils/constants/urls";
// Định nghĩa kiểu dữ liệu cho mã giảm giá
type CouponType = "Free Ship" | "Order";

export default function OrderInformationPage() {
  const searchParams = useSearchParams();
  const fromCart = searchParams.get("from_cart") === "true";

  const { data: session } = useSession(); // Lấy thông tin session

  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [productInfo, setProductInfo] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [orderNote, setOrderNote] = useState<string>("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [defaultAddress, setDefaultAddresses] = useState<Address>();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [coupons, setCoupon] = useState<ICoupon[]>([]);

  const shippingFee = SHIPPING_COST; // Fixed shipping fee
  const [selectedCoupons, setSelectedCoupons] = useState<
    Record<CouponType, ICoupon | null>
  >({
    "Free Ship": null,
    Order: null,
  });

  const router = useRouter();
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch(
          `${PUBLIC_CUSTOMER_COUPON_URL}/${session.user.id}?limit=default`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            // Nếu cần thêm token:
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch coupons");

        const data = await res.json();
        setCoupon(data.data);
        console.log("Danh sách coupons:", data.data);
        return data;
      } catch (error) {
        console.error("Lỗi khi lấy coupons:", error);
        return null;
      }
    };

    fetchCoupons();
  }, [session]);

  useEffect(() => {
    const fetchProductInfo = async () => {
      const savedProducts = localStorage.getItem("buyNowProducts");

      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);

        try {
          const response = await fetch(PRODUCT_ORDER_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(parsedProducts),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch product data");
          }

          const data = await response.json();
          // console.log("dataaaaaa", data);
          // console.log("Fetched products:", data.data.products);
          setProductInfo(data.data.products); // Lưu thông tin sản phẩm để hiển thị
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    };

    const fetchAddresses = async () => {
      if (!session?.user?.accessToken) return;
      try {
        const response = await fetch(
          `${USER_URL}/${session?.user?.id}/addresses`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setAddresses(data.data);
          setDefaultAddresses(
            data.data.find(
              (address: { is_default: boolean }) => address.is_default
            )
          );
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    fetchProductInfo();
    fetchAddresses();
  }, [session]);

  useEffect(() => {
    // Fetch administrative data
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => setCities(response.data))
      .catch((error) =>
        console.error("Error fetching administrative data:", error)
      );
  }, []);

  useEffect(() => {
    if (defaultAddress) {
      setUserName(defaultAddress.full_name || "");
      setUserPhone(defaultAddress.phone || "");
      setSelectedCity(defaultAddress.province.name || "");
      setSelectedDistrict(defaultAddress.district.name || "");
      setSelectedWard(defaultAddress.ward.name || "");
      setStreetAddress(defaultAddress.detail_address || "");
    }
  }, [defaultAddress]);

  // Hàm chọn mã giảm giá
  const selectCoupon = (coupon: ICoupon) => {
    setSelectedCoupons((prev) => ({
      ...prev,
      [coupon.coupon_type]:
        prev[coupon.coupon_type]?.coupon_hashed_id === coupon.coupon_hashed_id
          ? null
          : coupon,
    }));
  };

  // Hàm xóa mã giảm giá
  const removeCoupon = (type: CouponType) => {
    setSelectedCoupons((prev) => ({
      ...prev,
      [type]: null,
    }));
  };
  // hàm check điều kiện mã giảm giá
  const checkCouponCondition = (coupon: ICoupon) => {
    const totalAmountBeforeDiscount =
      calculateOriginalPrice() - calculateDiscount();
    const SHIPPING_COST = shippingFee; // Giả sử phí ship cố định

    // Kiểm tra điều kiện của coupon
    if (coupon.coupon_type === "Free Ship") {
      return SHIPPING_COST >= coupon.coupon_condition; // Kiểm tra phí ship có đủ để áp dụng miễn phí ship
    }

    // Kiểm tra điều kiện cho coupon giảm giá
    return totalAmountBeforeDiscount >= coupon.coupon_condition; // Kiểm tra đơn hàng có đủ điều kiện cho coupon giảm giá
  };

  const calculateCouponDiscount = (
    coupon: ICoupon | null,
    baseAmount: number
  ): number => {
    if (!coupon) return 0;

    if (coupon.coupon_unit === "%") {
      const rawDiscount = (coupon.coupon_value / 100) * baseAmount;
      return coupon.coupon_max_value
        ? Math.min(rawDiscount, coupon.coupon_max_value)
        : rawDiscount;
    }

    return coupon.coupon_value;
  };
  const getShippingDiscount = () => {
    const discount = calculateCouponDiscount(
      selectedCoupons["Free Ship"],
      SHIPPING_COST
    );
    return Math.min(discount, SHIPPING_COST); // Không được vượt quá phí ship
  };

  const getOrderDiscount = () => {
    const baseAmount = calculateOriginalPrice() - calculateDiscount(); // Tổng tiền hàng
    const discount = calculateCouponDiscount(
      selectedCoupons["Order"],
      baseAmount
    );
    return Math.min(discount, baseAmount); // Không vượt quá tổng giá trị đơn
  };

  const handleCityChange = (value: string) => {
    const selected = cities.find((city) => city.Id === value);
    console.log("selected", selected);
    setSelectedCity(selected?.Name || "");
    setDistricts(selected?.Districts || []);
    setWards([]);
  };

  const handleDistrictChange = (value: string) => {
    const selected = districts.find((district) => district.Id === value);
    setSelectedDistrict(selected?.Name || "");
    setWards(selected?.Wards || []);
  };

  const handleWardChange = (value: string) => {
    const selected = wards.find((ward) => ward.Id === value);
    setSelectedWard(selected?.Name || "");
  };

  const validateInputs = () => {
    if (!userName.trim()) {
      alert("Vui lòng nhập họ và tên.");
      return false;
    }

    if (!userPhone.trim()) {
      alert("Vui lòng nhập số điện thoại.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(userPhone.trim())) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.");
      return false;
    }

    if (
      !selectedCity ||
      !selectedDistrict ||
      !selectedWard ||
      !streetAddress.trim()
    ) {
      alert("Vui lòng điền đầy đủ địa chỉ nhận hàng.");
      return false;
    }

    return true;
  };

  const calculateOriginalPrice = () => {
    if (!productInfo || productInfo.length === 0) return 0;

    return productInfo.reduce(
      (total: any, product: any) =>
        total + product.product_variant.variant_price * product.quantity,
      0
    );
  };

  const calculateDiscount = () => {
    if (!productInfo || productInfo.length === 0) return 0;

    return productInfo.reduce(
      (total: any, product: any) =>
        total +
        (product.product_variant.variant_price *
          product.quantity *
          product.product_variant.variant_discount_percent) /
          100,
      0
    );
  };

  const calculateTotalPrice = () => {
    if (!productInfo || productInfo.length === 0) return 0;

    const originalPrice = calculateOriginalPrice();
    const discount = calculateDiscount();
    const couponDiscount = getOrderDiscount();
    const freeShipping = getShippingDiscount();

    return (
      originalPrice - discount + shippingFee - couponDiscount - freeShipping
    );
  };

  const handleOrder = async (): Promise<void> => {
    if (!validateInputs()) return; // Validate user inputs

    try {
      if (!productInfo || productInfo.length === 0) {
        alert("Không có sản phẩm nào để đặt hàng!");
        return;
      }

      // Generate a unique order ID
      const orderId = `DH${Date.now()}${
        session
          ? `.${session.user.id}`
          : `.guest${userPhone}_${Math.round(Math.random() * 1000)}`
      }`;

      // Prepare order products data
      const orderProducts = productInfo.map((product: any) => ({
        product_hashed_id: product.product_hashed_id,
        variant_id: product.product_variant._id,
        quantity: product.quantity,
        unit_price: product.product_variant.variant_price,
        discount_percent: product.product_variant.variant_discount_percent,
      }));

      // Define payment data structure
      const newPaymentData = {
        order_id: orderId,
        user_id: session ? session.user.id : undefined,
        order_products: orderProducts,
        order_buyer: {
          name: userName,
          phone_number: userPhone,
          address: {
            province: selectedCity,
            district: selectedDistrict,
            ward: selectedWard,
            street: streetAddress,
          },
        },
        order_note: orderNote || "",
        shipping_cost: shippingFee,
        payment_method: paymentMethod,
        cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order-history?selectedTab=unpaid`, // Cancel URL
        return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order-success?orderId=${encodeURIComponent(orderId)}`, // Success redirect
        from_cart: fromCart,
        applied_coupons: Object.values(selectedCoupons)
          .filter(Boolean)
          .map((coupon) => coupon.coupon_hashed_id),
      };
      // console.log("dataaaaaaaaa neeeeee", newPaymentData);
      if (paymentMethod === "cod") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/payos/create-payment-link`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...newPaymentData, mobile: false }),
          }
        );
        console.log("ressponse", response);
        if (response.ok) {
          router.push(
            `/order-success?orderId=${encodeURIComponent(newPaymentData.order_id)}`
          );
          return;
        }
      }
      // Save payment data to local storage
      localStorage.setItem("paymentData", JSON.stringify(newPaymentData));
      // // Redirect to the payment page
      router.push("/payment");
    } catch (error) {
      console.error("Error processing the order:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Thông tin người nhận hàng */}
      <section className="lg:col-span-3 rounded-lg p-6 shadow-md dark:bg-gray-800 bg-white">
        {/* Địa chỉ giao hàng */}
        <h3 className="font-bold mb-2 text-center">Thông tin nhận hàng</h3>
        <hr className="mb-4 dark:border-white" />
        {session && defaultAddress ? (
          <div className="border p-4 rounded-md ">
            <div className="flex justify-between">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Địa chỉ nhận hàng
              </h4>

              <div className="flex items-center gap-2">
                <Badge
                  variant="default"
                  className="bg-pri-7 text-primary-foreground">
                  Mặc định
                </Badge>

                <button className="text-blue-500">Thay Đổi</button>
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <div>
                {defaultAddress.full_name} - {defaultAddress.phone}
                <br />
                <p>
                  {defaultAddress.province.name}, {defaultAddress.district.name}
                  , {defaultAddress.ward.name}, {defaultAddress.detail_address}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="border p-4 rounded-md ">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Địa chỉ nhận hàng
              </h4>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Họ và tên</label>
                  <Input
                    type="text"
                    placeholder="Nhập họ và tên"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    maxLength={50}
                    name="userName"
                    className="border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Số điện thoại</label>
                  <Input
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    maxLength={10}
                    className="border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm"
                    name="userPhone"
                  />
                </div>
                <div className="flex flex-col md:col-span-2 gap-2">
                  <label className="text-sm font-medium">Địa chỉ</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={
                        cities.find((city) => city.Name === selectedCity)?.Id
                      }
                      onValueChange={handleCityChange}
                      name="city">
                      <SelectTrigger className="border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm">
                        <SelectValue placeholder="Chọn tỉnh/thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {cities.map((city) => (
                            <SelectItem key={city.Id} value={city.Id}>
                              {city.Name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Select
                      onValueChange={handleDistrictChange}
                      value={
                        districts.find(
                          (district) => district.Name === selectedDistrict
                        )?.Id
                      }
                      disabled={!districts.length && selectedCity == ""}
                      name="district">
                      <SelectTrigger className="border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm">
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {districts.map((district) => (
                            <SelectItem key={district.Id} value={district.Id}>
                              {district.Name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Select
                      onValueChange={handleWardChange}
                      value={
                        wards.find((ward) => ward.Name === selectedWard)?.Id
                      }
                      disabled={!wards.length}
                      name="ward">
                      <SelectTrigger className="w-full border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm">
                        <SelectValue placeholder="Chọn phường/xã" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {wards.map((ward) => (
                            <SelectItem key={ward.Id} value={ward.Id}>
                              {ward.Name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      name="streetAddress"
                      type="text"
                      placeholder="Nhập số nhà, đường..."
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      maxLength={100}
                      className="w-full border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm"
                    />
                  </div>

                  <div className="flex flex-col md:col-span-2 gap-2">
                    <label className="text-sm font-medium">Ghi chú</label>
                    <Textarea
                      name="orderNote"
                      placeholder="Nhập ghi chú cho đơn hàng..."
                      maxLength={100}
                      rows={5}
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      className="border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-md p-3 text-sm"></Textarea>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
        {/* Phương thức thanh toán */}

        <div className="border p-4 rounded-md mt-4">
          {/* Header */}
          <div className="flex justify-between">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-600" />
              Phương thức thanh toán
            </h4>
          </div>

          <div className="mt-2">
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-2">
              {/* Thanh toán khi nhận hàng */}
              <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer">
                <RadioGroupItem value="cod" />
                <Wallet className="w-5 h-5 text-gray-600" />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </label>

              {/* Thanh toán online */}
              <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer">
                <RadioGroupItem value="onl" />
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span>Thanh toán online</span>
              </label>
            </RadioGroup>
          </div>
        </div>

        {/* Mã giảm giá */}
        <div className="mt-6 w-full mx-auto">
          <h3 className="font-bold mb-2 text-center">Phiếu giảm giá</h3>
          <hr className="mb-4 dark:border-white" />

          {/* Hiển thị các loại mã giảm giá */}
          {(["Order", "Free Ship"] as CouponType[]).map((type) => (
            <div key={type} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{type}</h3>

              {/* Hiển thị mã giảm giá đã chọn hoặc nút chọn mã */}
              {selectedCoupons[type] ? (
                <div className="flex items-stretch border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-lg overflow-hidden">
                  {/* Phần hình ảnh */}
                  <div className="w-24 flex-shrink-0">
                    <img
                      // src={selectedCoupons[type]?.image || "/placeholder.svg"}
                      src="/placeholder.svg"
                      alt="coupon"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Phần nội dung */}
                  <div className="flex flex-col flex-grow p-4">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-base text-gray-800 dark:text-white">
                        {selectedCoupons[type]?.coupon_name}
                      </h4>
                      <button
                        onClick={() => removeCoupon(type)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                        <X size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Giảm tối đa: {selectedCoupons[type]?.coupon_max_value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Đơn tối thiểu: {selectedCoupons[type]?.coupon_condition}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-300">
                      HSD: {selectedCoupons[type]?.end_time}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Đã áp dụng
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-xs text-blue-600 dark:text-blue-400 underline">
                            Chỉnh sửa
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Chọn mã giảm giá {type}</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="max-h-[60vh]">
                            <div className="space-y-3 p-1">
                              {coupons
                                .filter((coupon) => coupon.coupon_type === type)
                                .map((coupon) => {
                                  const isValidCoupon =
                                    checkCouponCondition(coupon); // Kiểm tra điều kiện
                                  return (
                                    <div
                                      key={coupon.coupon_hashed_id}
                                      className={cn(
                                        "flex items-stretch border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-lg overflow-hidden cursor-pointer",
                                        selectedCoupons[type]
                                          ?.coupon_hashed_id ===
                                          coupon.coupon_hashed_id &&
                                          "border-orange-500 dark:border-orange-500 border-2",
                                        !isValidCoupon &&
                                          "opacity-50 cursor-not-allowed"
                                      )}
                                      onClick={() =>
                                        isValidCoupon && selectCoupon(coupon)
                                      }>
                                      {/* Phần hình ảnh */}
                                      <div className="w-24 flex-shrink-0 relative">
                                        <img
                                          // src={coupon.image || "/placeholder.svg"}
                                          alt="coupon"
                                          className="w-full h-full object-cover"
                                        />
                                        {selectedCoupons[type]
                                          ?.coupon_hashed_id ===
                                          coupon.coupon_hashed_id && (
                                          <div className="absolute top-1 right-1 bg-green-500 rounded-full p-0.5">
                                            <Check
                                              size={14}
                                              className="text-white"
                                            />
                                          </div>
                                        )}
                                      </div>
                                      {/* Phần nội dung */}
                                      <div className="flex flex-col flex-grow p-3">
                                        <h4 className="font-bold text-base text-gray-800 dark:text-white">
                                          {coupon.coupon_name}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                          Giảm tối đa: {coupon.coupon_max_value}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                          Đơn tối thiểu:{" "}
                                          {coupon.coupon_condition}
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-gray-300 mt-1">
                                          HSD: {coupon.end_time}
                                        </p>
                                      </div>
                                      {/* Phần giảm giá */}
                                      <div
                                        className={`${
                                          type === "Free Ship"
                                            ? "bg-pri-7"
                                            : "bg-orange-500"
                                        } text-white px-4 flex items-center justify-center text-lg font-bold`}>
                                        {coupon.coupon_value}
                                        {coupon.coupon_unit}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Phần giảm giá */}
                  <div
                    className={`${
                      type === "Free Ship" ? "bg-pri-7" : "bg-orange-500"
                    } text-white px-4 flex items-center justify-center text-lg font-bold`}>
                    {selectedCoupons[type]?.coupon_value}
                    {selectedCoupons[type]?.coupon_unit}
                  </div>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex items-center border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-lg px-3 py-2 mb-3 gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800">
                      <Ticket className="text-gray-600 dark:text-white" />
                      <span className="text-sm text-gray-600 dark:text-white">
                        Chọn mã giảm giá
                      </span>
                      <ChevronRight className="ml-auto text-gray-500 text-sm dark:text-white" />
                    </div>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Chọn mã giảm giá {type}</DialogTitle>
                    </DialogHeader>

                    <ScrollArea className="max-h-[60vh]">
                      <div className="space-y-3 p-1">
                        {coupons
                          .filter((coupon) => coupon.coupon_type === type)
                          .map((coupon) => {
                            const isValidCoupon = checkCouponCondition(coupon); // Kiểm tra điều kiện
                            return (
                              <div
                                key={coupon.coupon_hashed_id}
                                className={cn(
                                  "flex items-stretch border border-gray-300 dark:border-none dark:bg-zinc-900 rounded-lg overflow-hidden cursor-pointer",
                                  selectedCoupons[type]?.coupon_hashed_id ===
                                    coupon.coupon_hashed_id &&
                                    "border-orange-500 dark:border-orange-500 border-2",
                                  !isValidCoupon &&
                                    "opacity-50 cursor-not-allowed" // Nếu không đủ điều kiện, disable
                                )}
                                onClick={() =>
                                  isValidCoupon && selectCoupon(coupon)
                                } // Không cho chọn nếu không đủ điều kiện
                              >
                                {/* Phần hình ảnh */}
                                <div className="w-24 flex-shrink-0 relative">
                                  <img
                                    // src={coupon.image || "/placeholder.svg"}
                                    src="/placeholder.svg"
                                    alt="coupon"
                                    className="w-full h-full object-cover"
                                  />
                                  {selectedCoupons[type]?.coupon_hashed_id ===
                                    coupon.coupon_hashed_id && (
                                    <div className="absolute top-1 right-1 bg-green-500 rounded-full p-0.5">
                                      <Check size={14} className="text-white" />
                                    </div>
                                  )}
                                </div>

                                {/* Phần nội dung */}
                                <div className="flex flex-col flex-grow p-3">
                                  <h4 className="font-bold text-base text-gray-800 dark:text-white">
                                    {coupon.coupon_name}
                                  </h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Giảm tối đa: {coupon.coupon_max_value}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Đơn tối thiểu: {coupon.coupon_condition}
                                  </p>
                                  <p className="text-xs text-gray-400 dark:text-gray-300 mt-1">
                                    HSD: {coupon.end_time}
                                  </p>
                                </div>

                                {/* Phần giảm giá */}
                                <div className="bg-orange-500 text-white px-4 flex items-center justify-center text-lg font-bold">
                                  {coupon.coupon_value}
                                  {coupon.coupon_unit}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sản phẩm đặt mua */}
      <section className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md h-fit dark:bg-gray-800 sticky top-24">
        <h3 className="font-bold mb-2 text-center">Sản phẩm đặt mua</h3>
        <hr className="mb-4 dark:border-white" />
        {productInfo ? (
          productInfo.map((product: IOrderProduct, index: number) => (
            <div
              key={index}
              className="flex items-center bg-pri-3 p-2 rounded-md dark:bg-pri-6">
              <div className="w-24 h-24 overflow-hidden rounded-md">
                <Image
                  src={product.product_variant.variant_img}
                  alt={product.product_variant.variant_name}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="font-bold text-sm dark:text-white line-clamp-2 mr-6">
                  {product.product_name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-white">
                  Phân loại hàng: {product.product_variant.variant_name}
                </p>
                <div className="flex gap-2 mt-1">
                  {product.product_variant.variant_discount_percent > 0 && (
                    <span className="text-sm text-gray-400 line-through">
                      {convertNumberToVND(
                        product.product_variant.variant_price
                      )}
                    </span>
                  )}
                  <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                    {convertNumberToVND(
                      product.product_variant.variant_price *
                        (1 -
                          product.product_variant.variant_discount_percent /
                            100)
                    )}
                  </span>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-white">
                x{product.quantity}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Không có sản phẩm nào được đặt.</p>
        )}

        <div className="border-t mt-6 pt-4 text-sm">
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Giá gốc</span>
              <span>{convertNumberToVND(calculateOriginalPrice())}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Giảm giá</span>
              <span>-{convertNumberToVND(calculateDiscount())}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Phí vận chuyển
              </span>
              <span>{convertNumberToVND(shippingFee)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Ưu đãi phí vận chuyển
              </span>
              <span>-{convertNumberToVND(getShippingDiscount())}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                MeowHouse Voucher
              </span>
              <span>-{convertNumberToVND(getOrderDiscount())}</span>
            </p>
          </div>
          <div className="flex justify-between items-center mt-4 border-t pt-4 dark:border-white">
            <span className="text-lg font-semibold">Tổng tiền</span>
            <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
              {convertNumberToVND(calculateTotalPrice())}
            </span>
          </div>
          <Button
            className="mt-4 w-full py-3 font-bold"
            data-cy="order-button"
            onClick={handleOrder}
            variant="filled">
            Đặt hàng
          </Button>
          <p className="mt-2 text-xs text-gray-500 text-center dark:text-white">
            Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
            <Link
              href="/delivery-and-payment"
              className="text-teal-500 hover:underline dark:text-teal-300">
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link
              href="/privacy-policy"
              className="text-teal-500 hover:underline dark:text-teal-300">
              Chính sách bảo mật
            </Link>{" "}
            của CatCorner.
          </p>
        </div>
      </section>
    </div>
  );
}
