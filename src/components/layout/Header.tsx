'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCartContext } from '@/contexts/CartContext';
import { memo } from 'react';

const Header = memo(() => {
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const { cart } = useCartContext();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={handleHomeClick}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              🛍️ E-commerce
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Orders Button */}
            <button
              onClick={() => router.push('/orders')}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 border border-transparent hover:border-blue-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden sm:block">Meus Pedidos</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={handleCartClick}
              className="relative flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent hover:border-blue-200"
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L4 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6m-5 6h-4" />
              </svg>
              <span className="text-sm font-medium text-gray-900">
                Carrinho ({cart.totalItems})
              </span>
              {cart.totalItems > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cart.totalItems > 99 ? '99+' : cart.totalItems}
                </div>
              )}
            </button>
            
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">
                  {user?.name?.firstname?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <span className="text-sm text-gray-700 hidden sm:block font-medium">
                Olá, {user?.name?.firstname || 'Usuário'}!
              </span>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200 border border-transparent hover:border-red-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export { Header };
