import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";
import {
  FaSwimmingPool,
  FaUtensils,
  FaGlassMartini,
  FaParking,
  FaSnowflake,
  FaWifi,
  FaSpa,
  FaDumbbell,
  FaTv,
  FaCoffee,
} from "react-icons/fa";
import { CalendarDate } from "@internationalized/date";
import { RoomType } from "@/types/LandingPage";

// aceternity utils
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// amenity icons utils
export const amenityIcons: {
  [key: string]: (isHovered: boolean) => React.ReactElement;
} = {
  "Kolam Renang": (isHovered) =>
    React.createElement(FaSwimmingPool, {
      className: isHovered ? "text-blue-600" : "text-gray-500",
    }),
  "Restoran": (isHovered) =>
    React.createElement(FaUtensils, {
      className: isHovered ? "text-blue-600" : "text-gray-500",
    }),
  "Bar": (isHovered) =>
    React.createElement(FaGlassMartini, {
      className: isHovered ? "text-blue-600" : "text-gray-500",
    }),
  "Parkir": (isHovered) =>
    React.createElement(FaParking, {
      className: isHovered ? "text-blue-600" : "text-gray-500",
    }),
  "AC": (isHovered) =>
    React.createElement(FaSnowflake, {
      className: isHovered ? "text-blue-600" : "text-gray-500",
    }),
  "WiFi": (isHovered) =>
    React.createElement(FaWifi, {
      className: isHovered ? "text-blue-600" : "text-gray-500",
    }),
  "Spa": (isHovered) =>
    React.createElement(FaSpa, {
      className: isHovered ? "text-blue-600" : "text-gray-500",
    }),
  "Pusat Kebugaran": (isHovered) =>
    React.createElement(FaDumbbell, {
      className: isHovered ? "text-blue-600" : "text-gray-500",
    }),
  "TV": (isHovered) =>
    React.createElement(FaTv, {
      className: isHovered ? "text-blue-600" : "text-gray-500",
    }),
  "Layanan Kamar": (isHovered) =>
    React.createElement(FaCoffee, {
      className: isHovered ? "text-blue-600" : "text-gray-500",
    }),
};

// format datetime string utils
// Date utils
export const dateUtils = {
  format: (date: CalendarDate | null) => {
    if (!date) return "";
    const d = date.day.toString().padStart(2, "0");
    const m = date.month.toString().padStart(2, "0");
    const y = date.year.toString().slice(-2);
    return `${d}-${m}-${y}`;
  },
  parse: (dateString: string): CalendarDate => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new CalendarDate(year, month, day);
  },
  formatForParams: (date: CalendarDate) =>
    `${date.year}-${String(date.month).padStart(2, "0")}-${String(
      date.day
    ).padStart(2, "0")}`,
};

// amenities filter utils
export const AMENITIES = [
  "Kolam Renang",
  "Restoran",
  "Bar",
  "Parkir",
  "AC",
  "WiFi",
  "Spa",
  "Pusat Kebugaran",
  "TV",
  "Layanan Kamar",
];

export const INITIAL_FILTERS = {
  priceRange: [50, 10000000],
  starRating: null,
  amenities: [],
};

// sorting utils
export type PriceSortOption = "price_asc" | "price_desc";
export type StatusSortOption =
  | "status_available"
  | "status_cleaning"
  | "status_booked";
export type SortOption = PriceSortOption | StatusSortOption;

export const sortRooms = (
  rooms: RoomType[],
  sortOptions: SortOption[]
): RoomType[] => {
  return [...rooms].sort((a, b) => {
    for (const option of sortOptions) {
      if (option.startsWith("price_")) {
        const priceA = parseFloat(a.price_per_night);
        const priceB = parseFloat(b.price_per_night);
        const priceDiff =
          option === "price_asc" ? priceA - priceB : priceB - priceA;
        if (priceDiff !== 0) return priceDiff;
      } else if (option.startsWith("status_")) {
        const statusOrder: { [key: string]: number } = {
          tersedia: 0,
          dibersihkan: 1,
          dipesan: 2,
        };
        const statusA = a.rooms[0]?.status.toLowerCase();
        const statusB = b.rooms[0]?.status.toLowerCase();
        const statusDiff = statusOrder[statusA] - statusOrder[statusB];
        if (statusDiff !== 0) return statusDiff;
      }
    }
    return 0;
  });
};
