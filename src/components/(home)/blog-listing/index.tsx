"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { GUEST_BLOG_URL } from "@/utils/constants/urls";
import Link from "next/link";
import { BlogCardShort } from "@/components";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogListing() {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${GUEST_BLOG_URL}?page=1&limit=100`);
      const data = await res.json();
      if (data.status === 200 && data.success) {
        setFeaturedBlogs(data.data.articles);
      } else {
        console.error("Failed to fetch articles:", data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const scrollByAmount = 300;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  return (
    <div className="relative container mx-auto w-full px-4 sm:w-[90%] md:w-[85%] lg:w-[80%] py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-12">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Khám phá thêm các chủ đề...
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-200">
            Đọc các lời khuyên chăm sóc cho mèo của bạn
          </p>
        </div>
        <Link href="/blogs">
          <Button className="bg-[#1B4242] hover:bg-[#1B4242]/90 text-white text-sm sm:text-base">
            Khám phá thêm
          </Button>
        </Link>
      </div>
      {/* Nút trái */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow p-2 rounded-full hover:bg-gray-100">
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Slider Controls */}
      <div className="relative">
        {/* Danh sách bài viết */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-3 scrollbar-hide scroll-smooth px-3"
          style={{ scrollSnapType: "x mandatory" }}>
          {featuredBlogs.map((blog, index) => (
            <Link
              key={index}
              href={`/blogs/${blog.article_slug}/${encodeURIComponent(
                blog.article_id_hashed
              )}`}
              className="flex-shrink-0 scroll-snap-align-start">
              <BlogCardShort
                className="w-[223px] sm:w-[250px] md:w-[275px] lg:w-[224px] h-[280px] overflow-hidden p-3"
                image={blog.article_avt}
                date={`${blog.article_author_name} - ${new Date(
                  blog.article_published_date
                ).toLocaleDateString()}`}
                title={blog.article_name}
                hashtags={blog.article_tags || []}
                isOdd={index % 2 !== 0}
              />
            </Link>
          ))}
        </div>
      </div>
      {/* Nút phải */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow p-2 rounded-full hover:bg-gray-100">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
