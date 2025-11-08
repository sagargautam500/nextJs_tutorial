'use server';

import { prisma } from '@/lib/prisma';

// 🔹 Temporary demo version
// In a real app, you would read the current user's session or token.
export async function getUserData() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return users;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
