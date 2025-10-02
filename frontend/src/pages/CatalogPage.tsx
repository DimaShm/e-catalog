import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useProducts } from '@/features/products/hooks/useProducts';
import { ProductList } from '@/features/products/components/ProductList';
import Filters from '@/features/filters/components/Filters';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import { Pagination } from '@/shared/components/Pagination';

export default function CatalogPage() {
  const { products, loading, currentPage, totalPages, setCurrentPage } = useProducts();
  const { t } = useTranslation();

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('Product Catalog')}</h1>
          <p className="mt-2 text-gray-600">{t('Browse and filter products by category, price, and rating')}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1" role="complementary" aria-label={t('Product filters')}>
            <Filters />
          </aside>

          <section className="lg:col-span-3" aria-label={t('Product list')}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <ProductList products={products} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
