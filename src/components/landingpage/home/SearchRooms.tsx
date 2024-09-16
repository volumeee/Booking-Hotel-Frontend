import React, { useMemo } from "react";
import { useSearchStore } from "@/store/LandingPageStore";
import { RoomWithPriceCard } from "@/components/landingpage/common/RoomWithPriceCard";
import { RoomType } from "@/types/LandingPage";
import SkeletonCard from "@/components/landingpage/common/SkeletonCard";
import { AnimationWrapper } from "@/components/landingpage/common/AnimationWrapper";
import { SortOption, sortRooms } from "@/lib/utils";

interface SearchRoomsProps {
    sortOptions: SortOption[];
}

const SearchRooms: React.FC<SearchRoomsProps> = ({ sortOptions }) => {
    const { searchResults, isLoading, error } = useSearchStore();

    // const sortedRooms = useMemo(() => {
    //     return Array.isArray(searchResults) ? [...searchResults].sort((a, b) => {
    //         const statusOrder: { [key: string]: number } = {
    //             tersedia: 0,
    //             dibersihkan: 1,
    //             dipesan: 2,
    //         };
    //         return (
    //             statusOrder[a.rooms[0]?.status.toLowerCase()] -
    //             statusOrder[b.rooms[0]?.status.toLowerCase()]
    //         );
    //     }) : [];
    // }, [searchResults]);

    const sortedRooms = useMemo(() => {
        return sortRooms(searchResults as RoomType[], sortOptions);
    }, [searchResults, sortOptions]);

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
                    Search Results
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading
                        ? renderSkeletons()
                        : Array.isArray(searchResults) && sortedRooms.map((room: RoomType) => (
                            <RoomWithPriceCard key={room.id} room={room} showStatus={true} showRoomNumber={true} showAmenities={true} />
                        ))}
                </div>
                {!isLoading && (!Array.isArray(searchResults) || searchResults.length === 0) && (
                    <p className="text-center text-gray-500 mt-4">
                        No rooms found matching your search criteria.
                    </p>
                )}
            </div>
        </section>
    );
};

export default SearchRooms;
