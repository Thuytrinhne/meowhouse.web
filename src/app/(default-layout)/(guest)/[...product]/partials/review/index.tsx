"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ReviewProps {
  reviews: Review[];
}

export default function CustomerReview({ reviews }: ReviewProps) {
  const [selectedImgs, setSelectedImgs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Gom tất cả ảnh từ tất cả review
  const allImages: string[] = reviews.flatMap((r) => r.review_imgs || []);

  const openImageViewer = (clickedImgUrl: string) => {
    const index = allImages.indexOf(clickedImgUrl);
    if (index !== -1) {
      setSelectedImgs(allImages);
      setCurrentIndex(index);
    }
  };

  const closeViewer = () => {
    setSelectedImgs([]);
    setCurrentIndex(0);
  };

  const prevImg = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? selectedImgs.length - 1 : prev - 1
    );
  };

  const nextImg = () => {
    setCurrentIndex((prev) =>
      prev === selectedImgs.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="mt-4 dark:text-gray-200">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Đánh giá của khách hàng
      </h2>

      <div className="flex items-center space-x-2 mb-2">
        <span className="text-yellow-500">★★★★☆</span>
        <span className="text-lg font-semibold dark:text-white">4.1</span>
        <span className="text-gray-500 dark:text-gray-400">
          Dựa trên {reviews.length} đánh giá
        </span>
      </div>

      {reviews.map((review) => (
        <div key={review._id} className="border-b pb-6 mb-6">
          <div className="flex items-center mb-2">
            <img
              src={review.user_avt || "/default-avatar.png"}
              alt={review.user_name}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium dark:text-white">
                {review.user_name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(review.review_date).toLocaleDateString("vi-VN")} |{" "}
                {review.variant_name}
              </span>
              <span className="text-yellow-500">
                {"★".repeat(review.rating_point)}
                {"☆".repeat(5 - review.rating_point)}
              </span>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mt-2">
            {review.review_content}
          </p>

          {review.review_imgs?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {review.review_imgs.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`review-img-${index}`}
                  className="w-20 h-20 object-cover rounded-md border cursor-pointer"
                  onClick={() => openImageViewer(imgUrl)}
                />
              ))}
            </div>
          )}

          {review.review_vids?.length > 0 && (
            <div className="mt-3 space-y-2">
              {review.review_vids.map((vidUrl, index) => (
                <video
                  key={index}
                  src={vidUrl}
                  controls
                  className="w-full max-w-xs rounded-md border"
                />
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Lightbox Viewer */}
      {selectedImgs.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeViewer}
            className="absolute top-4 right-4 text-white hover:text-red-400">
            <X size={30} />
          </button>

          {/* Previous */}
          <button
            onClick={prevImg}
            className="absolute left-6 text-white hover:scale-110 transition-transform">
            <ChevronLeft size={40} />
          </button>

          {/* Image preview */}
          <img
            src={selectedImgs[currentIndex]}
            alt={`preview-${currentIndex}`}
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
          />

          {/* Next */}
          <button
            onClick={nextImg}
            className="absolute right-6 text-white hover:scale-110 transition-transform">
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </div>
  );
}
