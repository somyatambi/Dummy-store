# Testing Guide for Timeless Luxury

## Test Structure

```
tests/
├── unit/              # Unit tests
│   ├── lib/          # Library functions
│   └── utils/        # Utility functions
├── integration/       # Integration tests
│   └── api/          # API route tests
└── e2e/              # End-to-end tests
    └── flows/        # User flows
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- path/to/test
```

## Sample Tests

### Unit Test Example

```typescript
// tests/unit/lib/utils.test.ts
import { formatPrice, slugify, calculateShipping } from '@/lib/utils';

describe('Utils', () => {
  describe('formatPrice', () => {
    it('should format price correctly', () => {
      expect(formatPrice(1000)).toBe('$1,000');
      expect(formatPrice(1234.56)).toBe('$1,235');
    });
  });

  describe('slugify', () => {
    it('should create slug from text', () => {
      expect(slugify('Ancient Roman Bronze Bust')).toBe('ancient-roman-bronze-bust');
    });
  });

  describe('calculateShipping', () => {
    it('should return free shipping for orders over $5000', () => {
      expect(calculateShipping(6000)).toBe(0);
    });

    it('should return flat rate for orders under $5000', () => {
      expect(calculateShipping(1000)).toBe(50);
    });
  });
});
```

### API Test Example

```typescript
// tests/integration/api/products.test.ts
import { GET } from '@/app/api/products/route';
import { NextRequest } from 'next/server';

describe('GET /api/products', () => {
  it('should return list of products', async () => {
    const request = new NextRequest('http://localhost:3000/api/products');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.products).toBeInstanceOf(Array);
  });

  it('should filter featured products', async () => {
    const request = new NextRequest('http://localhost:3000/api/products?featured=true');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    data.products.forEach((product: any) => {
      expect(product.featured).toBe(true);
    });
  });
});
```

### Component Test Example

```typescript
// tests/unit/components/ProductCard.test.tsx
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/product/ProductCard';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  slug: 'test-product',
  price: 1000,
  images: ['https://example.com/image.jpg'],
  materials: ['Bronze', 'Gold'],
};

describe('ProductCard', () => {
  it('should render product information', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();
    expect(screen.getByText('Bronze • Gold')).toBeInTheDocument();
  });

  it('should link to product page', () => {
    render(<ProductCard product={mockProduct} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/products/test-product');
  });
});
```

## Test Coverage Goals

- Unit Tests: 80%+
- Integration Tests: 70%+
- E2E Tests: Critical user flows

## Continuous Integration

Tests run automatically on:
- Pull requests
- Pushes to main/develop
- Before deployment

See `.github/workflows/ci.yml` for CI configuration.
