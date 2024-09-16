import React from 'react';
import { RoomType } from '@/types/LandingPage';

interface RoomListProps {
    roomTypes: RoomType[];
}

const RoomList: React.FC<RoomListProps> = ({ roomTypes }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roomTypes.map((room) => (
                    <div key={room.id} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                        <p className="mb-2">{room.description}</p>
                        <p className="font-bold">Price: ${room.price_per_night} / night</p>
                        <p>Capacity: {room.capacity} guests</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomList;
