import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email,address, password } = await req.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists!' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: { name, email,address, password: hashedPassword },
    });

    return NextResponse.json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 });
  }
}
