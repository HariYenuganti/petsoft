import nextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './db';
import bcrypt from 'bcryptjs';

const config: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        //runs on login
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          console.log('User not found');
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword,
        );

        if (!isPasswordValid) {
          console.log('Invalid Credentials');
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      //runs on every request with middleware
      const isLoggedIn = !!auth?.user;
      const istryingToAccessApp = request.nextUrl.pathname.startsWith('/app');

      if (!isLoggedIn && istryingToAccessApp) {
        return false;
      }

      if (isLoggedIn && istryingToAccessApp) {
        return true;
      }
      if (!istryingToAccessApp) {
        return true;
      }
    },
  },
};

export const { auth, signIn } = nextAuth(config);
