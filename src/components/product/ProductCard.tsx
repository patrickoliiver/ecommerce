'use client';

import Image from 'next/image';
import { memo } from 'react';
import { Product } from '@/types';
import { formatPrice } from '@/utils';
import { useCartContext } from '@/contexts/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

const ProductCard = memo(({ product, onViewDetails }: ProductCardProps) => {
  const { addToCart, removeFromCart, updateQuantity, isInCart, getItemQuantity } = useCartContext();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} adicionado ao carrinho!`);
  };

  const handleRemoveFromCart = () => {
    if (itemQuantity > 1) {
      // Remove apenas 1 item se houver mais de 1
      updateQuantity(product.id, itemQuantity - 1);
      toast.success(`1 ${product.title} removido do carrinho!`);
    } else {
      // Remove completamente se for o último item
      removeFromCart(product.id);
      toast.success(`${product.title} removido do carrinho!`);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  const itemQuantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div 
        className="aspect-square bg-gray-100 flex items-center justify-center cursor-pointer" 
        onClick={handleViewDetails}
      >
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 
          className="font-medium text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={handleViewDetails}
        >
          {product.title}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating.rate)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.rating.count})
          </span>
        </div>
        
        <div className="flex flex-col gap-3">
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          
          <div className="flex items-center justify-between gap-2">
            {inCart && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {itemQuantity} no carrinho
              </span>
            )}
            
            <div className="flex gap-2 ml-auto">
              {inCart && (
                <button
                  onClick={handleRemoveFromCart}
                  className="bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-md font-medium transition-colors duration-200 text-sm flex items-center justify-center"
                >
                  -
                </button>
              )}
              
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm min-w-[40px] h-10 flex items-center justify-center"
              >
                {inCart ? "+" : "Adicionar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export { ProductCard };
