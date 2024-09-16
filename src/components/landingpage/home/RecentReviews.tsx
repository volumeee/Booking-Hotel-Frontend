"use client";
import { useRecentReviewsStore } from "@/store/LandingPageStore";
import { InfiniteMovingCards } from "../common/InfiniteMovingCard";
import SkeletonReviewCard from "../common/SkeletonReviewCard";
import { useEffect } from "react";

export function RecentReviews() {
    const { recentReviews, fetchRecentReviews, isLoading, error } = useRecentReviewsStore();

    useEffect(() => {
        fetchRecentReviews();
    }, [fetchRecentReviews]);

    if (error) {
        return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
    }

    const formattedRecentReviews = recentReviews.map((review) => ({
        id: review.id,
        comment: review.comment,
        name: `${review.user.first_name} ${review.user.last_name}`,
        hotel: review.hotel.name,
    }));

    return (
        <div className="relative py-8 md:py-12 lg:py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Recent Reviews</h2>
            <div className="rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
                <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                    {isLoading ? (
                        <div className="flex gap-4 py-4 w-max animate-scroll">
                            {[...Array(10)].map((_, index) => (
                                <SkeletonReviewCard key={index} />
                            ))}
                        </div>
                    ) : (
                        <InfiniteMovingCards
                            items={formattedRecentReviews}
                            direction="left"
                            speed="slow"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}