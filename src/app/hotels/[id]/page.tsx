'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import HotelDetails from '@/components/landingpage/hotels/HotelDetails';
import { useHotelDetailStore } from '@/store/LandingPageStore';

const HotelDetailPage = () => {
    const { id } = useParams();
    const { fetchHotelDetail, hotelDetail, isLoading, error } = useHotelDetailStore();

    React.useEffect(() => {
        if (id) {
            fetchHotelDetail(Number(id));
        }
    }, [id, fetchHotelDetail]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!hotelDetail || hotelDetail.length === 0) return <div>Hotel not found</div>;

    return <HotelDetails hotel={hotelDetail[0]} />;
};

export default HotelDetailPage;
