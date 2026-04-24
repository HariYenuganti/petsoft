import Eyebrow from '@/components/eyebrow';
import H1 from '@/components/h1';
import { checkAuth } from '@/lib/server-utils';
import SignOutBtn from '@/components/sign-out-btn';

export default async function AccountPage() {
  const session = await checkAuth();
  return (
    <main className="py-8">
      <div className="page-header">
        <div>
          <Eyebrow>Account &middot; settings</Eyebrow>
          <h1 className="page-title">
            Your <span className="italic">key</span>.
          </h1>
          <p className="page-sub">
            Sign in details and floor access.
          </p>
        </div>
      </div>

      <div className="bg-paper-2 border border-line rounded-lg p-10 flex flex-col gap-6 max-w-[520px]">
        <div>
          <Eyebrow className="mb-2">Signed in as</Eyebrow>
          <p className="font-serif text-[26px] text-ink truncate">
            {session.user.email}
          </p>
        </div>

        <div>
          <Eyebrow className="mb-2">Lifetime access</Eyebrow>
          <p className="font-mono text-[13px] text-ok uppercase tracking-[0.12em]">
            Active
          </p>
        </div>

        <div className="pt-4 border-t border-line">
          <SignOutBtn />
        </div>
      </div>
    </main>
  );
}
