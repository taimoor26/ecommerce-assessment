// components/ProductCard.tsx

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../lib/graphql';
import { useCart } from './CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // Memoized discount calculation - only recalculates when product changes
  const discountPercentage = useMemo(() => {
    // Simple discount logic instead of expensive calculation
    return product.price > 50 ? Math.floor(Math.random() * 15) + 5 : 0;
  }, [product.price]);

  // Memoized event handlers to prevent recreation on every render
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    addToCart(product);
  }, [addToCart, product]);

  const handleCardClick = useCallback(() => {
    router.push(`/products/${product.id}`);
  }, [router, product.id]);

  return (
    <div
      className='product-card cursor-pointer shadow-lg flex flex-col h-full bg-white rounded-lg overflow-hidden cursor-pointer'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      <div className='relative overflow-hidden'>
        <img
          src={product.imageUrl}
          alt={product.name}
          className='product-image w-full h-48 object-cover'
          loading='lazy'
        />
        <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm'>
          <span className='text-lg font-bold text-green-600'>
            ${product.price.toFixed(2)}
          </span>
          {discountPercentage > 0 && (
            <div className='text-xs text-red-500 mt-1 font-medium'>
              {discountPercentage}% off
            </div>
          )}
        </div>
      </div>

      <div className='p-6 flex flex-col flex-grow'>
        <h3 className='text-xl font-semibold text-gray-900 mb-2 line-clamp-2'>
          {product.name}
        </h3>
        <p className='text-gray-600 text-sm flex-grow mb-4 leading-relaxed line-clamp-3'>
          {product.description}
        </p>

        <div className='mt-auto'>
          <button
            onClick={handleAddToCart}
            className='add-to-cart-btn w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
