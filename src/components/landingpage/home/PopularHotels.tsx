"use client";

import React, { useRef, useEffect, useState } from "react";
import { usePopularHotelsStore } from "@/store/LandingPageStore";
import SkeletonCard from "@/components/landingpage/common/SkeletonCard";
import { SliderButton } from "@/components/landingpage/common/SliderButton";
import { HotelPopularCard, getAverageRating } from "@/components/landingpage/common/HotelPopularCard";

const PopularHotels: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { popularHotels, isLoading, error, fetchPopularHotels } =
    usePopularHotelsStore();
  const [showButtons, setShowButtons] = useState(true);

  useEffect(() => {
    fetchPopularHotels();
    const handleResize = () => setShowButtons(window.innerWidth > 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fetchPopularHotels]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const mouseDownHandler = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    };

    const mouseLeaveHandler = () => {
      isDown = false;
    };
    const mouseUpHandler = () => {
      isDown = false;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    scrollContainer.addEventListener("mousedown", mouseDownHandler);
    scrollContainer.addEventListener("mouseleave", mouseLeaveHandler);
    scrollContainer.addEventListener("mouseup", mouseUpHandler);
    scrollContainer.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      scrollContainer.removeEventListener("mousedown", mouseDownHandler);
      scrollContainer.removeEventListener("mouseleave", mouseLeaveHandler);
      scrollContainer.removeEventListener("mouseup", mouseUpHandler);
      scrollContainer.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  const sortedHotels = [...popularHotels].sort(
    (a, b) => getAverageRating(b.reviews) - getAverageRating(a.reviews)
  );

  return (
    <div className="flex bg-gradient-to-r from-blue-100 to-blue-50 items-center justify-center w-full min-h-screen">
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
            Popular Hotels
          </h2>
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="grid grid-flow-col auto-cols-max gap-4 md:gap-6 overflow-x-auto pb-8 pt-4 scrollbar-hide"
              style={{ scrollBehavior: "smooth" }}
            >
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="w-72 sm:w-80 md:w-72 lg:w-80">
                    <SkeletonCard contentLines={4} showFooter={true} />
                  </div>
                ))
                : sortedHotels.map((hotel) => (
                  <div key={hotel.id} className="w-72 sm:w-80 md:w-72 lg:w-80">
                    <HotelPopularCard hotel={hotel} />
                  </div>
                ))}
            </div>
            {showButtons && (
              <>
                <SliderButton
                  direction="right"
                  onClick={() => handleScroll("right")}
                />
                <SliderButton
                  direction="left"
                  onClick={() => handleScroll("left")}
                />
              </>
            )}
          </div>
          {error && (
            <p className="text-center text-red-500 mt-4">
              Error loading hotels: {error}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default PopularHotels;
