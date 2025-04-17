"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCartIcon,
  ExternalLinkIcon,
  EditIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CartItem {
  product_id: string;
  variant_id: string;
  quantity: number;
  _id: string;
}

interface UserCartItemsProps {
  cartItems: CartItem[];
}

// This would be replaced with actual API call in a real application
const fetchProductDetails = async (productId: string, variantId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock data
  return {
    name: `Product ${productId.slice(-4)}`,
    price: Math.floor(Math.random() * 500000) + 50000,
    image: `/placeholder.svg?height=80&width=80`,
    variant: {
      name: `Variant ${variantId.slice(-4)}`,
      color: ["Red", "Blue", "Green", "Black"][Math.floor(Math.random() * 4)],
      size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
    },
    availableVariants: [
      {
        id: variantId,
        name: `Variant ${variantId.slice(-4)}`,
        color: ["Red", "Blue", "Green", "Black"][Math.floor(Math.random() * 4)],
        size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
      },
      {
        id: `variant-${Math.random().toString(36).substring(7)}`,
        name: "Alternative Variant",
        color: ["Red", "Blue", "Green", "Black"][Math.floor(Math.random() * 4)],
        size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
      },
    ],
  };
};

export default function UserCartItems({
  cartItems: initialCartItems,
}: UserCartItemsProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    initialCartItems || []
  );
  const [productDetails, setProductDetails] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<CartItem | null>(null);
  const [editIndex, setEditIndex] = useState<number>(-1);

  const loadProductDetails = async (item: CartItem) => {
    const key = `${item.product_id}-${item.variant_id}`;

    if (productDetails[key] || loading[key]) return;

    setLoading((prev) => ({ ...prev, [key]: true }));

    try {
      const details = await fetchProductDetails(
        item.product_id,
        item.variant_id
      );
      setProductDetails((prev) => ({ ...prev, [key]: details }));
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const startEditItem = (item: CartItem, index: number) => {
    setCurrentItem({ ...item });
    setEditIndex(index);
    setIsEditDialogOpen(true);
  };

  const handleEditItem = () => {
    // In a real app, you would make an API call here
    if (currentItem && editIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[editIndex] = currentItem;
      setCartItems(updatedCartItems);
      setIsEditDialogOpen(false);
      setCurrentItem(null);
      setEditIndex(-1);
    }
  };

  const handleDeleteItem = (index: number) => {
    // In a real app, you would make an API call here
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const handleQuantityChange = (value: number) => {
    if (!currentItem) return;

    // Ensure quantity is at least 1
    const newQuantity = Math.max(1, value);
    setCurrentItem({ ...currentItem, quantity: newQuantity });
  };

  const handleVariantChange = (variantId: string) => {
    if (!currentItem) return;
    setCurrentItem({ ...currentItem, variant_id: variantId });
  };

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCartIcon className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl font-bold">Cart Items</CardTitle>
          </div>
          <Badge variant="outline">{cartItems.length} items</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {cartItems.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item, index) => {
                  const key = `${item.product_id}-${item.variant_id}`;
                  const details = productDetails[key];
                  const isLoading = loading[key];

                  if (!details && !isLoading) {
                    loadProductDetails(item);
                  }

                  return (
                    <TableRow key={item._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {isLoading ? (
                            <Skeleton className="h-10 w-10 rounded" />
                          ) : details ? (
                            <img
                              src={details.image || "/placeholder.svg"}
                              alt={details.name}
                              className="h-10 w-10 rounded object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                              <ShoppingCartIcon className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            {isLoading ? (
                              <Skeleton className="h-4 w-24" />
                            ) : details ? (
                              <p className="font-medium">{details.name}</p>
                            ) : (
                              <p className="font-medium text-muted-foreground">
                                Loading...
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              ID: {item.product_id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {isLoading ? (
                          <Skeleton className="h-4 w-16" />
                        ) : details ? (
                          <div>
                            <p className="text-sm">{details.variant.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {details.variant.color} / {details.variant.size}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Loading...
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{item.quantity}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {isLoading ? (
                          <Skeleton className="h-4 w-20 ml-auto" />
                        ) : details ? (
                          <p>{formatCurrency(details.price)}</p>
                        ) : (
                          <p className="text-muted-foreground">--</p>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit Item"
                            onClick={() => startEditItem(item, index)}>
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Remove Item"
                            onClick={() => handleDeleteItem(index)}
                            className="text-destructive hover:text-destructive">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View Product"
                            asChild>
                            <a
                              href={`/admin/products/${item.product_id}`}
                              target="_blank"
                              rel="noopener noreferrer">
                              <ExternalLinkIcon className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingCartIcon className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">Cart is empty</p>
          </div>
        )}

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Cart Item</DialogTitle>
            </DialogHeader>
            {currentItem &&
              productDetails[
                `${currentItem.product_id}-${currentItem.variant_id}`
              ] && (
                <div className="grid gap-4 py-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        productDetails[
                          `${currentItem.product_id || "/placeholder.svg"}-${currentItem.variant_id}`
                        ].image
                      }
                      alt="Product"
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-medium">
                        {
                          productDetails[
                            `${currentItem.product_id}-${currentItem.variant_id}`
                          ].name
                        }
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ID: {currentItem.product_id.slice(-8)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="variant">Variant</Label>
                    <Select
                      value={currentItem.variant_id}
                      onValueChange={handleVariantChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select variant" />
                      </SelectTrigger>
                      <SelectContent>
                        {productDetails[
                          `${currentItem.product_id}-${currentItem.variant_id}`
                        ].availableVariants.map((variant: any) => (
                          <SelectItem key={variant.id} value={variant.id}>
                            {variant.name} ({variant.color} / {variant.size})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(currentItem.quantity - 1)
                        }
                        disabled={currentItem.quantity <= 1}>
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={currentItem.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            Number.parseInt(e.target.value) || 1
                          )
                        }
                        className="text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(currentItem.quantity + 1)
                        }>
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Price</Label>
                    <p className="font-medium">
                      {formatCurrency(
                        productDetails[
                          `${currentItem.product_id}-${currentItem.variant_id}`
                        ].price
                      )}
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label>Total</Label>
                    <p className="font-medium">
                      {formatCurrency(
                        productDetails[
                          `${currentItem.product_id}-${currentItem.variant_id}`
                        ].price * currentItem.quantity
                      )}
                    </p>
                  </div>
                </div>
              )}
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditItem}>Update Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
