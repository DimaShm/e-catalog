import { z } from 'zod';
import type { TFunction } from 'i18next';

export const createProductSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, t('validation.name.required')).max(255, t('validation.name.max')),
    description: z.string().min(1, t('validation.description.required')),
    category_id: z.union([z.string(), z.number(), z.undefined()]).refine(
      (val) => {
        // Empty string or undefined means no selection
        if (val === '' || val === undefined || val === null) {
          return false;
        }
        return true;
      },
      {
        message: t('validation.category.required'),
      }
    ),
    price: z.string()
      .min(1, t('validation.price.required'))
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0 && num <= 10000;
      }, { message: t('validation.price.range') }),
    rating: z.string()
      .min(1, t('validation.rating.required'))
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0 && num <= 5;
      }, { message: t('validation.rating.range') }),
  });

export type ProductFormValues = z.infer<ReturnType<typeof createProductSchema>>;
