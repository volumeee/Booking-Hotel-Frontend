import { Card, Skeleton } from "@nextui-org/react";

const SkeletonReviewCard = () => {
    return (
        <Card className="w-[280px] sm:w-[320px] md:w-[400px] lg:w-[450px] max-w-full p-4 bg-white">
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg"></div>
            </Skeleton>
            <div className="space-y-3 mt-4">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg"></div>
                </Skeleton>
            </div>
        </Card>
    );
};

export default SkeletonReviewCard;
