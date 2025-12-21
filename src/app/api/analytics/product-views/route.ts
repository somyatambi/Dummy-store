import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Track product view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, productSlug } = body;

    if (!productId || !productSlug) {
      return NextResponse.json(
        { error: 'Product ID and slug are required' },
        { status: 400 }
      );
    }

    // Get visitor info
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;

    // Create view record and increment product view count
    await prisma.$transaction([
      prisma.productView.create({
        data: {
          productId,
          productSlug,
          ipAddress,
          userAgent,
          referrer,
        },
      }),
      prisma.product.update({
        where: { id: productId },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking product view:', error);
    return NextResponse.json(
      { error: 'Failed to track view' },
      { status: 500 }
    );
  }
}

// Get product view analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    if (productId) {
      // Get views for specific product
      const views = await prisma.productView.count({
        where: {
          productId,
          createdAt: {
            gte: startDate,
          },
        },
      });

      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: {
          name: true,
          viewCount: true,
        },
      });

      return NextResponse.json({
        productId,
        productName: product?.name,
        viewsInRange: views,
        totalViews: product?.viewCount || 0,
        days,
      });
    }

    // Get total product views in time range
    const totalProductViewsInRange = await prisma.productView.count({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });

    // Get all active products count for accurate average
    const totalProductsCount = await prisma.product.count({
      where: {
        active: true,
      },
    });

    // Get products with their view counts in the time range
    const productsWithViews = await prisma.product.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        price: true,
        images: true,
        viewCount: true,
      },
    });

    // Get view counts for each product in the time range
    const productViewsInRange = await prisma.productView.groupBy({
      by: ['productId'],
      _count: {
        productId: true,
      },
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });

    // Create a map of productId to view count in range
    const viewsMap = new Map(
      productViewsInRange.map(item => [item.productId, item._count.productId])
    );

    // Combine product data with their view counts in range
    const topProducts = productsWithViews
      .map(product => ({
        ...product,
        viewsInRange: viewsMap.get(product.id) || 0,
      }))
      .filter(product => product.viewsInRange > 0)
      .sort((a, b) => b.viewsInRange - a.viewsInRange)
      .slice(0, 10);

    return NextResponse.json({
      topProducts: topProducts.map(p => ({
        ...p,
        price: Number(p.price),
      })),
      totalProductViewsInRange,
      totalProductsCount,
      days,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
