import { apiClient } from '@/shared/api/client';
import type { PaginatedResponse } from '@/shared/api/types';
import type { Product, ProductFilters, ProductFormData } from '../types/product.types';

export const productApi = {
  getAll: (filters?: ProductFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (typeof value === 'boolean') {
            if (value) params.append(key, '1');
          } else {
            params.append(key, String(value));
          }
        } else if (value === 0) {
          params.append(key, '0');
        }
      });
    }
    return apiClient.get<PaginatedResponse<Product>>(`/products?${params}`);
  },

  create: (data: ProductFormData) =>
    apiClient.post<Product>('/products', data),
};
