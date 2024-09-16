// SkeletonCard.tsx
import React from "react";
import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";

interface SkeletonCardProps {
  contentLines?: number;
  showFooter?: boolean;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  contentLines = 4,
  showFooter = true,
}) => {
  return (
    <Card className="flex-shrink-0 w-full h-full bg-white shadow-md">
      <CardBody className="p-0">
        <Skeleton className="rounded-t-lg w-full h-48 sm:h-56 md:h-48 lg:h-56" />
        <div className="p-4">
          {Array.from({ length: contentLines }).map((_, index) => (
            <Skeleton
              key={index}
              className={`h-4 w-${index === 0 ? "3/4" : "full"} mb-2`}
            />
          ))}
        </div>
      </CardBody>
      {showFooter && (
        <CardFooter className="justify-end bg-gray-50">
          <Skeleton className="h-8 w-24" />
        </CardFooter>
      )}
    </Card>
  );
};

export default SkeletonCard;
