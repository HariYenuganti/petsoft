'use client';

import H1 from '@/components/h1';
import PaymentHeader from '@/components/payment-header';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

export default function PaymentPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = React.use(props.searchParams);
  const [isPending, startTransition] = useTransition();
  const { data: session, update, status } = useSession();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center space-y-10 justify-center">
      <PaymentHeader />
      <H1>PetSoft requires payment to access full features</H1>

      {searchParams.success && (
        <Button
          onClick={async () => {
            await update(true);
            router.push('/app/dashboard');
          }}
          disabled={status === 'loading' || session?.user.hasPremiumAccess}
        >
          Access PetSoft
        </Button>
      )}

      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              try {
                const response = await fetch('/api/create-checkout-session', {
                  method: 'POST',
                });
                const result = await response.json();

                if (!response.ok) {
                  alert(result.error || 'Something went wrong');
                  return;
                }

                if (result.url) {
                  window.location.href = result.url;
                }
              } catch (e) {
                console.error(e);
                alert('Failed to connect to server');
              }
            });
          }}
        >
          Buy Lifetime Access for $499
        </Button>
      )}
      {searchParams.success && (
        <p className="text-green-700">
          Payment successful! You can now access all features
        </p>
      )}
      {searchParams.canceled && (
        <p className="text-red-700">Payment canceled! Please try again</p>
      )}
    </main>
  );
}
