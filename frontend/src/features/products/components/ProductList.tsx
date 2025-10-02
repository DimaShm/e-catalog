import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';
import type { Product } from '../types/product.types';

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  const { t } = useTranslation();

  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg border border-gray-200">
        <img src="/icons/empty-box.svg" alt="" className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">{t('No products found')}</p>
        <p className="text-gray-400 text-sm mt-1">{t('Try adjusting your filters')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

const MemoizedProductList = memo(ProductList);
export { MemoizedProductList as ProductList };
