import type { StateCreator } from 'zustand';
import { toast } from 'sonner';
import i18n from '@/i18n/config';
import { favoriteApi } from '../api/favoriteApi';
import type { Product, ProductFilters } from '@/features/products/types/product.types';

export interface FavoriteSlice {
  toggleFavorite: (productId: number) => Promise<void>;
}

interface CombinedStoreState extends FavoriteSlice {
  products?: Product[];
  filters?: ProductFilters;
  currentPage?: number;
  fetchProducts?: (filters: ProductFilters, page: number) => Promise<void>;
}

export const createFavoriteSlice: StateCreator<FavoriteSlice, [], [], FavoriteSlice> = (set, get) => ({
  toggleFavorite: async (productId: number) => {
    try {
      const { data } = await favoriteApi.toggle(productId);
      const state = get() as CombinedStoreState;

      if (state.filters?.favorites_only && !data.is_favorite) {
        if (state.fetchProducts && state.filters && state.currentPage) {
          await state.fetchProducts(state.filters, state.currentPage);
        }
      } else if (state.products) {
        const updatedProducts = state.products.map((p: Product) =>
          p.id === productId ? { ...p, is_favorite: data.is_favorite } : p
        );
        set({ products: updatedProducts } as Partial<CombinedStoreState>);
      }

      if (data.is_favorite) {
        toast.success(i18n.t('Added to favorites'));
      } else {
        toast.info(i18n.t('Removed from favorites'));
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast.error(i18n.t('Failed to update favorites'));
    }
  },
});
