'use client';

import { useState, memo, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { ProductFiltersComponent } from './ProductFilters';
import { useProducts } from '@/hooks';
import { Loading } from '@/components/ui';
import { Product, ProductFilters } from '@/types';
import { useRouter } from 'next/navigation';

const ProductGrid = memo(() => {
  const [filters, setFilters] = useState<ProductFilters>({});
  const { data: products, isLoading, error } = useProducts();
  const router = useRouter();

  const handleViewDetails = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  // Memoização para otimizar filtragem e ordenação
  const sortedProducts = useMemo(() => {
    const filtered = products?.filter(product => {
      // Filter by category
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Filter by search term
      if (filters.search && !product.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Filter by price range
      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }

      return true;
    });

    return filtered?.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });
  }, [products, filters]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loading text="Carregando produtos..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-error-600 mb-4">
          Erro ao carregar produtos. Tente novamente.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="text-primary-600 hover:text-primary-700 underline"
        >
          Recarregar página
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProductFiltersComponent filters={filters} onFiltersChange={setFilters} />
      
      {sortedProducts && sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-secondary-600">
            Nenhum produto encontrado com os filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export { ProductGrid };
