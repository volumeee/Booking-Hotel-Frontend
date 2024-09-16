import React, { useMemo } from "react";
import { useSearchFilterStore } from "@/store/LandingPageStore";
import { RoomWithPriceCard } from "@/components/landingpage/common/RoomWithPriceCard";
import { RoomType } from "@/types/LandingPage";
import SkeletonCard from "@/components/landingpage/common/SkeletonCard";
import { AnimationWrapper } from "@/components/landingpage/common/AnimationWrapper";
import { SortOption, sortRooms } from "@/lib/utils";

interface SearchFilterRoomsProps {
    sortOptions: SortOption[];
}


const SearchFilterRooms: React.FC<SearchFilterRoomsProps> = ({ sortOptions }) => {
    const { searchFilterResults, isLoading, error } = useSearchFilterStore();


    const sortedRooms = useMemo(() => {
        return sortRooms(searchFilterResults as RoomType[], sortOptions);
    }, [searchFilterResults, sortOptions])


    const renderSkeletons = () => (
        <>
            {[...Array(9)].map((_, index) => (
                <AnimationWrapper key={index} type="fadeIn">
                    <SkeletonCard />
                </AnimationWrapper>
            ))}
        </>
    );

    if (error) {
        return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
    }

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                    Filter Results
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading
                        ? renderSkeletons()
                        : Array.isArray(searchFilterResults) && sortedRooms.map((room: RoomType) => (
                            <RoomWithPriceCard key={room.id} room={room} showStatus={true} showRoomNumber={true} showAmenities={true} />
                        ))}
                </div>
                {!isLoading && (!Array.isArray(searchFilterResults) || searchFilterResults.length === 0) && (
                    <p className="text-center text-gray-500 mt-4">
                        No rooms found matching your search criteria.
                    </p>
                )}
            </div>
        </section>
    );
};

export default SearchFilterRooms;
