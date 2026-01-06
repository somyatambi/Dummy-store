import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

interface RateLimitOptions {
  windowMs?: number;
  max?: number;
  message?: string;
}

export function rateLimit(options: RateLimitOptions = {}) {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes
  const max = options.max || 100; // Max requests per window
  const message = options.message || 'Too many requests, please try again later.';

  return async (req: NextRequest) => {
    const identifier = getIdentifier(req);
    const now = Date.now();

    if (!store[identifier] || store[identifier].resetTime < now) {
      store[identifier] = {
        count: 1,
        resetTime: now + windowMs,
      };
      return null;
    }

    store[identifier].count++;

    if (store[identifier].count > max) {
      return NextResponse.json(
        { error: message },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((store[identifier].resetTime - now) / 1000).toString(),
            'X-RateLimit-Limit': max.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(store[identifier].resetTime).toISOString(),
          },
        }
      );
    }

    return null;
  };
}

function getIdentifier(req: NextRequest): string {
  // Try to get IP from various headers (for proxy/load balancer scenarios)
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const cfIp = req.headers.get('cf-connecting-ip');
  
  const ip = cfIp || realIp || forwarded?.split(',')[0] || 'unknown';
  const pathname = req.nextUrl.pathname;
  
  return `${ip}:${pathname}`;
}

// Preset rate limiters for different routes
export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: 'Too many attempts, please try again later.',
});

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 login attempts per 15 minutes
  message: 'Too many login attempts, please try again after 15 minutes.',
});

export const apiRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: 'API rate limit exceeded, please slow down.',
});

export const checkoutRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 checkout attempts per hour
  message: 'Too many checkout attempts, please try again later.',
});
