import H1 from '@/components/h1';
import AuthForm from '@/components/auth-form';
import Link from 'next/link';

export default function Login() {
  return (
    <main>
      <H1 className="mb-5 text-center">Login</H1>
      <AuthForm type="logIn" />
      <p className="mt-6 text-sm text-zinc-500">
        {"Don't have an account?"}{' '}
        <Link href="/signup" className="font-medium">
          Sign Up
        </Link>
      </p>
    </main>
  );
}
