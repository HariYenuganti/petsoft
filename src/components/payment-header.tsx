'use client';

import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Logo from './logo';

export default function PaymentHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="flex items-center justify-between w-full max-w-[1200px] mx-auto px-6 py-5 border-b border-line">
      <Logo withSuffix={false} />
      <div className="flex items-center gap-4">
        {status === 'loading' ? (
          <div className="h-4 w-24 bg-paper-3 animate-pulse rounded" />
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
            {session?.user?.email}
          </span>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={async () => {
            await signOut({ callbackUrl: '/' });
          }}
        >
          Sign out
        </Button>
      </div>
    </header>
  );
}
