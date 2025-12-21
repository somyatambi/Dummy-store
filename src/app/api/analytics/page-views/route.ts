import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Track page view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path } = body;

    if (!path) {
      return NextResponse.json(
        { error: 'Path is required' },
        { status: 400 }
      );
    }

    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;

    await prisma.pageView.create({
      data: {
        path,
        ipAddress,
        userAgent,
        referrer,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking page view:', error);
    return NextResponse.json(
      { error: 'Failed to track page view' },
      { status: 500 }
    );
  }
}

// Get page view analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get total page views
    const totalViews = await prisma.pageView.count({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });

    // Get views by page
    const viewsByPage = await prisma.pageView.groupBy({
      by: ['path'],
      _count: {
        path: true,
      },
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        _count: {
          path: 'desc',
        },
      },
      take: 10,
    });

    return NextResponse.json({
      totalViews,
      days,
      topPages: viewsByPage.map(item => ({
        path: item.path,
        views: item._count.path,
      })),
    });
  } catch (error) {
    console.error('Error fetching page analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page analytics' },
      { status: 500 }
    );
  }
}
