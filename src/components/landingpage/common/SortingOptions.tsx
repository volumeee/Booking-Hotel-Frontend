import React from 'react';
import { Select, SelectItem } from "@nextui-org/react";
import { SortOption } from "@/lib/utils";

interface SortingOptionsProps {
    onSortChange: (sortOption: SortOption) => void;
    initialSortOptions: SortOption[];
}

const SortingOptions: React.FC<SortingOptionsProps> = ({ onSortChange, initialSortOptions }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
                <label htmlFor="price-sort" className="text-sm font-medium" aria-label="Sort by status">Price:</label>
                <Select
                    id="price-sort"
                    className="w-32"
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    defaultSelectedKeys={[initialSortOptions[0]]}
                >
                    <SelectItem key="price_asc" value="price_asc">Low to High</SelectItem>
                    <SelectItem key="price_desc" value="price_desc">High to Low</SelectItem>
                </Select>
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="status-sort" className="text-sm font-medium" aria-label="Sort by status">Status:</label>
                <Select
                    id="status-sort"
                    className="w-32"
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    defaultSelectedKeys={[initialSortOptions[1]]}
                >
                    <SelectItem key="status_available" value="status_available">Available</SelectItem>
                    <SelectItem key="status_cleaning" value="status_cleaning">Cleaning</SelectItem>
                    <SelectItem key="status_booked" value="status_booked">Booked</SelectItem>
                </Select>
            </div>
        </div>
    );
};

export default SortingOptions;
