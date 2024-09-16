import React from 'react';
import { Review } from '@/types/LandingPage';

interface ReviewListProps {
    reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Guest Reviews</h2>
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white shadow-md rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-semibold">{review.user.username}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(review.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <p className="mb-2">Rating: {review.rating}/5</p>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
