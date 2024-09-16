"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@nextui-org/react";
import {
  Filters,
  renderFilterContent,
  updateFilter,
  handleAmenityChange
} from "@/components/landingpage/common/SearchFiltersCommon";
import { INITIAL_FILTERS } from "@/lib/utils";
import { useSearchFilterStore } from "@/store/LandingPageStore";

interface SearchFilterProps {
  onFilterSearch: () => void;
}

const SearchFilters: React.FC<SearchFilterProps> = ({ onFilterSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [error, setError] = useState<string | null>(null);
  const [invalidFields, setInvalidFields] = useState({
    starRating: false,
    amenities: false,
  });

  const {
    searchFilterParams,
    setSearchFilterBody,
    performSearchFilter,
    isLoading,
    error: storeError
  } = useSearchFilterStore();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setFilters({
      priceRange: [searchFilterParams.price_min, searchFilterParams.price_max],
      starRating: searchFilterParams.star_rating,
      amenities: searchFilterParams.amenities,
    });
  }, [searchFilterParams]);

  const handleUpdateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => updateFilter(prev, key, value));
    if (key === 'priceRange') {
      setSearchFilterBody({
        price_min: (value as number[])[0],
        price_max: (value as number[])[1]
      });
    } else if (key === 'starRating') {
      setSearchFilterBody({ star_rating: value as number });
    }
  }, [setSearchFilterBody]);

  const handleAmenityChangeWrapper = useCallback((checked: boolean, value: number) => {
    setFilters(prev => handleAmenityChange(prev, checked, value));
    const updatedAmenities = checked
      ? [...searchFilterParams.amenities, value]
      : searchFilterParams.amenities.filter(a => a !== value);
    setSearchFilterBody({ amenities: updatedAmenities });
  }, [searchFilterParams.amenities, setSearchFilterBody]);

  const validateFilters = useCallback((): boolean => {
    let isValid = true;
    const newInvalidFields = { starRating: false, amenities: false };
    let newError = null;

    if (filters.starRating === 0) {
      newError = "Please select a star rating.";
      newInvalidFields.starRating = true;
      isValid = false;
    }
    if (filters.amenities.length === 0) {
      newError = newError ? `${newError} Please select at least one amenity.` : "Please select at least one amenity.";
      newInvalidFields.amenities = true;
      isValid = false;
    }

    setError(newError);
    setInvalidFields(newInvalidFields);
    return isValid;
  }, [filters]);

  const handleApplyFilters = useCallback(() => {
    if (validateFilters()) {
      setError(null);
      performSearchFilter();
      onFilterSearch();
      setIsOpen(false);
    }
  }, [validateFilters, performSearchFilter, onFilterSearch]);

  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSearchFilterBody({
      price_min: 50,
      price_max: 10000000,
      star_rating: 0,
      amenities: [],
    });
    setError(null);
    setInvalidFields({ starRating: false, amenities: false });
  }, [setSearchFilterBody]);

  const toggleFilters = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <div>
      <div className="md:hidden mb-4">
        <Button onClick={toggleFilters} className="w-50 btn btn-primary">
          Filter
        </Button>
      </div>
      {(isOpen || windowWidth >= 768) && renderFilterContent({
        filters,
        handleUpdateFilter,
        handleAmenityChangeWrapper,
        invalidFields,
        error,
        storeError,
        handleResetFilters,
        handleApplyFilters,
        isLoading
      })}
    </div>
  );
};

export default SearchFilters;
