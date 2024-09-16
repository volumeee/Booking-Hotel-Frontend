"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/landingpage/layout/Header";
import HeroSection from "@/components/landingpage/home/HeroSection";
import SearchBar from "@/components/landingpage/home/SearchBar";
import SearchFilters from "@/components/landingpage/home/SearchFilters";
import PopularHotels from "@/components/landingpage/home/PopularHotels";
import AvailableRooms from "@/components/landingpage/home/AvailableRooms";
import SearchRooms from "@/components/landingpage/home/SearchRooms";
import SearchFilterRooms from "@/components/landingpage/home/SearchFilterRooms";
import { RecentReviews } from "@/components/landingpage/home/RecentReviews";
import Footer from "@/components/landingpage/layout/Footer";
import { pageVariants, pageTransition } from "@/app/common/pageTransitions";
import { useSearchAndFilter } from "@/app/common/useSearchAndFilter";
import SortingOptions from "@/components/landingpage/common/SortingOptions";
import { SortOption } from "@/lib/utils";
import { useMediaQuery } from "@/app/common/useMediaQuery";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { hasSearched, hasFiltered, handleSearch, handleFilter } = useSearchAndFilter();
  const [sortOptions, setSortOptions] = useState<SortOption[]>(['price_asc', 'status_available']);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      if (newSortOption.startsWith('price_')) {
        updatedOptions[0] = newSortOption;
      } else if (newSortOption.startsWith('status_')) {
        updatedOptions[1] = newSortOption;
      }
      return updatedOptions;
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="landing-page"
        initial="initial"
        animate={isLoading ? "initial" : "animate"}
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="relative flex flex-col min-h-screen">
          <div className="sticky top-0 z-50">
            <Header />
          </div>
          <main className="flex-grow">
            <HeroSection />
            <div className="mb-8">
              <PopularHotels />
            </div>
            <div id="search" className="container mx-auto px-4 py-8">
              <div className="mb-4">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4">
                  <SearchFilters onFilterSearch={handleFilter} />
                </div>
                <div className="w-full md:w-3/4">
                  <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-between items-center mb-4`}>
                    <SortingOptions onSortChange={handleSortChange} initialSortOptions={sortOptions} />
                  </div>
                  {!hasSearched && !hasFiltered && <AvailableRooms sortOptions={sortOptions} />}
                  {hasSearched && !hasFiltered && <SearchRooms sortOptions={sortOptions} />}
                  {hasFiltered && <SearchFilterRooms sortOptions={sortOptions} />}
                </div>
              </div>
            </div>
            <div className="container mx-auto px-4">
              <RecentReviews />
            </div>
          </main>
          <Footer />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingPage;
