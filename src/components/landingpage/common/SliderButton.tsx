import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const SliderButton: React.FC<{
    direction: "left" | "right";
    onClick: () => void;
}> = ({ direction, onClick }) => (
    <button
        onClick={onClick}
        className={`absolute top-1/2 ${direction === "right" ? "right-[-3rem]" : "left-[-3rem]"
            } transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200`}
        aria-label={`Scroll ${direction}`}
    >
        {direction === "right" ? (
            <FaChevronRight className="text-gray-600" size={24} />
        ) : (
            <FaChevronLeft className="text-gray-600" size={24} />
        )}
    </button>
);
