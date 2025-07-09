'use client';

import { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { useCategories } from '@/hooks';
import { ProductFilters } from '@/types';
import { debounce } from '@/utils';

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

export const ProductFiltersComponent = ({ filters, onFiltersChange }: ProductFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const { data: categories } = useCategories();

  const debouncedSearch = debounce((...args: unknown[]) => {
    const value = args[0] as string;
    onFiltersChange({ ...filters, search: value });
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleCategoryChange = (category: string) => {
    onFiltersChange({ 
      ...filters, 
      category: category === 'all' ? undefined : category 
    });
  };

  const handleSortChange = (sortBy: ProductFilters['sortBy']) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const clearFilters = () => {
    setSearchTerm('');
    onFiltersChange({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="flex-1 min-w-64">
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={handleSearchChange}
            startIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={!filters.category ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleCategoryChange('all')}
          >
            Todos
          </Button>
          {categories?.map((category) => (
            <Button
              key={category}
              variant={filters.category === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className={filters.category === category ? 
                'bg-blue-600 text-white hover:bg-blue-700' : 
                'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={filters.sortBy || ''}
          onChange={(e) => handleSortChange(e.target.value as ProductFilters['sortBy'])}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Ordenar por</option>
          <option value="name-asc">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
          <option value="rating">Melhor avaliação</option>
        </select>

        {/* Clear Filters */}
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
        >
          Limpar filtros
        </Button>
      </div>
    </div>
  );
};
