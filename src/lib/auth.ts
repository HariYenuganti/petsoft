import nextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './db';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './server-utils';

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
        const user = await getUserByEmail(email as string);

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
      if (isLoggedIn && !istryingToAccessApp) {
        return Response.redirect(new URL('/app/dashboard', request.nextUrl));
      }
      if (!isLoggedIn && !istryingToAccessApp) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = nextAuth(config);
