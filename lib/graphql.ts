export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  sku?: string;
  inventory?: number;
  manufacturer?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  tags?: string[];
  reviews?: Review[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

export interface ProductsResponse {
  data: {
    products: Product[];
  };
}

export interface GraphQLError {
  message: string;
  code?: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 25.0,
    description:
      'A comfortable and stylish classic white cotton t-shirt, perfect for any casual occasion.',
    imageUrl:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center',
  },
  {
    id: '2',
    name: 'Premium Denim Jeans',
    price: 60.0,
    description:
      'Durable premium denim jeans with a modern slim fit, crafted for everyday comfort and style.',
    imageUrl:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop&crop=center',
  },
  {
    id: '3',
    name: 'Vintage Leather Jacket',
    price: 150.0,
    description:
      'Premium genuine leather jacket with vintage styling, perfect for creating a timeless look.',
    imageUrl:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop&crop=center',
  },
  {
    id: '4',
    name: 'Athletic Running Shoes',
    price: 80.0,
    description:
      'Lightweight, breathable running shoes with advanced cushioning technology for maximum comfort.',
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&crop=center',
  },
  {
    id: '5',
    name: 'Cozy Knit Sweater',
    price: 45.0,
    description:
      'Soft, warm knit sweater made from premium wool blend, ideal for cooler weather.',
    imageUrl:
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop&crop=center',
  },
  {
    id: '6',
    name: 'Designer Sunglasses',
    price: 120.0,
    description:
      'Stylish designer sunglasses with UV protection and premium polarized lenses.',
    imageUrl:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop&crop=center',
  },
];

export async function fetchProducts(): Promise<ProductsResponse> {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        const productsWithExtraData = mockProducts.map((p) => ({
          ...p,
          sku: `SKU-${p.id}`,
          inventory: Math.floor(Math.random() * 100) + 1, // Ensure at least 1 in stock
          manufacturer: 'StyleStore Brand',
          weight: Math.round((Math.random() * 5 + 0.1) * 100) / 100, // Round to 2 decimal places
          dimensions: { 
            width: Math.floor(Math.random() * 20) + 10, 
            height: Math.floor(Math.random() * 20) + 10, 
            depth: Math.floor(Math.random() * 20) + 10 
          },
          tags: ['fashion', 'premium', 'trending'],
          reviews: generateMockReviews(),
        }));
        
        resolve({ data: { products: productsWithExtraData } });
      } catch (error) {
        // Log error but don't crash the app
        console.error('Error generating mock products:', error);
        // Return empty products instead of crashing
        resolve({ data: { products: [] } });
      }
    }, 500);
  });
}

function generateMockReviews(): Review[] {
  const reviewCount = Math.floor(Math.random() * 5) + 1;
  const reviews: Review[] = [];
  
  for (let i = 0; i < reviewCount; i++) {
    reviews.push({
      id: `review-${i + 1}`,
      rating: Math.floor(Math.random() * 5) + 1,
      comment: getRandomReviewComment(),
      author: getRandomAuthor(),
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  }
  
  return reviews;
}

function getRandomReviewComment(): string {
  const comments = [
    'Great quality product!',
    'Exactly what I was looking for.',
    'Fast shipping and excellent service.',
    'Highly recommend this item.',
    'Good value for money.',
    'Perfect fit and comfortable.',
    'Beautiful design and craftsmanship.',
    'Exceeded my expectations.',
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}

function getRandomAuthor(): string {
  const authors = [
    'Sarah M.',
    'John D.',
    'Emily R.',
    'Michael T.',
    'Lisa K.',
    'David P.',
    'Amanda W.',
    'Robert L.',
  ];
  return authors[Math.floor(Math.random() * authors.length)];
}
