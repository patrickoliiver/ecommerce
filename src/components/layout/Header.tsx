'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCartContext } from '@/contexts/CartContext';
import { memo, useState } from 'react';
import Image from 'next/image';

const Header = memo(() => {
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const { cart } = useCartContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
    setIsMenuOpen(false);
  };

  const handleCartClick = () => {
    router.push('/cart');
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    router.push('/');
    setIsMenuOpen(false);
  };

  const handleOrdersClick = () => {
    router.push('/orders');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={handleHomeClick}
              className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 mr-2">
                <Image
                  src="https://lunacheckout.com/_next/static/media/logo-light.83a313fc.png"
                  alt="LunaCheckout Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 32px, 40px"
                  priority
                />
              </div>
              <span className="hidden sm:inline">LunaCheckout</span>
              <span className="sm:hidden">Luna</span>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Orders Button */}
            <button
              onClick={handleOrdersClick}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Pedidos
            </button>

            {/* Cart Button */}
            <button
              onClick={handleCartClick}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L4 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6m-5 6h-4" />
              </svg>
              <span className="text-sm font-medium">
                Carrinho ({cart.totalItems})
              </span>
              {cart.totalItems > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
              <span className="text-sm text-gray-700 font-medium">
                Olá, {user?.name?.firstname || 'Usuário'}!
              </span>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sair
            </button>
          </div>

          {/* Mobile Menu Button and Cart */}
          <div className="md:hidden flex items-center gap-2">
            {/* Cart Button Mobile - Outside menu */}
            <button
              onClick={handleCartClick}
              className={`relative flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                cart.totalItems > 0 
                  ? 'bg-blue-50 hover:bg-blue-100 border border-blue-200' 
                  : 'hover:bg-blue-50'
              }`}
              title={`Carrinho (${cart.totalItems} itens)`}
            >
              <svg 
                className={`w-6 h-6 transition-colors ${
                  cart.totalItems > 0 ? 'text-blue-700' : 'text-blue-600'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L4 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6m-5 6h-4" />
              </svg>
              {cart.totalItems > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-sm">
                  {cart.totalItems > 9 ? '9+' : cart.totalItems}
                </div>
              )}
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              {/* User Info Mobile */}
              <div className="flex items-center gap-3 px-3 py-3 bg-blue-50 rounded-lg mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {user?.name?.firstname?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name?.firstname || 'Usuário'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || 'usuario@email.com'}
                  </p>
                </div>
              </div>

              {/* Orders Button Mobile */}
              <button
                onClick={handleOrdersClick}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Meus Pedidos</p>
                  <p className="text-sm text-gray-500">Histórico de compras</p>
                </div>
              </button>

              {/* Logout Button Mobile */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-colors border-t border-gray-100 mt-2 pt-3"
              >
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-red-600">Sair</p>
                  <p className="text-sm text-red-400">Fazer logout</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export { Header };
