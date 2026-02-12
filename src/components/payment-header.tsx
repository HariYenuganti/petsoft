'use client';

import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function PaymentHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="absolute top-5 right-5 flex items-center gap-4">
      {status === 'loading' ? (
        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
      ) : (
        <span className="text-sm text-zinc-500">{session?.user?.email}</span>
      )}
      <Button
        variant="secondary"
        size="sm"
        onClick={async () => {
          await signOut({ callbackUrl: '/' });
        }}
      >
        Sign Out
      </Button>
    </header>
  );
}
