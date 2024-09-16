"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardBody, CardFooter, Button, Tooltip } from "@nextui-org/react";
import { FaBed, FaUsers, FaStar } from "react-icons/fa";
import { RoomType, Image as RoomImage, Amenity } from "@/types/LandingPage";
import { AnimationWrapper } from "@/components/landingpage/common/AnimationWrapper";
import { MdBedroomParent } from "react-icons/md";
import { amenityIcons } from "@/lib/utils";

interface RoomWithPriceCardProps {
    room: RoomType;
    showStatus?: boolean;
    showRoomNumber?: boolean;
    showAmenities?: boolean;
}

const getMainImage = (images: RoomImage[]) => {
    const mainImage = images.find((img) => img.is_main);
    return mainImage ? mainImage.image_url : images[0]?.image_url;
};

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "dipesan":
            return "bg-red-100 text-red-800";
        case "dibersihkan":
            return "bg-blue-100 text-blue-800";
        case "tersedia":
            return "bg-green-100 text-green-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export const RoomWithPriceCard: React.FC<RoomWithPriceCardProps> = ({
    room,
    showStatus = true,
    showRoomNumber = true,
    showAmenities = true
}) => {
    const [hoveredAmenity, setHoveredAmenity] = useState<string | null>(null);

    const renderStarRating = (rating: number) => {
        return (
            <div className="flex items-center mb-3">
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        className={index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
                        size={14}
                    />
                ))}
                <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
            </div>
        );
    };

    return (
        <AnimationWrapper type="slideUp">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardBody className="p-0">
                    <div className="relative h-48">
                        <Image
                            src={getMainImage(room.images) || "https://dummyimage.com/600x400/000/fff"}
                            alt={room.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            className="rounded-t-lg"
                        />
                        {showAmenities && room.amenities && (
                            <div className="absolute bottom-2 left-2 z-10 flex flex-wrap gap-2">
                                {room.amenities.slice(0, 5).map((amenity: Amenity) => (
                                    <Tooltip
                                        key={amenity.id}
                                        content={amenity.name}
                                        placement="top"
                                        className={hoveredAmenity === amenity.name ? "bg-blue-600 text-white" : ""}
                                    >
                                        <div
                                            className={`bg-white p-1 rounded-full shadow-sm text-lg transition-colors duration-200 ${hoveredAmenity === amenity.name ? "bg-blue-100" : ""}`}
                                            onMouseEnter={() => setHoveredAmenity(amenity.name)}
                                            onMouseLeave={() => setHoveredAmenity(null)}
                                        >
                                            {amenityIcons[amenity.name]?.(hoveredAmenity === amenity.name) || amenity.name[0]}
                                        </div>
                                    </Tooltip>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-base font-bold text-gray-800 truncate">
                                {room.name}
                            </h3>
                            {showStatus && room.rooms && room.rooms[0]?.status && (
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                                        room.rooms[0].status
                                    )}`}
                                >
                                    {room.rooms[0].status}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                            {room.description}
                        </p>
                        {renderStarRating(room.hotel?.star_rating)}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <FaBed className="text-blue-500 mr-2" />
                                <span className="text-sm text-gray-600 line-clamp-1">
                                    {room.hotel?.name || 'Hotel name not available'}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <FaUsers className="text-green-500 mr-2" />
                                <span className="text-sm text-gray-600">{room.capacity}</span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-lg font-bold text-blue-600">
                                    Rp {parseFloat(room.price_per_night).toLocaleString()}{" "}
                                    <span className="text-sm font-normal text-gray-500">/night</span>
                                </p>
                            </div>
                            {showRoomNumber && room.rooms && room.rooms[0]?.room_number && (
                                <div className="flex">
                                    <MdBedroomParent className="text-red-500 mr-1 mb-1" />
                                    <p className="text-xs text-red-600 font-semibold">{room.rooms[0].room_number}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="justify-end bg-gray-50">
                    <Button color="primary" size="sm" className="text-xs font-medium">
                        Book Now
                    </Button>
                </CardFooter>
            </Card>
        </AnimationWrapper>
    );
};
