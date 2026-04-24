'use client';
import Link from 'next/link';
import Logo from './logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const routes = [
  { label: 'Dashboard', path: '/app/dashboard' },
  { label: 'Account', path: '/app/account' },
];

function useToday() {
  const now = new Date();
  return {
    weekday: now.toLocaleDateString('en-US', { weekday: 'long' }),
    long: now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }),
  };
}

export default function AppHeader() {
  const activePathname = usePathname();
  const { weekday, long } = useToday();

  return (
    <header className="flex items-center justify-between border-b border-line py-4 gap-6 flex-wrap">
      <div className="flex items-center gap-6">
        <Logo withSuffix={false} />
        <div className="date-chip hidden sm:flex flex-col gap-0.5 pl-6 border-l border-line">
          <span className="eyebrow">Floor &middot; {weekday}</span>
          <span className="font-serif text-[18px] leading-none text-ink">
            {long}
          </span>
        </div>
      </div>

      <nav>
        <ul className="flex gap-4 sm:gap-6">
          {routes.map((route) => {
            const active = route.path === activePathname;
            return (
              <li key={route.label} className="relative">
                <Link
                  href={route.path}
                  className={cn(
                    'font-mono text-[11px] uppercase tracking-[0.14em] transition-colors py-2',
                    active ? 'text-ink' : 'text-ink-3 hover:text-ink',
                  )}
                >
                  {route.label}
                </Link>
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[17px] h-[2px] bg-ink" />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
