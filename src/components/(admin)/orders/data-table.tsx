import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type Order = {
  id: string;
  productName: string;
  additionalProducts?: number;
  customerName: string;
  date: string;
  payment: string;
  amount: string;
  status: "Completed" | "In Progress" | "Waiting" | "Cancelled";
};

interface DataTableProps {
  orders: Order[];
}

export function DataTable({ orders }: DataTableProps) {
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
            <tr key={index} className="border-b hover:bg-muted/50">
              <td className="p-4">
                <Checkbox />
              </td>
              <td className="p-4 font-medium">{order.id}</td>
              <td className="p-4">
                <div>
                  {order.productName}
                  {order.additionalProducts && (
                    <div className="text-sm text-muted-foreground">
                      +{order.additionalProducts} other products
                    </div>
                  )}
                </div>
              </td>
              <td className="p-4">{order.customerName}</td>
              <td className="p-4">{order.date}</td>
              <td className="p-4">{order.payment}</td>
              <td className="p-4">{order.amount}</td>
              <td className="p-4">
                <StatusBadge status={order.status} />
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

function StatusBadge({ status }: { status: Order["status"] }) {
  let variant: "outline" | "secondary" | "destructive" | "default";

  switch (status) {
    case "Completed":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
          Completed
        </Badge>
      );
    case "In Progress":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800">
          In Progress
        </Badge>
      );
    case "Waiting":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800">
          Waiting
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800">
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
