"use client";

// import libs
import React from "react";
import {
  HandCoins,
  ShoppingCart,
  Star,
  UserRoundPlus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  Pie,
  PieChart,
} from "recharts";

// import components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// import utils
import { convertNumberToVND } from "@/utils/functions/convert";

// import data
import { PAGE_DATA } from "@/data/admin";

const revenueChartConfig = {
  revenue: {
    label: "Doanh thu",
    color: "#2563eb",
  },
} satisfies ChartConfig;
import { useEffect, useState } from "react";
import { ADMIN_STATISTIC } from "@/utils/constants/urls";

const orderChartConfig = {
  newOrders: {
    label: "Đơn hàng mới",
    color: "rgb(34 197 94)",
  },
  paidOrders: {
    label: "Đã thanh toán",
    color: "rgb(14 165 233)",
  },
  canceledOrders: {
    label: "Bị hủy",
    color: "rgb(244 63 94)",
  },
} satisfies ChartConfig;

const productByCategoryChartConfig = {
  percent: {
    label: "Phần trăm",
  },
  category: { label: "Danh mục" },
  category1: {
    label: "Danh mục 1",
    color: "rgb(34 197 94)",
  },
  category2: {
    label: "Danh mục 2",
    color: "rgb(14 165 233)",
  },
  category3: {
    label: "Danh mục 3",
    color: "rgb(244 63 94)",
  },
  category4: {
    label: "Danh mục 4",
    color: "rgb(217 70 239)",
  },
  category5: {
    label: "Danh mục 5",
    color: "rgb(234 179 8)",
  },
} satisfies ChartConfig;

export default function AdminDashboard() {
  const [summaryData, setSummaryData] = useState({
    totalRevenue: 0,
    totalRevenueToday: 0,
    totalNewCustomers: 0,
    totalNewOrders: 0,
    totalNewRating: 0,
    revenueGrowthRate: 0,
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [quarterlyOrders, setQuarterlyOrders] = useState([]);
  const [productByCategoryData, setProductByCategoryData] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`${ADMIN_STATISTIC}/dashboard-summary`);
        const json = await res.json();

        if (res.ok && json?.data.summaryData) {
          setSummaryData(json.data.summaryData);
        } else {
          console.error("Lỗi dữ liệu summary:", json.message);
        }
      } catch (err) {
        console.error("Lỗi khi gọi API dashboard summary:", err);
      }
    };
    const fetchMonthlyRevenue = async () => {
      try {
        const res = await fetch(`${ADMIN_STATISTIC}/revenue-monthly`);
        const json = await res.json();

        if (res.ok && json?.data?.revenueData) {
          setMonthlyRevenue(json.data.revenueData);
        } else {
          console.error("Lỗi dữ liệu revenue monthly:", json.message);
        }
      } catch (err) {
        console.error("Lỗi khi gọi API monthly revenue:", err);
      }
    };
    const fetchQuarterlyOrderStats = async () => {
      try {
        const res = await fetch(`${ADMIN_STATISTIC}/quarterly-order-stats`);
        const json = await res.json();

        if (res.ok && json?.data) {
          setQuarterlyOrders(json.data); // ← đúng key trả về
        } else {
          console.error("Lỗi dữ liệu quarterly order stats:", json.message);
        }
      } catch (err) {
        console.error("Lỗi khi gọi API quarterly order stats:", err);
      }
    };
    const fetchRevenueByCategory = async () => {
      try {
        const res = await fetch(`${ADMIN_STATISTIC}/revenue-by-category`);
        const json = await res.json();

        if (res.ok && json?.data) {
          setProductByCategoryData(json.data);
        } else {
          console.error("Lỗi dữ liệu quarterly order stats:", json.message);
        }
      } catch (err) {
        console.error("Lỗi khi gọi API quarterly order stats:", err);
      }
    };

    fetchMonthlyRevenue();
    fetchSummary();
    fetchQuarterlyOrderStats();
    fetchRevenueByCategory();
  }, []);

  return (
    <main className="w-full py-2 flex flex-col items gap-4">
      <section className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <h1 className="ml-8 text-3xl font-bold text-gray-900 dark:text-gray-200 text-wrap">
              {PAGE_DATA["dashboard"]}
            </h1>
          </div>
        </div>
      </section>

      <section className="grid phone_large:grid-cols-2 laptop:grid-cols-4 gap-4">
        <div className="w-full bg-white dark:bg-zinc-950 p-3 flex flex-row gap-3 rounded-xl border-[1px]">
          <div className="w-1/4 h-full flex justify-center items-center bg-yellow-300 dark:bg-yellow-500 rounded-lg">
            <HandCoins className="w-10 h-10" />
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="text-gray-600 dark:text-gray-300 font-medium">
              {PAGE_DATA["dashboard-revenue"]}
            </h6>
            <p className="text-2xl font-bold">
              {convertNumberToVND(summaryData.totalRevenueToday)}
            </p>
          </div>
        </div>

        <div className="w-full bg-white dark:bg-zinc-950 p-3 flex flex-row gap-3 rounded-xl border-[1px]">
          <div className="w-1/4 h-full flex justify-center items-center bg-blue-300 dark:bg-blue-500 rounded-lg">
            <UserRoundPlus className="w-10 h-10" />
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="text-gray-600 dark:text-gray-300 font-medium">
              {PAGE_DATA["dashboard-registation"]}
            </h6>
            <p className="text-2xl font-bold">
              {convertNumberToVND(summaryData.totalNewCustomers, false)}
            </p>
          </div>
        </div>

        <div className="w-full bg-white dark:bg-zinc-950 p-3 flex flex-row gap-3 rounded-xl border-[1px]">
          <div className="w-1/4 h-full flex justify-center items-center bg-red-300 dark:bg-red-500 rounded-lg">
            <ShoppingCart className="w-10 h-10" />
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="text-gray-600 dark:text-gray-300 font-medium">
              {PAGE_DATA["dashboard-order"]}
            </h6>
            <p className="text-2xl font-bold">
              {convertNumberToVND(summaryData.totalNewOrders, false)}
            </p>
          </div>
        </div>

        <div className="w-full bg-white dark:bg-zinc-950 p-3 flex flex-row gap-3 rounded-xl border-[1px]">
          <div className="w-1/4 h-full flex justify-center items-center bg-green-300 dark:bg-green-500 rounded-lg">
            <Star className="w-10 h-10" />
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="text-gray-600 dark:text-gray-300 font-medium">
              {PAGE_DATA["dashboard-rating"]}
            </h6>
            <p className="text-2xl font-bold">
              {convertNumberToVND(summaryData.totalNewRating, false)}
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{PAGE_DATA["dashboard-revenue-chart-title"]}</CardTitle>
          <CardDescription>
            {PAGE_DATA["dashboard-revenue-chart-description"]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={revenueChartConfig}
            className="max-h-[400px] w-full">
            <BarChart accessibilityLayer data={monthlyRevenue}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                // tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="revenue"
                fill="var(--color-revenue)"
                fillOpacity={0.7}
                radius={8}
                strokeWidth={2}
                activeIndex={monthlyRevenue.findIndex((item) =>
                  item.month.includes(`Tháng ${new Date().getMonth() + 1}`)
                )}
                activeBar={({ ...props }) => {
                  return (
                    <Rectangle
                      {...props}
                      fillOpacity={1}
                      stroke="var(--color-revenue)"
                      strokeDasharray={4}
                      strokeDashoffset={4}
                    />
                  );
                }}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            {PAGE_DATA["dashboard-revenue-chart-footer"]}
            <span
              className={
                summaryData.revenueGrowthRate >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }>
              {summaryData.revenueGrowthRate}%
            </span>{" "}
            {summaryData.revenueGrowthRate >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}{" "}
          </div>
        </CardFooter>
      </Card>

      <section className="grid phone_large:grid-cols-1 laptop:grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>{PAGE_DATA["dashboard-order-chart-title"]}</CardTitle>
            <CardDescription>
              {PAGE_DATA["dashboard-order-chart-description"]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={orderChartConfig}
              className="max-h-[400px] w-full">
              <BarChart accessibilityLayer data={quarterlyOrders}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="quarter"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  // tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />

                <Bar
                  dataKey="newOrders"
                  fill="var(--color-newOrders)"
                  fillOpacity={0.7}
                  radius={8}
                  strokeWidth={2}
                  activeIndex={2}
                  activeBar={({ ...props }) => {
                    return (
                      <Rectangle
                        {...props}
                        fillOpacity={1}
                        stroke="var(--color-newOrders)"
                        strokeDasharray={4}
                        strokeDashoffset={4}
                      />
                    );
                  }}
                />

                <Bar
                  dataKey="paidOrders"
                  fill="var(--color-paidOrders)"
                  fillOpacity={0.7}
                  radius={8}
                  strokeWidth={2}
                  activeIndex={2}
                  activeBar={({ ...props }) => {
                    return (
                      <Rectangle
                        {...props}
                        fillOpacity={1}
                        stroke="var(--color-paidOrders)"
                        strokeDasharray={4}
                        strokeDashoffset={4}
                      />
                    );
                  }}
                />

                <Bar
                  dataKey="canceledOrders"
                  fill="var(--color-canceledOrders)"
                  fillOpacity={0.7}
                  radius={8}
                  strokeWidth={2}
                  activeIndex={2}
                  activeBar={({ ...props }) => {
                    return (
                      <Rectangle
                        {...props}
                        fillOpacity={1}
                        stroke="var(--color-canceledOrders)"
                        strokeDasharray={4}
                        strokeDashoffset={4}
                      />
                    );
                  }}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>
              {PAGE_DATA["dashboard-product-by-category-chart-title"]}
            </CardTitle>
            <CardDescription>
              {PAGE_DATA["dashboard-product-by-category-chart-description"]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={productByCategoryChartConfig}
              className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={productByCategoryData}
                  dataKey="percent"
                  label
                  nameKey="category"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
