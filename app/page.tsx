'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchProducts, Product } from '../lib/graphql';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await fetchProducts();
        setProducts(data.products);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => 
    products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    ), 
    [products, searchTerm]
  );

  const sortedProducts = useMemo(() => 
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name)), 
    [filteredProducts]
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-lg text-gray-600'>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center'>
        <div className='text-center max-w-md mx-auto p-6'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>Oops! Something went wrong</h1>
          <p className='text-gray-600 mb-6'>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='container mx-auto px-4 py-8'>
        {/* Hero Section */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Welcome to Our Store
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Discover our curated collection of premium products, carefully
            selected for style and quality.
          </p>
        </div>

        {/* Products Section */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 sm:mb-0'>
              Featured Products ({sortedProducts.length})
            </h2>
            <div className='w-full sm:w-80'>
              <label htmlFor='search-input' className='sr-only'>
                Search products
              </label>
              <input
                id='search-input'
                type='text'
                placeholder='Search products...'
                value={searchTerm}
                onChange={handleSearchChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                aria-label='Search products by name or description'
              />
            </div>
          </div>
          
          {sortedProducts.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-gray-400 text-6xl mb-4'>🔍</div>
              <h3 className='text-xl font-semibold text-gray-600 mb-2'>No products found</h3>
              <p className='text-gray-500'>
                Try adjusting your search terms or browse all our products.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {sortedProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className='mt-16 py-12 bg-white rounded-xl shadow-sm'>
          <div className='max-w-4xl mx-auto px-6'>
            <h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>
              Why Choose Us?
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-blue-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
                    />
                  </svg>
                </div>
                <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                  Free Shipping
                </h4>
                <p className='text-gray-600'>
                  Free shipping on all orders over $50
                </p>
              </div>
              <div className='text-center'>
                <div className='bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-green-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                  Quality Guaranteed
                </h4>
                <p className='text-gray-600'>30-day money-back guarantee</p>
              </div>
              <div className='text-center'>
                <div className='bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-purple-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z'
                    />
                  </svg>
                </div>
                <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                  24/7 Support
                </h4>
                <p className='text-gray-600'>
                  Round-the-clock customer support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
