import { memo, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Product } from '../types/product.types';
import { formatPrice } from '@/shared/lib/utils';
import { useStore } from '@/store';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  const handleToggleFavorite = useCallback(async () => {
    await toggleFavorite(product.id);
  }, [toggleFavorite, product.id]);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 hover:border-blue-200">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 flex-1">
            {product.name}
          </h3>
          <button
            onClick={handleToggleFavorite}
            className="ml-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 cursor-pointer"
            aria-label={product.is_favorite ? t('Remove from favorites') : t('Add to favorites')}
          >
            <Heart
              size={20}
              className={`transition-all ${
                product.is_favorite ? 'fill-red-500 text-red-500 scale-110' : ''
              }`}
            />
          </button>
        </div>

        <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full mb-2">
          {product.category?.name}
        </span>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[2.5rem]">
          {product.description}
        </p>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm font-semibold text-gray-700">
              {product.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
