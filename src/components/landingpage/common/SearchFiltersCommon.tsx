"use client";

import React from 'react';
import { FaStar } from "react-icons/fa";
import { Slider, Checkbox, Radio, RadioGroup, Button } from "@nextui-org/react";
import { AnimationWrapper } from "@/components/landingpage/common/AnimationWrapper";
import { AMENITIES } from '@/lib/utils';

export interface Filters {
    priceRange: number[];
    starRating: number | null;
    amenities: number[];
}

export interface FilterSectionProps {
    title: string;
    children: React.ReactNode;
}

export interface StarRatingProps {
    rating: number;
    isInvalid: boolean;
}

export interface FilterComponentProps {
    filters: Filters;
    handleUpdateFilter: Function;
    invalidFields?: { [key: string]: boolean };
    handleAmenityChangeWrapper?: Function;
}

export interface FilterActionsProps {
    handleResetFilters: () => void;
    handleApplyFilters: () => void;
    isLoading: boolean;
}

export const updateFilter = <K extends keyof Filters>(
    filters: Filters,
    key: K,
    value: Filters[K]
): Filters => {
    return { ...filters, [key]: value };
};

export const handleAmenityChange = (
    filters: Filters,
    checked: boolean,
    value: number
): Filters => {
    const updatedAmenities = checked
        ? [...filters.amenities, value]
        : filters.amenities.filter((a) => a !== value);
    return updateFilter(filters, "amenities", updatedAmenities);
};

export const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => (
    <div className="mb-6">
        <h4 className="text-md font-medium mb-2">{title}</h4>
        {children}
    </div>
);

export const StarRating: React.FC<StarRatingProps> = ({ rating, isInvalid }) => (
    <div className="flex items-center">
        {[...Array(rating)].map((_, index) => (
            <FaStar
                key={index}
                size={16}
                className={isInvalid ? "text-red-300" : "text-yellow-400"}
            />
        ))}
    </div>
);

export const PriceRangeFilter: React.FC<FilterComponentProps> = React.memo(({ filters, handleUpdateFilter }) => (
    <FilterSection title="Price Range">
        <Slider
            label="Price"
            step={50}
            maxValue={10000000}
            minValue={50}
            value={filters.priceRange}
            onChange={(value) =>
                handleUpdateFilter("priceRange", Array.isArray(value) ? value : [value])
            }
            formatOptions={{ style: "currency", currency: "IDR" }}
            className="max-w-md"
            size="sm"
        />
    </FilterSection>
));

export const StarRatingFilter: React.FC<FilterComponentProps> = React.memo(
    ({ filters, handleUpdateFilter, invalidFields }) => (
        <FilterSection title="Star Rating">
            <RadioGroup
                value={filters.starRating?.toString() || ""}
                onChange={(e) => handleUpdateFilter("starRating", parseInt(e.target.value))}
                isRequired
                isInvalid={invalidFields?.starRating}
            >
                {[1, 2, 3, 4, 5].map((rating) => (
                    <Radio key={rating} value={rating.toString()} size="sm">
                        <StarRating
                            rating={rating}
                            isInvalid={invalidFields?.starRating || false}
                        />
                    </Radio>
                ))}
            </RadioGroup>
        </FilterSection>
    )
);

export const AmenitiesFilter: React.FC<FilterComponentProps> = React.memo(
    ({ filters, handleAmenityChangeWrapper, invalidFields }) => (
        <FilterSection title="Amenities">
            <div className="grid grid-cols-1 gap-2">
                {AMENITIES.map((amenity, index) => (
                    <Checkbox
                        key={index}
                        isSelected={filters.amenities.includes(index + 1)}
                        isInvalid={invalidFields?.amenities}
                        value={(index + 1).toString()}
                        size="sm"
                        onChange={(e) => handleAmenityChangeWrapper && handleAmenityChangeWrapper(e.target.checked, index + 1)}
                    >
                        {amenity}
                    </Checkbox>
                ))}
            </div>
        </FilterSection>
    )
);

export const FilterActions: React.FC<FilterActionsProps> = React.memo(
    ({ handleResetFilters, handleApplyFilters, isLoading }) => (
        <div className="flex gap-2">
            <Button color="danger" className="flex-2" onClick={handleResetFilters} disabled={isLoading}>
                Reset
            </Button>
            <Button color="primary" className="flex-1" onClick={handleApplyFilters} disabled={isLoading}>
                {isLoading ? "Applying..." : "Apply Filters"}
            </Button>
        </div>
    )
);

export const renderFilterContent = (props: {
    filters: Filters;
    handleUpdateFilter: Function;
    handleAmenityChangeWrapper: Function;
    invalidFields: { [key: string]: boolean };
    error: string | null;
    storeError: string | null;
    handleResetFilters: () => void;
    handleApplyFilters: () => void;
    isLoading: boolean;
}) => (
    <AnimationWrapper type="slideUp" transition={{ delay: 0.2 }}>
        <div className="bg-white h-full overflow-y-auto p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <PriceRangeFilter filters={props.filters} handleUpdateFilter={props.handleUpdateFilter} />
            <StarRatingFilter
                filters={props.filters}
                handleUpdateFilter={props.handleUpdateFilter}
                invalidFields={props.invalidFields}
            />
            <AmenitiesFilter
                filters={props.filters}
                handleAmenityChangeWrapper={props.handleAmenityChangeWrapper}
                handleUpdateFilter={props.handleUpdateFilter}
                invalidFields={props.invalidFields}
            />
            {props.error && <p className="text-red-500 mb-4 text-xs">{props.error}</p>}
            {props.storeError && <p className="text-red-500 mb-4 text-xs">{props.storeError}</p>}
            <FilterActions handleResetFilters={props.handleResetFilters} handleApplyFilters={props.handleApplyFilters} isLoading={props.isLoading} />
        </div>
    </AnimationWrapper>
);
