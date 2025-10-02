import { useEffect } from 'react';
import { useStore } from '@/store';

export const useCategories = () => {
  const { categories, fetchCategories } = useStore();

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  return { categories };
};
