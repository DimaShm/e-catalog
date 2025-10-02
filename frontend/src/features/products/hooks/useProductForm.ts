import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import i18n from '@/i18n/config';
import { useStore } from '@/store';
import { productApi } from '../api/productApi';
import type { ProductFormData } from '../types/product.types';
import { DEFAULT_FILTERS } from '@/features/filters/store/constants';

export const useProductForm = () => {
  const navigate = useNavigate();
  const { resetFilters, fetchProducts, setCurrentPage } = useStore();

  const createProduct = async (data: ProductFormData) => {
    try {
      await productApi.create(data);
      toast.success(i18n.t('Product created successfully!'));
      resetFilters();
      setCurrentPage(1);
      // Fetch products with default filters after reset
      await fetchProducts(DEFAULT_FILTERS, 1);
      navigate('/catalog');
    } catch (error) {
      console.error('Failed to create product:', error);
      toast.error(i18n.t('Failed to create product. Please try again.'));
      throw error;
    }
  };

  return { createProduct };
};
