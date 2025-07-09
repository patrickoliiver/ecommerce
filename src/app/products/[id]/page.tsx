'use client';

import { use, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/layout';
import { Button, Loading } from '@/components/ui';
import { useProduct } from '@/hooks';
import { useCartContext } from '@/contexts/CartContext';
import { formatPrice } from '@/utils';
import toast from 'react-hot-toast';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data: product, isLoading, error } = useProduct(parseInt(id));
  const { addToCart, removeFromCart, updateQuantity, isInCart, getItemQuantity } = useCartContext();

  // Usar useMemo para otimizar verificações
  const imageProps = useMemo(() => {
    if (!product) return { src: '', alt: '' };
    
    return {
      src: product.image,
      alt: product.title,
      priority: true // Prioridade alta para carregamento
    };
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.title} adicionado ao carrinho!`);
    }
  };

  const handleRemoveFromCart = () => {
    if (product) {
      const currentQuantity = getItemQuantity(product.id);
      if (currentQuantity > 1) {
        // Remove apenas 1 item se houver mais de 1
        updateQuantity(product.id, currentQuantity - 1);
        toast.success(`1 ${product.title} removido do carrinho!`);
      } else {
        // Remove completamente se for o último item
        removeFromCart(product.id);
        toast.success(`${product.title} removido do carrinho!`);
      }
    }
  };

  const handleBackToProducts = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-secondary-50">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center py-12">
              <Loading text="Carregando produto..." />
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !product) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-secondary-50">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <p className="text-error-600 mb-4">
                Produto não encontrado ou erro ao carregar.
              </p>
              <Button variant="outline" onClick={handleBackToProducts}>
                Voltar aos produtos
              </Button>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  const itemQuantity = getItemQuantity(product.id);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <button
              onClick={handleBackToProducts}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar aos produtos
            </button>
          </nav>

          {/* Product Detail */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center rounded-lg">
                <Image
                  src={imageProps.src}
                  alt={imageProps.alt}
                  width={500}
                  height={500}
                  priority={imageProps.priority}
                  className="w-full h-full object-contain p-8"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <span className="text-sm text-blue-600 font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mt-2">
                    {product.title}
                  </h1>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating.rate)
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating.rate.toFixed(1)} ({product.rating.count} avaliações)
                  </span>
                </div>

                {/* Price */}
                <div className="text-4xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Descrição
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {isInCart(product.id) && (
                      <button
                        onClick={handleRemoveFromCart}
                        className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                        Remover
                      </button>
                    )}
                    
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      {isInCart(product.id) ? 'Adicionar Mais' : 'Adicionar ao Carrinho'}
                    </button>
                  </div>
                  
                  {isInCart(product.id) && (
                    <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-sm font-medium border border-blue-200">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {itemQuantity} {itemQuantity === 1 ? 'item' : 'itens'} no carrinho
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div className="border-t pt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Frete grátis acima de R$ 100
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Troca e devolução em 30 dias
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Garantia do fabricante
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
