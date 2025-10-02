import type { ProductFilters } from '@/features/products/types/product.types';

export const DEBOUNCE_DELAY = {
  SEARCH: 500,
  PRICE_RANGE: 300,
} as const;

export const DEFAULT_FILTERS: ProductFilters = {
  search: '',
  category_id: undefined,
  min_price: undefined,
  max_price: undefined,
  rating: undefined,
  favorites_only: false,
  per_page: 12,
  page: 1,
};

export const PRICE_RANGE = {
  MIN: 0,
  MAX: 10000,
  STEP: 100,
} as const;
