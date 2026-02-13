import NextAuth, { NextAuthConfig } from 'next-auth';

export const nextAuthEdgeConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLoggedIn = Boolean(auth?.user);
      const isTryingToAccessApp = request.nextUrl.pathname.includes('/app');

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp && !auth?.user.hasPremiumAccess) {
        return Response.redirect(new URL('/payment', request.nextUrl));
      }

      if (isLoggedIn && isTryingToAccessApp && auth?.user.hasPremiumAccess) {
        return true;
      }

      if (
        isLoggedIn &&
        (request.nextUrl.pathname.includes('/login') ||
          request.nextUrl.pathname.includes('/signup')) &&
        auth?.user.hasPremiumAccess
      ) {
        return Response.redirect(new URL('/app/dashboard', request.nextUrl));
      }

      if (isLoggedIn && !isTryingToAccessApp && !auth?.user.hasPremiumAccess) {
        if (
          request.nextUrl.pathname.includes('/login') ||
          request.nextUrl.pathname.includes('/signup')
        ) {
          return Response.redirect(new URL('/payment', request.nextUrl));
        }

        return true;
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }

      return false;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        // on sign in
        token.userId = user.id!;
        token.email = user.email!;
        token.hasPremiumAccess = user.hasPremiumAccess;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.userId;
      session.user.hasPremiumAccess = token.hasPremiumAccess;

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

export const { auth: middlewareAuth } = NextAuth(nextAuthEdgeConfig);
