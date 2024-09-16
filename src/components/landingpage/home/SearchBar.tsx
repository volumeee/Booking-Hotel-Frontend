"use client";

import React from "react";
import { Input, Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { FaSearch, FaCalendarAlt, FaUser } from "react-icons/fa";
import { AnimationWrapper } from "@/components/landingpage/common/AnimationWrapper";
import GuestSelector from "@/components/landingpage/common/GuestSelector";
import DateRangePicker from "@/components/landingpage/common/DateRangePicker";
import { dateUtils } from "@/lib/utils";
import { useSearchStore } from "@/store/LandingPageStore";

interface SearchBarProps {
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { searchParams, setSearchParams, isLoading, error } = useSearchStore();
  const [errors, setErrors] = React.useState({ location: false, dates: false, guests: false });

  const handleParamChange = (param: any, value: any) => {
    setSearchParams({ [param]: value });
    setErrors(prev => ({ ...prev, [param]: false }));
  };

  const handleSearch = () => {
    const newErrors = {
      location: !searchParams.location.trim(),
      dates: !searchParams.checkIn || !searchParams.checkOut,
      guests: searchParams.guests < 1
    };
    setErrors(newErrors);
    if (!Object.values(newErrors).some(Boolean)) onSearch();
  };

  const getDateButtonText = () => {
    if (!searchParams.checkIn || !searchParams.checkOut) return "Check-in / Check-out";
    return `${dateUtils.format(dateUtils.parse(searchParams.checkIn))} / ${dateUtils.format(dateUtils.parse(searchParams.checkOut))}`;
  };


  return (
    <AnimationWrapper type="scale" transition={{ duration: 0.5 }}>
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-lg">
        <Input
          placeholder="Where are you going?"
          startContent={<FaSearch />}
          value={searchParams.location}
          onChange={e => handleParamChange('location', e.target.value.toLowerCase())}
          isInvalid={errors.location}
          errorMessage={errors.location ? "Please fill in all required fields." : ""}
        />
        <Popover placement="bottom" showArrow>
          <PopoverTrigger>
            <Button variant="flat" startContent={<FaCalendarAlt />} className={`p-5 ${errors.dates ? "bg-[#ffd9e6ab]" : ""}`}>
              {getDateButtonText()}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <DateRangePicker
              checkIn={searchParams.checkIn ? dateUtils.parse(searchParams.checkIn) : null}
              checkOut={searchParams.checkOut ? dateUtils.parse(searchParams.checkOut) : null}
              onCheckInChange={date => handleParamChange('checkIn', dateUtils.formatForParams(date))}
              onCheckOutChange={date => handleParamChange('checkOut', dateUtils.formatForParams(date))}
              isInvalid={errors.dates}
            />
          </PopoverContent>
        </Popover>
        <Popover placement="bottom" showArrow>
          <PopoverTrigger>
            <Button variant="flat" startContent={<FaUser />} className={errors.guests ? "border-red-500" : ""}>
              {`${searchParams.guests} ${searchParams.guests > 1 ? "" : ""}`}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4">
              <GuestSelector
                label="Guests"
                value={searchParams.guests}
                onChange={value => handleParamChange('guests', Math.max(1, value))}
              />
            </div>
          </PopoverContent>
        </Popover>
        <Button color="primary" onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
      {error && <p className="text-red-500 mt-2 text-xs">{error}</p>}
    </AnimationWrapper>
  );
};

export default SearchBar;
