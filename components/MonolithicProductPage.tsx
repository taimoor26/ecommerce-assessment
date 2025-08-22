'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useCart } from './CartContext';
import { Product } from '../lib/graphql';

interface MonolithicProductPageProps {
  products: Product[];
}

export default function MonolithicProductPage({ products }: MonolithicProductPageProps) {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'name' | 'price'>('name');
  const [filterPrice, setFilterPrice] = useState(1000);

  const filteredProducts = useMemo(() => 
    products?.filter(
      (product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price <= filterPrice
    ) || [], 
    [products, searchTerm, filterPrice]
  );

  const sortedProducts = useMemo(() => 
    filteredProducts.sort((a: Product, b: Product) => {
      if (sortOrder === 'name') return a.name.localeCompare(b.name);
      if (sortOrder === 'price') return a.price - b.price;
      return 0;
    }), 
    [filteredProducts, sortOrder]
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'name' | 'price');
  }, []);

  const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterPrice(Number(e.target.value));
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
  }, [addToCart]);

  if (!products || products.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-gray-400 text-6xl mb-4'>📦</div>
          <h1 className='text-2xl font-bold text-gray-600 mb-2'>No Products Available</h1>
          <p className='text-gray-500'>Please check back later for new products.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-6'>
            Product Catalog
          </h1>

          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center'>
            <div className='flex-1 w-full lg:w-auto'>
              <label htmlFor='search-input' className='sr-only'>
                Search products
              </label>
              <input
                id='search-input'
                type='text'
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder='Search products...'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                aria-label='Search products by name'
              />
            </div>

            <div className='flex flex-col sm:flex-row gap-4 w-full lg:w-auto'>
              <div>
                <label htmlFor='sort-select' className='sr-only'>
                  Sort products
                </label>
                <select
                  id='sort-select'
                  value={sortOrder}
                  onChange={handleSortChange}
                  className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                >
                  <option value='name'>Sort by Name</option>
                  <option value='price'>Sort by Price</option>
                </select>
              </div>

              <div className='flex flex-col'>
                <label htmlFor='price-range' className='text-sm font-medium text-gray-700 mb-2'>
                  Max Price: ${filterPrice}
                </label>
                <input
                  id='price-range'
                  type='range'
                  min='0'
                  max='500'
                  value={filterPrice}
                  onChange={handlePriceChange}
                  className='w-full lg:w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider'
                  aria-label='Filter products by maximum price'
                />
              </div>
            </div>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>🔍</div>
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>No products found</h3>
            <p className='text-gray-500'>
              Try adjusting your search terms or price filter.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {sortedProducts.map((product: Product) => (
              <div
                key={product.id}
                className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200'
              >
                <div className='relative'>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className='w-full h-48 object-cover'
                    loading='lazy'
                  />
                  {product.inventory !== undefined && product.inventory < 10 && (
                    <div className='absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium'>
                      Low Stock
                    </div>
                  )}
                </div>

                <div className='p-4'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2'>
                    {product.name}
                  </h3>
                  <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                    {product.description}
                  </p>

                  <div className='flex items-center justify-between'>
                    <span className='text-xl font-bold text-green-600'>
                      ${product.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      aria-label={`Add ${product.name} to cart`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
