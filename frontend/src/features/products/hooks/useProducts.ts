import { useEffect } from 'react';
import { useStore } from '@/store';

export const useProducts = () => {
  const { products, loading, error, currentPage, totalPages, fetchProducts, setCurrentPage, filters } = useStore();

  useEffect(() => {
    void fetchProducts(filters, currentPage);
  }, [
    filters,
    currentPage,
    fetchProducts,
  ]);

  return {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
