import type { Category } from '../../categories/types/category.types';

export interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  price: string;
  rating: string;
  created_at: string;
  updated_at: string;
  category?: Category;
  is_favorite?: boolean;
}

export interface ProductFormData {
  name: string;
  description: string;
  category_id: number;
  price: number;
  rating: number;
}

export interface ProductFilters {
  category_id?: number;
  min_price?: number;
  max_price?: number;
  rating?: number;
  search?: string;
  favorites_only?: boolean;
  per_page?: number;
  page?: number;
}
