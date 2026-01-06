import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { handleError, success } from '@/lib/api-utils';
import { z } from 'zod';
import { randomBytes } from 'crypto';
import { strictRateLimit } from '@/lib/rate-limit';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = await strictRateLimit(request);
  if (rateLimitResult) return rateLimitResult;
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return handleError('Email already registered', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Generate verification token
    const verificationToken = randomBytes(32).toString('hex');

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        verificationToken,
        role: 'CUSTOMER',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        emailVerified: true,
      },
    });

    // TODO: Send verification email
    // await sendVerificationEmail(user.email, verificationToken);

    return success(
      {
        message: 'Registration successful. Please check your email to verify your account.',
        user,
      },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleError(error.errors[0].message, 400);
    }
    return handleError(error);
  }
}
