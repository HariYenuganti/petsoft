import Link from 'next/link';
import Logo from '@/components/logo';
import Eyebrow from '@/components/eyebrow';
import H1 from '@/components/h1';
import AuthForm from '@/components/auth-form';
import AuthQuotePanel from '@/components/auth-quote-panel';

export default function Login() {
  return (
    <main className="auth-wrap">
      <section className="auth-left">
        <div className="flex items-center justify-between">
          <Logo />
        </div>
        <div className="flex flex-col gap-8 max-w-[440px] w-full mx-auto my-auto">
          <div>
            <Eyebrow>Welcome back to the floor</Eyebrow>
            <H1 size="display-2" className="mt-3 mb-3">
              Open the front door.
            </H1>
            <p className="text-ink-3 text-[15px]">
              Sign in to keep the day in view.
            </p>
          </div>
          <AuthForm type="logIn" />
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
            New to the floor?{' '}
            <Link href="/signup" className="text-ink underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-4">
          &copy; 2026 &middot; Kennelry
        </p>
      </section>
      <AuthQuotePanel
        eyebrow="No. 07 · Floor notes"
        cite="— The Kennelry field guide"
      >
        A morning in daycare is a <span className="italic">hundred small decisions</span> &mdash; we keep the ledger, you keep the calm.
      </AuthQuotePanel>
    </main>
  );
}
