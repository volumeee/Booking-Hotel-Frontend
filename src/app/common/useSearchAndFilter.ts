import { useState } from "react";
import { useSearchFilterStore, useSearchStore } from "@/store/LandingPageStore";

export const useSearchAndFilter = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [hasFiltered, setHasFiltered] = useState(false);
  const { performSearch } = useSearchStore();
  const { performSearchFilter } = useSearchFilterStore();

  const handleSearch = async () => {
    await performSearch();
    setHasSearched(true);
    setHasFiltered(false);
  };

  const handleFilter = async () => {
    await performSearchFilter();
    setHasFiltered(true);
  };

  return { hasSearched, hasFiltered, handleSearch, handleFilter };
};
