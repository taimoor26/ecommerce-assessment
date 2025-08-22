'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, Product } from '../../../lib/graphql';
import { useCart } from '../../../components/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all products and find the one with matching ID
        const { data } = await fetchProducts();
        const foundProduct = data.products.find((p: Product) => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addToCart(product);
    }
  }, [addToCart, product]);

  if (loading) {
    return (
      <div className='p-8 flex justify-center items-center min-h-screen'>
        <div className='text-lg'>Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-8 flex justify-center items-center min-h-screen'>
        <div className='text-lg text-red-600'>{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='p-8 flex justify-center items-center min-h-screen'>
        <div className='text-lg'>Product not found</div>
      </div>
    );
  }

  return (
    <div className='p-8 max-w-4xl mx-auto'>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className='md:flex'>
          <div className='md:w-1/2'>
            <img
              src={product.imageUrl}
              alt={product.name}
              className='w-full h-96 object-cover'
            />
          </div>
          <div className='p-8 md:w-1/2'>
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>
              {product.name}
            </h1>
            <p className='text-gray-600 mb-6 leading-relaxed'>
              {product.description}
            </p>
            <div className='text-3xl font-bold text-green-600 mb-6'>
              ${product.price.toFixed(2)}
            </div>
            {product.sku && (
              <p className='text-sm text-gray-500 mb-4'>SKU: {product.sku}</p>
            )}
            {product.inventory !== undefined && (
              <p className='text-sm text-gray-500 mb-4'>
                In Stock: {product.inventory} units
              </p>
            )}
            <button 
              onClick={handleAddToCart}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
