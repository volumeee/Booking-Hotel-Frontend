"use client";

import React, { useEffect, useMemo } from "react";
import { useAvailableRoomsStore } from "@/store/LandingPageStore";
import { AnimationWrapper } from "@/components/landingpage/common/AnimationWrapper";
import SkeletonCard from "@/components/landingpage/common/SkeletonCard";
import { RoomWithPriceCard } from "@/components/landingpage/common/RoomWithPriceCard";
import { SortOption, sortRooms } from "@/lib/utils";

interface AvailableRoomsProps {
  sortOptions: SortOption[];
}

const AvailableRooms: React.FC<AvailableRoomsProps> = ({ sortOptions }) => {
  const { availableRooms, isLoading, error, fetchAvailableRooms } = useAvailableRoomsStore();

  useEffect(() => {
    fetchAvailableRooms();
  }, [fetchAvailableRooms]);

  const sortedRooms = useMemo(() => {
    return sortRooms(availableRooms, sortOptions);
  }, [availableRooms, sortOptions]);

  const renderSkeletons = () => (
    <>
      {[...Array(9)].map((_, index) => (
        <AnimationWrapper key={index} type="fadeIn">
          <SkeletonCard />
        </AnimationWrapper>
      ))}
    </>
  );

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Available Rooms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? renderSkeletons()
            : sortedRooms.map((room) => (
              <RoomWithPriceCard
                key={room.id}
                room={room}
                showStatus={true}
                showRoomNumber={true}
                showAmenities={true}
              />
            ))}
        </div>
        {error && (
          <p className="text-center text-red-500 mt-4">
            Error loading rooms: {error}
          </p>
        )}
      </div>
    </section>
  );
};

export default AvailableRooms;