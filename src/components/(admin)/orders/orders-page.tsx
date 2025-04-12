"use client";

import { useState, useEffect } from "react";
import {
  ArrowDown,
  ArrowUp,
  Box,
  Download,
  FileText,
  Package,
  Search,
  Target,
  X,
} from "lucide-react";
import type { DateRange } from "react-day-picker";
import { isWithinInterval, startOfDay, endOfDay } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/(admin)/orders/data-table";
import { Pagination } from "@/components/(admin)/orders/pagination";
import { DateRangePicker } from "@/components/(admin)/orders/date-range-picker";
import { fetchData } from "@/utils/functions/server";
import { ADMIN_ORDER_URL } from "@/utils/constants/urls";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [dateFilter, setDateFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState("all");
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetchData(`${ADMIN_ORDER_URL}?page=${currentPage}`);
        setOrders(res.orders);
        setCurrentPage(res.pagination.page);
        setTotalPages(res.pagination.total_pages);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [currentPage]);

  // Reset date range when date filter changes
  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    if (value !== "custom") {
      setDateRange(undefined);
    }
    setCurrentPage(1);
  };

  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from) {
      setDateFilter("custom");
    }
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setDateFilter("all");
    setDateRange(undefined);
    setStatusFilter("all");
    setCurrentPage(1);
  };

  // Filter orders based on search term, date and status
  // const filteredOrders = orders.filter((order) => {
  //   // Text search filter
  //   const matchesSearch =
  //     order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     order.customerName.toLowerCase().includes(searchTerm.toLowerCase());

  //   if (!matchesSearch) return false;

  //   // Date filter
  //   const orderDate = parseOrderDate(order.date);
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   const yesterday = new Date(today);
  //   yesterday.setDate(yesterday.getDate() - 1);

  //   const lastWeekStart = new Date(today);
  //   lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  //   const lastMonthStart = new Date(today);
  //   lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);

  //   let matchesDate = true;

  //   if (dateFilter === "custom" && dateRange?.from) {
  //     // Custom date range filter
  //     if (dateRange.to) {
  //       // Range with both from and to dates
  //       matchesDate = isWithinInterval(orderDate, {
  //         start: startOfDay(dateRange.from),
  //         end: endOfDay(dateRange.to),
  //       });
  //     } else {
  //       // Only from date is selected
  //       matchesDate =
  //         orderDate.getDate() === dateRange.from.getDate() &&
  //         orderDate.getMonth() === dateRange.from.getMonth() &&
  //         orderDate.getFullYear() === dateRange.from.getFullYear();
  //     }
  //   } else {
  //     // Predefined date filters
  //     switch (dateFilter) {
  //       case "today":
  //         matchesDate =
  //           orderDate.getDate() === today.getDate() &&
  //           orderDate.getMonth() === today.getMonth() &&
  //           orderDate.getFullYear() === today.getFullYear();
  //         break;
  //       case "yesterday":
  //         matchesDate =
  //           orderDate.getDate() === yesterday.getDate() &&
  //           orderDate.getMonth() === yesterday.getMonth() &&
  //           orderDate.getFullYear() === yesterday.getFullYear();
  //         break;
  //       case "last7days":
  //         matchesDate = orderDate >= lastWeekStart;
  //         break;
  //       case "last30days":
  //         matchesDate = orderDate >= lastMonthStart;
  //         break;
  //       case "all":
  //       default:
  //         matchesDate = true;
  //         break;
  //     }
  //   }

  //   if (!matchesDate) return false;

  //   // Status filter
  //   if (statusFilter !== "all" && order.status !== statusFilter) {
  //     return false;
  //   }

  //   return true;
  // });

  // Calculate pagination
  // const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const paginatedOrders = filteredOrders.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );

  // Check if any filters are active
  const hasActiveFilters =
    searchTerm !== "" || dateFilter !== "all" || statusFilter !== "all";

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold ml-8">Quản lý đơn hàng</h1>
          {/* Export and time range */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <FileText className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          An overview of recent data of customers info, products details and
          analysis.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-sm text-muted-foreground">Total New Orders</p>
            <h2 className="text-3xl font-bold mt-1">594</h2>
            <span className="inline-flex items-center text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              +54%
            </span>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <FileText className="h-6 w-6 text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Orders Pending
            </p>
            <h2 className="text-3xl font-bold mt-1">257,361</h2>
            <span className="inline-flex items-center text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded mt-1">
              <ArrowDown className="h-3 w-3 mr-1" />
              -10%
            </span>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <Package className="h-6 w-6 text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Products Sales
            </p>
            <h2 className="text-3xl font-bold mt-1">8,594</h2>
            <span className="inline-flex items-center text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              +54%
            </span>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <Target className="h-6 w-6 text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Volume Of Products
            </p>
            <h2 className="text-3xl font-bold mt-1">257,361</h2>
            <span className="inline-flex items-center text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded mt-1">
              <ArrowDown className="h-3 w-3 mr-1" />
              -10%
            </span>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <Box className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Orders Table Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold">All Orders</h2>
              <p className="text-sm text-muted-foreground">
                Keep track of recent order data and others information.
              </p>
            </div>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search here..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
          </div>

          {/* Filters section */}
          <div className="mt-4 space-y-4">
            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Date filter dropdown */}
              <Select value={dateFilter} onValueChange={handleDateFilterChange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range Picker */}
              {(dateFilter === "custom" || dateRange) && (
                <DateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={handleDateRangeChange}
                />
              )}

              {/* Status Filter */}
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1); // Reset to first page on filter change
                }}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Waiting">Waiting</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear filters button */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto">
                  <X className="h-4 w-4 mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Active filters display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mt-2">
                {searchTerm && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Search: {searchTerm}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => setSearchTerm("")}
                    />
                  </Badge>
                )}

                {dateFilter !== "all" && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Date:{" "}
                    {dateFilter === "custom" ? "Custom Range" : dateFilter}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => {
                        setDateFilter("all");
                        setDateRange(undefined);
                      }}
                    />
                  </Badge>
                )}

                {statusFilter !== "all" && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Status: {statusFilter}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => setStatusFilter("all")}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
        <DataTable orders={orders} />

        <div className="p-4 border-t">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
