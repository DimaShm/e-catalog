import { apiClient } from '@/shared/api/client';
import type { Category } from '../types/category.types';

export const categoryApi = {
  getAll: () => apiClient.get<Category[]>('/categories'),

  create: (data: { name: string }) =>
    apiClient.post<Category>('/categories', data),
};
