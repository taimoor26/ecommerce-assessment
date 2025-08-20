'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `SELECT * FROM products WHERE id = '${productId}'`;
      console.log('Executing query:', query);
      setProduct({
        id: productId,
        name: `Product ${productId}`,
        price: 99.99,
        description: 'Sample product',
      });
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className='p-8'>
      {product && (
        <>
          <h1
            className='text-3xl mb-4'
            dangerouslySetInnerHTML={{
              __html: product.name,
            }}
          />
          <p>ID: {productId}</p>
          <p>Price: ${product.price}</p>
        </>
      )}
    </div>
  );
}
