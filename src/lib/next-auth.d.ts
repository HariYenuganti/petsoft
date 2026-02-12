import { User } from 'next-auth';

declare module '@auth/core/jwt' {
  interface JWT {
    userId: string;
    email: string;
    hasPremiumAccess: boolean;
  }
}

declare module 'next-auth' {
  interface User {
    hasPremiumAccess: boolean;
    email: string;
  }

  interface Session {
    user: User & {
      id: string;
    };
  }
}
