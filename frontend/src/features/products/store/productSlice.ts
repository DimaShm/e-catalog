import type { StateCreator } from 'zustand';
import { productApi } from '../api/productApi';
import type { Product, ProductFilters } from '../types/product.types';

export interface ProductSlice {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;

  fetchProducts: (filters: ProductFilters, page: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

export const createProductSlice: StateCreator<ProductSlice> = (set) => ({
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,

  fetchProducts: async (filters: ProductFilters, page: number) => {
    set({ loading: true, error: null });
    try {
      const { data } = await productApi.getAll({ ...filters, page });
      set({
        products: data.data,
        totalPages: data.last_page,
        currentPage: page,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      set({ error: 'Failed to load products', loading: false });
    }
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },
});
