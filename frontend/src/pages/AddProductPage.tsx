import { useTranslation } from 'react-i18next';
import { ProductForm } from '@/features/products/components/ProductForm';
import { useProductFormSubmit } from '@/features/products/hooks/useProductFormSubmit';

export default function AddProductPage() {
  const { t } = useTranslation();
  const { form, onSubmit } = useProductFormSubmit();

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('Add New Product')}</h1>
          <p className="mt-2 text-gray-600">{t('Fill in the form to add a new product to the catalog')}</p>
        </header>

        <ProductForm form={form} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
