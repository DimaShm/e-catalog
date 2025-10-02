import type { StateCreator } from 'zustand';
import type { ProductFilters } from '@/features/products/types/product.types';
import { DEFAULT_FILTERS } from './constants';

export interface FilterSlice {
  filters: ProductFilters;

  setFilters: (filters: Partial<ProductFilters>) => void;
  resetFilters: () => void;
}

export const createFilterSlice: StateCreator<FilterSlice> = (set) => ({
  filters: DEFAULT_FILTERS,

  setFilters: (newFilters: Partial<ProductFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  resetFilters: () => {
    set({ filters: DEFAULT_FILTERS });
  },
});
