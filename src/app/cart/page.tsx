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
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Seu Carrinho</h1>
            <button 
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 font-medium px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              Limpar Carrinho
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de itens */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                  Itens no Carrinho ({itemCount})
                </h2>
                
                <div className="space-y-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-6 p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          width={100}
                          height={100}
                          className="rounded-xl object-contain bg-gray-50 p-2"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.product.title}</h3>
                        <p className="text-gray-500 text-sm mb-3 capitalize">{item.product.category}</p>
                        <p className="text-blue-600 font-bold text-xl">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-semibold transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-semibold transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-xl text-gray-900 mb-3">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-700 font-medium px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumo do pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Resumo do Pedido</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal ({itemCount} itens):</span>
                    <span className="font-semibold">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Frete:</span>
                    <span className="font-semibold text-green-600">Grátis</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-2xl font-bold">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-blue-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {isLoading ? 'Processando...' : 'Finalizar Compra'}
                </button>
                
                <button
                  onClick={() => router.push('/')}
                  className="w-full border border-gray-300 text-gray-700 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
