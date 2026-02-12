import 'server-only';
import prisma from './db';
import { User } from '@prisma/client';

export async function getUserByEmail(email: User['email']) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
