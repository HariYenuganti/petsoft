'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={'landing-nav' + (scrolled ? ' scrolled' : '')}>
      <div className="landing-nav-inner">
        <Logo />
        <nav className="landing-nav-links">
          <a onClick={jump('work')}>The work</a>
          <a onClick={jump('letters')}>Letters</a>
          <a onClick={jump('pricing')}>Pricing</a>
          <a onClick={jump('faq')}>FAQ</a>
        </nav>
        <div className="landing-nav-actions">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Get a key &middot; $499</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
