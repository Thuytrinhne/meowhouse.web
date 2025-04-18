import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UserProfile from "@/components/(admin)/users/user-profile";
import UserOrders from "@/components/(admin)/users/user-orders";
import UserCartItems from "@/components/(admin)/users/user-cart-items";
import UserSavedCoupons from "@/components/(admin)/users/user-saved-coupons";
import UserAddresses from "@/components/(admin)/users/user-addresses";
import { ADMIN_USERS_URL } from "@/utils/constants/urls";

export const metadata: Metadata = {
  title: "User Details",
  description: "Admin user details page",
};

async function getUserData(userId: string) {
  try {
    const res = await fetch(`${ADMIN_USERS_URL}/${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await res.json();
    return data.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

async function getUserOrders(userId: string) {
  // This would be replaced with actual API call to get user orders
  // For now, returning mock data
  return [
    {
      id: "ORD123456",
      date: "2025-04-10T14:30:00Z",
      status: "Delivered",
      total: 250000,
      items: 3,
    },
    {
      id: "ORD123457",
      date: "2025-03-25T09:15:00Z",
      status: "Processing",
      total: 450000,
      items: 2,
    },
    {
      id: "ORD123458",
      date: "2025-02-18T16:45:00Z",
      status: "Cancelled",
      total: 150000,
      items: 1,
    },
  ];
}

export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const userData = await getUserData(params.id);
  const userOrders = await getUserOrders(params.id);

  if (!userData) {
    notFound();
  }

  // Add some mock addresses if user doesn't have any
  const userAddresses =
    userData.user_address && userData.user_address.length > 0
      ? userData.user_address
      : [
          {
            province: "Hà Nội",
            district: "Cầu Giấy",
            ward: "Dịch Vọng",
            street: "144 Xuân Thủy",
          },
          {
            province: "Hồ Chí Minh",
            district: "Quận 1",
            ward: "Bến Nghé",
            street: "22 Lê Lợi",
          },
        ];

  // Add is_active field if it doesn't exist
  const enhancedUserData = {
    ...userData,
    is_active: userData.is_active !== undefined ? userData.is_active : true,
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">User Details</h1>

      <div className="grid grid-cols-1 gap-8">
        {/* Top section - Profile and Addresses side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UserProfile user={enhancedUserData} />
          <UserAddresses addresses={userAddresses} />
        </div>

        {/* Middle section - Cart Items and Saved Coupons side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UserCartItems cartItems={userData.user_cart || []} />
          <UserSavedCoupons coupons={userData.saved_coupons || []} />
        </div>

        {/* Bottom section - Orders (full width) */}
        <UserOrders orders={userOrders} userId={params.id} />
      </div>
    </div>
  );
}
