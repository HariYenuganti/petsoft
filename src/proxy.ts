import { middlewareAuth } from './lib/auth-edge';

export default middlewareAuth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
