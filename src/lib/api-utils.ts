import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleError(error: unknown, statusCode?: number) {
  console.error('API Error:', error);

  // If error is a string with status code
  if (typeof error === 'string' && statusCode) {
    return NextResponse.json({ error }, { status: statusCode });
  }

  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode });
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation error',
        details: error.errors,
      },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: statusCode || 500 });
  }

  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export function success<T>(data: T, status: number = 200) {
  return NextResponse.json({ data }, { status });
}

export function created<T>(data: T) {
  return success(data, 201);
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function unauthorized(message: string = 'Unauthorized') {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbidden(message: string = 'Forbidden') {
  return NextResponse.json({ error: message }, { status: 403 });
}
