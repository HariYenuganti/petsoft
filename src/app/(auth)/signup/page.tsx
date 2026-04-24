import Link from 'next/link';
import Logo from '@/components/logo';
import Eyebrow from '@/components/eyebrow';
import H1 from '@/components/h1';
import AuthForm from '@/components/auth-form';
import AuthQuotePanel from '@/components/auth-quote-panel';

export default function SignUp() {
  return (
    <main className="auth-wrap">
      <section className="auth-left">
        <div className="flex items-center justify-between">
          <Logo />
        </div>
        <div className="flex flex-col gap-8 max-w-[440px] w-full mx-auto my-auto">
          <div>
            <Eyebrow>New to the floor</Eyebrow>
            <H1 size="display-2" className="mt-3 mb-3">
              A ledger begins.
            </H1>
            <p className="text-ink-3 text-[15px]">
              Make an account and welcome your first guest.
            </p>
          </div>
          <AuthForm type="signUp" />
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
            Already have a key?{' '}
            <Link href="/login" className="text-ink underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-4">
          &copy; 2026 &middot; Kennelry
        </p>
      </section>
      <AuthQuotePanel
        eyebrow="No. 03 · First day"
        cite="— The Kennelry field guide"
      >
        Every ledger begins with <span className="italic">one name</span>. Tomorrow it will be forty.
      </AuthQuotePanel>
    </main>
  );
}
