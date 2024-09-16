"use client";

import React, { useState } from "react";
import { Card, CardBody, CardFooter, Button, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Hotel, Amenity, Review, Image as HotelImage } from "@/types/LandingPage";
import { AnimationWrapper } from "@/components/landingpage/common/AnimationWrapper";
import { amenityIcons } from "@/lib/utils";
import Link from "next/link";

export const HotelPopularCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => (
    <AnimationWrapper type="fadeIn">
        <Card className="w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <CardBody className="p-0 flex-grow flex flex-col">
                <HotelImageComponent hotel={hotel} />
                <HotelDetails hotel={hotel} />
            </CardBody>
            <CardFooter className="justify-end bg-gray-50">
                <Link href={`/hotels/${hotel.id}`}>
                    <Button color="primary" size="sm" className="text-xs font-medium">
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    </AnimationWrapper>
);

const HotelImageComponent: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
    const [hoveredAmenity, setHoveredAmenity] = useState<string | null>(null);

    return (
        <div className="relative h-48 sm:h-56 md:h-48 lg:h-56">
            <Image
                src={getMainImage(hotel.images) || "/placeholder-image.jpg"}
                alt={hotel.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="rounded-t-lg object-cover"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-sm">
                <span className="text-yellow-500 font-bold">
                    ★ {getAverageRating(hotel.reviews)}
                </span>
            </div>
            <div className="absolute bottom-2 left-2 z-10 flex flex-wrap gap-2">
                {hotel.amenities.slice(0, 5).map((amenity: Amenity) => (
                    <Tooltip
                        key={amenity.id}
                        content={amenity.name}
                        placement="top"
                        className={hoveredAmenity === amenity.name ? "bg-blue-600 text-white" : ""}
                    >
                        <div
                            className={`bg-white p-1 rounded-full shadow-sm text-lg transition-colors duration-200 ${hoveredAmenity === amenity.name ? "bg-blue-100" : ""
                                }`}
                            onMouseEnter={() => setHoveredAmenity(amenity.name)}
                            onMouseLeave={() => setHoveredAmenity(null)}
                        >
                            {amenityIcons[amenity.name]?.(hoveredAmenity === amenity.name) || amenity.name[0]}
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

const HotelDetails: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
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
        <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-sm font-bold text-gray-600 line-clamp-1 mb-2">
                {hotel.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {hotel.description}
            </p>
            <div className="mt-auto">
                <div className="flex items-center mb-2">
                    {renderStarRating(hotel.star_rating)}
                </div>
                <p className="text-xs text-gray-500">
                    {hotel.city}, {hotel.country}
                </p>
            </div>
        </div>
    )
}


export const getAverageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
};

export const getMainImage = (images: HotelImage[]) => {
    const mainImage = images.find((img) => img.is_main);
    return mainImage ? mainImage.image_url : images[0]?.image_url;
};
