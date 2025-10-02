import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { createProductSchema, type ProductFormValues } from '../schemas/productSchema';
import { useProductForm } from './useProductForm';

export function useProductFormSubmit() {
  const { t } = useTranslation();
  const { createProduct } = useProductForm();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(createProductSchema(t)),
    defaultValues: {
      category_id: undefined,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    await createProduct({
      name: data.name,
      description: data.description,
      category_id: Number(data.category_id),
      price: parseFloat(data.price),
      rating: parseFloat(data.rating),
    });
  };

  return { form, onSubmit };
}
