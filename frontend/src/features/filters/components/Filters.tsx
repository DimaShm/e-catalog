import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Input from '@/shared/components/ui/Input';
import Dropdown from '@/shared/components/ui/Dropdown';
import Slider from '@/shared/components/ui/Slider';
import Button from '@/shared/components/ui/Button';
import { PRICE_RANGE } from '../store/constants';
import { useFilters } from '../hooks/useFilters';

export default function Filters() {
  const { t } = useTranslation();
  const {
    categories,
    filters,
    searchInput,
    isSearching,
    priceRange,
    handleSearchChange,
    handlePriceChange,
    handleCategoryChange,
    handleRatingChange,
    handleFavoritesChange,
    resetFilters,
  } = useFilters();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4 border border-gray-200 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <img src="/icons/filter.svg" alt="" className="w-5 h-5 mr-2" />
        {t('Filters')}
      </h2>

      <div className="relative">
        <Input
          label={t('Search')}
          placeholder={t('Search products...')}
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        {isSearching && (
          <div className="absolute right-3 top-9">
            <Loader2 size={16} className="animate-spin text-blue-600" />
          </div>
        )}
      </div>

      <Dropdown
        label={t('Category')}
        value={filters.category_id || ''}
        onChange={handleCategoryChange}
        placeholder={t('Select a category')}
        options={[
          { value: '', label: t('All') },
          ...categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          })),
        ]}
      />

      <Slider
        label={t('Price Range')}
        min={PRICE_RANGE.MIN}
        max={PRICE_RANGE.MAX}
        step={PRICE_RANGE.STEP}
        value={priceRange}
        onValueChange={handlePriceChange}
      />

      <Dropdown
        label={t('Minimum Rating')}
        value={filters.rating || ''}
        onChange={handleRatingChange}
        placeholder={t('Any Rating')}
        options={[
          { value: 5, label: t('5 Stars') },
          { value: 4, label: t('4+ Stars') },
          { value: 3, label: t('3+ Stars') },
          { value: 2, label: t('2+ Stars') },
          { value: 1, label: t('1+ Stars') },
        ]}
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          id="favorites-only"
          checked={Boolean(filters.favorites_only)}
          onChange={(e) => handleFavoritesChange(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
        <label htmlFor="favorites-only" className="ml-2 text-sm text-gray-700 cursor-pointer">
          {t('Show only favorites')}
        </label>
      </div>

      <Button variant="outline" className="w-full" onClick={resetFilters}>
        {t('Reset Filters')}
      </Button>
    </div>
  );
}
