import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/order";
import { convertNumberToVND, formatDateTime } from "@/utils/functions/convert";
import { useRouter } from "next/navigation";

interface DataTableProps {
  orders: Order[];
}

export function DataTable({ orders }: DataTableProps) {
  const router = useRouter();

  const handleOnclickOrder = (id: string) => {
    router.push(`/admin/orders/${id}`);
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="w-[40px] p-4">
              <Checkbox />
            </th>
            <th className="text-left p-4 font-medium text-sm">Order ID</th>
            <th className="text-left p-4 font-medium text-sm">Product Name</th>
            <th className="text-left p-4 font-medium text-sm">Customer Name</th>
            <th className="text-left p-4 font-medium text-sm">Date</th>
            <th className="text-left p-4 font-medium text-sm">Payment</th>
            <th className="text-left p-4 font-medium text-sm">Amount</th>
            <th className="text-left p-4 font-medium text-sm">Status</th>
            <th className="text-left p-4 font-medium text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={index}
              className="border-b hover:bg-muted/50 cursor-pointer"
              onClick={() => handleOnclickOrder(order._id)}>
              <td className="p-4">
                <Checkbox />
              </td>
              <td className="p-4 font-medium">{order.order_id}</td>
              <td className="p-4">
                <div>
                  {order.order_products[0].product_name}
                  {order.order_products[1] && (
                    <div className="text-sm text-muted-foreground">
                      +{order.order_products.length - 1} other products
                    </div>
                  )}
                </div>
              </td>
              <td className="p-4">
                {order.order_buyer.name} - {order.order_buyer.phone_number}
              </td>
              <td className="p-4">{formatDateTime(order.createdAt)}</td>
              <td className="p-4">{order.payment_method}</td>
              <td className="p-4">{convertNumberToVND(order.final_cost)}</td>
              <td className="p-4">
                <StatusBadge status={order.order_status} />
              </td>
              <td className="p-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-md hover:bg-muted">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Edit order</DropdownMenuItem>
                    <DropdownMenuItem>Cancel order</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: Order["order_status"] }) {
  let variant: "outline" | "secondary" | "destructive" | "default";

  switch (status) {
    case "delivered":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
          Completed
        </Badge>
      );
    case "delivering":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800">
          In Progress
        </Badge>
      );
    case "unpaid":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800">
          Waiting
        </Badge>
      );
    case "canceled":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800">
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
