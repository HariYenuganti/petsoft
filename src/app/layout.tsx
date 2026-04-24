import type { Metadata } from 'next';
import { Instrument_Serif, Inter_Tight, JetBrains_Mono, Caveat } from 'next/font/google';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { cn } from '@/lib/utils';

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});
const sans = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter-tight',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});
const hand = Caveat({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kennelry — a ledger for pet daycares',
  description: 'One screen, one ledger, every guest accounted for.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-density="compact"
      suppressHydrationWarning={true}
      className={cn(serif.variable, sans.variable, mono.variable, hand.variable)}
    >
      <body
        className="font-sans bg-paper text-ink min-h-screen text-sm"
        suppressHydrationWarning={true}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
