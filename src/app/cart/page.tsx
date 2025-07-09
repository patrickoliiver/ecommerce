'use client';

import { useState } from 'react';
import { useCartContext } from '@/contexts/CartContext';
import { formatPrice } from '@/utils';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/layout';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const total = cart.total;
  const itemCount = cart.totalItems;

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    toast.success('Item removido do carrinho');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Carrinho limpo');
  };

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      toast.error('Carrinho está vazio');
      return;
    }
    
    setIsLoading(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1000));    
    setIsLoading(false);
    router.push('/checkout');
  };

  if (cart.items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Header />
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl shadow-xl p-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Seu Carrinho</h1>
                <p className="text-gray-600 text-lg mb-8">Seu carrinho está vazio</p>
                <p className="text-gray-500 mb-8">Que tal adicionar alguns produtos incríveis?</p>
                <button 
                  onClick={() => router.push('/')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
          {/* Header do carrinho */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Seu Carrinho</h1>
            <button 
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 font-medium px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200 self-start sm:self-auto"
            >
              Limpar Carrinho
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Lista de itens */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900">
                  Itens no Carrinho ({itemCount})
                </h2>
                
                <div className="space-y-4 sm:space-y-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
                      {/* Imagem do produto */}
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          width={100}
                          height={100}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain bg-gray-50 p-2"
                        />
                      </div>
                      
                      {/* Informações do produto */}
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-tight line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2 capitalize">{item.product.category}</p>
                        <p className="text-blue-600 font-bold text-xl mb-4">
                          {formatPrice(item.product.price)}
                        </p>
                        
                        {/* Controles em mobile */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          {/* Controles de quantidade */}
                          <div className="flex items-center bg-gray-50 rounded-lg p-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center font-semibold transition-colors duration-200 shadow-sm"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-semibold text-lg px-2">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center font-semibold transition-colors duration-200 shadow-sm"
                            >
                              +
                            </button>
                          </div>
                          
                          {/* Total e botão remover */}
                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            <p className="font-bold text-xl text-gray-900">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:text-red-700 font-medium px-3 py-1 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumo do pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-20">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900">Resumo do Pedido</h2>
                
                <div className="space-y-3 sm:space-y-4 mb-6">
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="text-gray-600">Subtotal ({itemCount} itens):</span>
                    <span className="font-semibold">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="text-gray-600">Frete:</span>
                    <span className="font-semibold text-green-600">Grátis</span>
                  </div>
                  <div className="border-t pt-3 sm:pt-4">
                    <div className="flex justify-between text-xl sm:text-2xl font-bold">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-blue-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando...
                      </span>
                    ) : (
                      'Finalizar Compra'
                    )}
                  </button>
                  
                  <button
                    onClick={() => router.push('/')}
                    className="w-full border border-gray-300 text-gray-700 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
