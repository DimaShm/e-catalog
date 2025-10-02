import type { UseFormReturn } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { ProductFormValues } from '../../schemas/productSchema';
import { useCategories } from '@/features/categories/hooks/useCategories';
import Input from '@/shared/components/ui/Input';
import Dropdown from '@/shared/components/ui/Dropdown';
import Textarea from '@/shared/components/ui/Textarea';
import Button from '@/shared/components/ui/Button';

interface ProductFormProps {
  form: UseFormReturn<ProductFormValues>;
  onSubmit: (data: ProductFormValues) => Promise<void>;
}

export function ProductForm({ form, onSubmit }: ProductFormProps) {
  const { t } = useTranslation();
  const { categories } = useCategories();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = form;

  const categoryId = watch('category_id');

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4" aria-label={t('Product creation form')}>
        <Input
          label={t('Product Name')}
          {...register('name')}
          error={errors.name?.message}
          placeholder={t('Enter product name')}
        />

        <Textarea
          label={t('Description')}
          {...register('description')}
          error={errors.description?.message}
          placeholder={t('Enter product description')}
          rows={4}
        />

        <Dropdown
          label={t('Category')}
          value={categoryId}
          onChange={(value) => {
            setValue('category_id', value as number, { shouldValidate: true });
          }}
          error={errors.category_id?.message}
          placeholder={t('Select a category')}
          options={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
        />

        <Input
          label={t('Price ($)')}
          type="number"
          step="0.01"
          min="0"
          {...register('price')}
          error={errors.price?.message}
          placeholder="0.00"
        />

        <Input
          label={t('Rating (0-5)')}
          type="number"
          step="0.01"
          min="0"
          max="5"
          {...register('rating')}
          error={errors.rating?.message}
          placeholder="0.00"
        />

        <div className="flex gap-4 pt-6 border-t border-gray-200 mt-6">
          <Link
            to="/catalog"
            className="flex-1 inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer border border-gray-300 bg-white hover:bg-gray-50 h-10 px-4 py-3 text-base"
          >
            {t('Cancel')}
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-base"
          >
            {isSubmitting ? t('Saving...') : t('Save')}
          </Button>
        </div>
      </form>
    </div>
  );
}
