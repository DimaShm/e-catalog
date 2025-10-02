import { useEffect, useState, useCallback, useRef } from 'react';
import { useStore } from '@/store';
import { DEBOUNCE_DELAY, PRICE_RANGE } from '../store/constants';

export const useFilters = () => {
  const { categories, filters, setFilters, resetFilters, fetchCategories } = useStore();
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const [isSearching, setIsSearching] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.min_price || PRICE_RANGE.MIN,
    filters.max_price || PRICE_RANGE.MAX,
  ]);

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const priceTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    setSearchInput(filters.search || '');
    setPriceRange([filters.min_price || PRICE_RANGE.MIN, filters.max_price || PRICE_RANGE.MAX]);
  }, [filters.search, filters.min_price, filters.max_price]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (priceTimeoutRef.current) {
        clearTimeout(priceTimeoutRef.current);
      }
    };
  }, []);

  const debouncedSearch = useCallback((value: string) => {
    setIsSearching(true);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setFilters({ search: value });
      setIsSearching(false);
    }, DEBOUNCE_DELAY.SEARCH);
  }, [setFilters]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const handlePriceChange = useCallback((value: [number, number]) => {
    setPriceRange(value);
    if (priceTimeoutRef.current) {
      clearTimeout(priceTimeoutRef.current);
    }
    priceTimeoutRef.current = setTimeout(() => {
      setFilters({ min_price: value[0], max_price: value[1] });
    }, DEBOUNCE_DELAY.PRICE_RANGE);
  }, [setFilters]);

  const handleCategoryChange = useCallback((value: string | number) => {
    setFilters({
      category_id: value ? Number(value) : undefined,
    });
  }, [setFilters]);

  const handleRatingChange = useCallback((value: string | number) => {
    setFilters({
      rating: value ? parseFloat(String(value)) : undefined,
    });
  }, [setFilters]);

  const handleFavoritesChange = useCallback((checked: boolean) => {
    setFilters({ favorites_only: checked });
  }, [setFilters]);

  return {
    categories,
    filters,
    searchInput,
    isSearching,
    priceRange,
    handleSearchChange,
    handlePriceChange,
    handleCategoryChange,
    handleRatingChange,
    handleFavoritesChange,
    resetFilters,
  };
};
