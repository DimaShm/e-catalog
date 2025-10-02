import type { StateCreator } from 'zustand';
import { toast } from 'sonner';
import i18n from '@/i18n/config';
import { categoryApi } from '../api/categoryApi';
import type { Category } from '../types/category.types';

export interface CategorySlice {
  categories: Category[];

  fetchCategories: () => Promise<void>;
}

export const createCategorySlice: StateCreator<CategorySlice> = (set) => ({
  categories: [],

  fetchCategories: async () => {
    try {
      const response = await categoryApi.getAll();
      set({ categories: response.data });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error(i18n.t('Failed to load categories'));
    }
  },
});
