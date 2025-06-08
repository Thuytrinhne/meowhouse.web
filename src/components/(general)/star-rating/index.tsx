import { Star, StarHalf, Star as StarOutline } from "lucide-react";

interface CustomerStarRatingProps {
  product_avg_rating: number;
  product_sold_quantity: number;
  product_rating_count: number;
  showRatingCount?: boolean;
}

export default function CustomerStarRating({
  product_avg_rating,
  product_sold_quantity,
  product_rating_count,
  showRatingCount = false,
}: CustomerStarRatingProps) {
  //  → Làm tròn xuống (vd: 4.3 → 4)
  let fullStars = Math.floor(product_avg_rating);
  let hasHalfStar = false;

  // Từ 0.00 → 0.24: không thêm gì (chỉ full stars)

  // Từ 0.25 → 0.74: thêm 1 nửa sao

  // Từ 0.75 trở lên: làm tròn lên thành full star tiếp theo

  const decimal = product_avg_rating - fullStars;

  if (decimal >= 0.75) {
    fullStars += 1;
  } else if (decimal >= 0.25) {
    hasHalfStar = true;
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center mb-2 gap-1">
      {/* Bọc các sao trong div để hover hiện tooltip */}
      <div className="relative group flex items-center gap-1">
        {showRatingCount && (
          <h6 className="underline underline-offset-4 font-normal">
            {product_avg_rating.toFixed(1)}
          </h6>
        )}
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            fill="currentColor"
            className="text-yellow-500 w-4 h-4"
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            key="half"
            fill="currentColor"
            className="text-yellow-500 w-4 h-4"
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOutline
            key={`empty-${i}`}
            className="text-gray-300 w-4 h-4 dark:text-gray-500"
          />
        ))}
        {showRatingCount && (
          <>
            <span className="border-l h-7 border-gray-400 mx-2"></span>
            <h6 className="underline underline-offset-4 font-normal">
              {product_rating_count}
            </h6>
            <span className="text-gray-500"> Đánh giá</span>
          </>
        )}
        {/* Tooltip */}
        <div className="absolute bottom-full mb-1 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-yellow-600 dark:text-gray-300 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow z-10">
          {product_avg_rating.toFixed(1)} / 5 sao từ {product_rating_count} lượt
          đánh giá
        </div>
      </div>
      {/* Sold quantity */}

      {product_sold_quantity !== undefined && (
        <span className="text-gray-500 dark:text-gray-200 text-xs ml-2">
          ({product_sold_quantity} sold)
        </span>
      )}
    </div>
  );
}
