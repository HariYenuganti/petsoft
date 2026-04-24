'use client';

import PaymentHeader from '@/components/payment-header';
import Eyebrow from '@/components/eyebrow';
import H1 from '@/components/h1';
import Icon from '@/components/icon';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

const INCLUDES = [
  'Unlimited guests',
  'Medication scheduler',
  'Owner portal',
  'Staff accounts',
  'Data export',
  'Priority support',
];

export default function PaymentPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = React.use(props.searchParams);
  const [isPending, startTransition] = useTransition();
  const { data: session, update, status } = useSession();
  const router = useRouter();

  const success = searchParams.success === 'true';
  const canceled = searchParams.canceled === 'true';

  return (
    <div className="min-h-screen flex flex-col">
      <PaymentHeader />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-[1040px]">
          <div className="mb-10 text-center">
            <Eyebrow>Kennelry &middot; daycare key</Eyebrow>
            <H1 size="display-2" className="mt-3">
              The <span className="italic">Kennelry</span> key.
            </H1>
            <p className="mt-3 text-ink-3 text-[15px] max-w-[48ch] mx-auto">
              One payment, one license. Every feature, for as long as you run the floor.
            </p>
          </div>

          <article className="ticket">
            <div className="ticket-left">
              <Eyebrow className="mb-4">Includes, always</Eyebrow>
              <ul className="ticket-includes">
                {INCLUDES.map((line) => (
                  <li key={line} className="ticket-line">
                    <span className="ticket-line-check">
                      <Icon name="check" size={16} />
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="ticket-right">
              <div className="ticket-brand-stub">Kennelry &middot; daycare key</div>
              {success ? (
                <>
                  <div className="ticket-price">
                    <Icon name="check" size={48} className="text-ok" />
                  </div>
                  <div className="ticket-price-sub">Welcome to Kennelry</div>
                  <Button
                    onClick={async () => {
                      await update(true);
                      router.push('/app/dashboard');
                    }}
                    disabled={
                      status === 'loading' || session?.user.hasPremiumAccess
                    }
                    size="lg"
                    shape="pill"
                    className="w-full justify-between"
                  >
                    <span>Access the floor</span>
                    <Icon name="arrow-right" size={14} />
                  </Button>
                  <p className="mt-4 text-[12px] text-ok font-mono uppercase tracking-[0.12em]">
                    Payment received
                  </p>
                </>
              ) : (
                <>
                  <div className="ticket-price">$499</div>
                  <div className="ticket-price-sub">Lifetime &middot; one-time</div>
                  <Button
                    disabled={isPending}
                    variant="accent"
                    size="lg"
                    shape="pill"
                    className="w-full justify-between"
                    onClick={async () => {
                      startTransition(async () => {
                        try {
                          const response = await fetch(
                            '/api/create-checkout-session',
                            { method: 'POST' },
                          );
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
                    <span className="flex items-center gap-2">
                      <Icon name="lock" size={14} />
                      {isPending ? 'Opening Stripe…' : 'Pay with Stripe'}
                    </span>
                    <Icon name="arrow-right" size={14} />
                  </Button>
                  <p className="mt-4 text-[11px] text-ink-3">
                    30-day refund, no questions asked.
                  </p>
                </>
              )}
              {canceled && (
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-alert">
                  Payment canceled &mdash; try again when you&rsquo;re ready.
                </p>
              )}
            </aside>
          </article>
        </div>
      </main>
    </div>
  );
}
