# Simple E-Commerce Demo Site

This is a simple e-commerce demo application built with Next.js (App Router), React, TypeScript, Tailwind CSS, and GraphQL (mocked).

## Getting Started

1. Clone this repository

2. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   pnpm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Important Notes

- You may see TypeScript errors or linting warnings during build/development - this is intentional and the application will still run correctly.
- The application uses mock data and simulated API calls for demonstration purposes.

## Project Structure

```
.
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── app/
    ├── layout.tsx
    ├── page.tsx
    └── globals.css
├── lib/
│   └── graphql.ts
└── components/
    ├── CartContext.tsx
    └── ProductCard.tsx
```

## Functionality

- Displays a list of mock products.
- "Add to Cart" button updates a global cart counter in the header.
- Responsive design for mobile and desktop.

## Technologies Used

- Next.js 15+ (App Router, Server Components)
- React
- TypeScript
- Tailwind CSS
- GraphQL (mocked with inline data)
