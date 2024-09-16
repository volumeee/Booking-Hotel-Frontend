import React from 'react';
import Image from 'next/image';
import { Hotel } from '@/types/LandingPage';
import RoomList from '@/components/landingpage/hotels/RoomList';
import ReviewList from '@/components/landingpage/hotels/ReviewList';

interface HotelDetailsProps {
    hotel: Hotel;
}

const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
            <div className="flex flex-wrap -mx-4">
                <div className="w-full lg:w-2/3 px-4 mb-8">
                    {hotel.images && hotel.images.length > 0 && (
                        <Image
                            src={hotel.images[0].image_url}
                            alt={hotel.name}
                            width={800}
                            height={500}
                            className="rounded-lg"
                        />
                    )}
                    <p className="mt-4">{hotel.description}</p>
                </div>
                <div className="w-full lg:w-1/3 px-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Hotel Info</h2>
                        <p>Address: {hotel.address}</p>
                        <p>City: {hotel.city}</p>
                        <p>Country: {hotel.country}</p>
                        <p>Star Rating: {hotel.star_rating}</p>
                    </div>
                </div>
            </div>
            <RoomList roomTypes={hotel.room_types} />
            <ReviewList reviews={hotel.reviews} />
        </div>
    );
};

export default HotelDetails;
