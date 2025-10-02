import { create } from 'zustand';
import { createProductSlice, type ProductSlice } from '@/features/products/store/productSlice';
import { createFilterSlice, type FilterSlice } from '@/features/filters/store/filterSlice';
import { createCategorySlice, type CategorySlice } from '@/features/categories/store/categorySlice';
import { createFavoriteSlice, type FavoriteSlice } from '@/features/favorites/store/favoriteSlice';

type StoreState = ProductSlice & FilterSlice & CategorySlice & FavoriteSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createProductSlice(...a),
  ...createFilterSlice(...a),
  ...createCategorySlice(...a),
  ...createFavoriteSlice(...a),
}));

export type { StoreState };
