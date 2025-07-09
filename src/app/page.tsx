'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/layout';
import { ProductGrid } from '@/components/product/ProductGrid';

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Produtos em Destaque
            </h1>
            <p className="text-gray-600">
              Descubra nossa seleção de produtos incríveis com filtros e busca
            </p>
          </div>

          <ProductGrid />
        </main>
      </div>
    </ProtectedRoute>
  );
}
