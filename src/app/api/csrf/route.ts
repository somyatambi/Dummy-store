import { NextRequest, NextResponse } from 'next/server';
import { getCSRFToken } from '@/lib/csrf';

export async function GET(request: NextRequest) {
  try {
    const token = await getCSRFToken();
    
    return NextResponse.json({ csrfToken: token });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}
