import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { PUBLIC_CUSTOMER_CART_URL } from "@/utils/constants/urls";
import { postData } from "@/utils/functions/client";
import { ICartProduct } from "@/types/interfaces";

import { convertNumberToVND } from "@/utils/functions/convert";

export default function CustomerHeaderCart() {
  const { data: session } = useSession(); // Lấy thông tin session
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const localCartData = JSON.parse(localStorage.getItem("cart")) || [];
      // localStorage.removeItem("cart");

      const cartData = await postData(
        `${PUBLIC_CUSTOMER_CART_URL}/${session ? session.user.id : "undefined"}`,
        localCartData
      );
      const userCart = cartData.user_cart;

      if (!userCart || userCart.length == 0) {
        setCartProducts([]);
        setIsFetched(true);
        return;
      }

      const data = await postData(PUBLIC_CUSTOMER_CART_URL, userCart);
      console.log("cart", data.products);
      setCartProducts(data.products);
      setIsFetched(true);
    };

    fetchData();
  }, [session]);
  return (
    <div className="relative group">
      {/* Cart */}
      <a
        href="/cart"
        className="relative flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 items-center"
        data-cy="cart-button">
        <div className="relative flex">
          <ShoppingBag />
          <span className="absolute top-3 left-4 bg-orange-500 text-white text-[8px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
            12
          </span>
        </div>
        <span className="ml-2 font-semibold tablet:block laptop:block desktop:block">
          Giỏ hàng
        </span>
      </a>

      {/* Cart details dropdown */}
      <div className="absolute right-0 mt-4 w-96 bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
        {/* Tam giác trên dropdown */}
        <div className="absolute top-[-6px] right-3 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600"></div>

        {/* Authenticated user */}
        <div className="py-4">
          <h3 className="font-medium text-gray-400 dark:text-white px-4 pb-2">
            Sản phẩm mới thêm
          </h3>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-70 overflow-y-auto">
            {cartProducts && cartProducts.length > 0 ? (
              cartProducts.map((cartProduct, index) => (
                <li
                  key={index}
                  className="p-4 flex hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/${cartProduct.product_slug}?pid=${cartProduct.product_hashed_id}`
                    )
                  }>
                  <Image
                    src={cartProduct.product_variants[0].variant_img}
                    alt="/imgs/test.jpg"
                    width={50}
                    height={50}
                    className="rounded mr-3 object-cover w-[50px] h-[50px]"
                  />
                  <div>
                    <p className="text-sm text-gray-700 dark:text-white font-semibold">
                      {cartProduct.product_name}
                    </p>
                    <p className="text-sm text-red-500">
                      {convertNumberToVND(
                        cartProduct.product_variants[0].variant_price
                      )}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <div className="my-4 flex flex-col gap-2 items-center">
                <div className="w-1/2 mx-auto aspect-square rounded-full bg-gray-100 dark:bg-gray-600 flex justify-center items-center">
                  <div className="relative w-2/3 aspect-square">
                    <Image
                      src="/imgs/noti/cat-1.png"
                      alt="Giỏ hàng trống"
                      fill={true}
                    />
                  </div>
                </div>
                <p className="font-semibold">
                  Hiện không có sản phẩm trong Giỏ Hàng
                </p>
              </div>
            )}
          </ul>
          <div className="mt-4 flex justify-end px-4">
            <a
              href="/cart"
              className="text-sm text-white bg-teal-600 dark:bg-teal-700 px-4 py-2 rounded-md hover:bg-teal-700 dark:hover:bg-teal-500">
              Xem Giỏ Hàng
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
