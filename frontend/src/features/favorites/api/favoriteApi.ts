import { apiClient } from '@/shared/api/client';

export const favoriteApi = {
  toggle: (product_id: number) =>
    apiClient.post<{ is_favorite: boolean }>('/favorites/toggle', { product_id }),
};
