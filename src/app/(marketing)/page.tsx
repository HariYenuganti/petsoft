import Image from 'next/image';
import Link from 'next/link';
import Eyebrow from '@/components/eyebrow';
import Icon from '@/components/icon';
import PetFace from '@/components/pet-face';
import { Button } from '@/components/ui/button';
import LandingNav from '@/components/landing/landing-nav';
import Faq from '@/components/landing/faq';
import DemoSection from '@/components/landing/demo-section';

const JUNIPER_DAY = [
  { t: '08:42', title: 'Checked in', detail: 'Iris' },
  { t: '09:15', title: 'Morning yard', detail: 'Group A' },
  { t: '10:30', title: 'Grooming — bath', detail: 'Thea' },
  { t: '12:30', title: 'Lunch & rest', detail: 'Suite 4' },
  { t: '14:05', title: 'Scent game', detail: 'NOW', now: true },
  { t: '17:00', title: 'Evening yard', detail: '—', dim: true },
];

const NUMBERS = [
  { v: '1', l: 'Screen' },
  { v: '$499', l: 'Once' },
  { v: '0', l: 'Subscriptions' },
  { v: '∞', l: 'Guests, owners, staff' },
];

const GUIDE = [
  {
    n: '01',
    title: 'The roster',
    sub: 'every guest, every morning',
    body: 'A list of the floor, as it stands.',
  },
  {
    n: '02',
    title: 'The day book',
    sub: 'a minute-by-minute account',
    body: 'The central artifact. Check-ins, yard time, meals, meds, naps — written by your staff, legible to the owner.',
  },
  {
    n: '03',
    title: 'The medication log',
    sub: 'doses, handlers, signatures',
    body: 'Every dose timestamped. Every handler named. An audit log that survives a power outage.',
  },
  {
    n: '04',
    title: 'Owner notes',
    sub: 'the things only owners know',
    body: 'The kind of note that belongs on a 3x5 card, kept legibly.',
  },
  {
    n: '05',
    title: 'Check-out tickets',
    sub: 'printed, torn, sent home',
    body: 'Keeps owners close without requiring an app.',
  },
  {
    n: '06',
    title: 'Quiet by design',
    sub: 'no streaks, no red dots',
    body: 'The floor stays calm because the software stays calm.',
  },
];

const LETTERS = [
  {
    face: 'berner',
    quote: (
      <>
        We ran this daycare on a whiteboard for nine years. I
        <span className="italic"> trusted</span> the whiteboard. Kennelry is the
        first thing my staff stopped working around &mdash; and the ledger is
        now the shift handoff.
      </>
    ),
    sig: 'Marion Delacroix',
    meta: 'Pinegate Daycare · 18 guests · Portland, OR',
  },
  {
    face: 'shiba',
    quote: (
      <>
        I&rsquo;m on my phone between yards. My staff is on iPads at the desk.
        The day book reads the same on both, which is the whole point. Four
        months in and we haven&rsquo;t missed a medication &mdash; which, if
        you run a daycare, you know is the only number that matters.
      </>
    ),
    sig: 'Iris Abara',
    meta: 'Briarwood Daycare · 32 guests · Montreal',
  },
  {
    face: 'cavalier',
    quote: (
      <>
        Paid $499 in April. It is November. I have not been asked to upgrade,
        add a seat, watch a webinar, or complete an onboarding call. I also
        haven&rsquo;t missed a feature. This is, by a wide margin, my favorite
        software.
      </>
    ),
    sig: 'Theo Kastner',
    meta: 'Two-Dog Daycare · 2 guests · Asheville, NC',
  },
];

const PILLARS = [
  {
    n: '01',
    title: 'Paper, not dashboards',
    body: 'It should read like a book. Not a control panel.',
  },
  {
    n: '02',
    title: 'One tier, for always',
    body: 'The software is the same for a two-dog daycare as for a forty-dog one.',
  },
  {
    n: '03',
    title: 'The pet is the unit',
    body: 'We track guests, not invoices. Everything else comes from that.',
  },
];

const INCLUDES = [
  'Unlimited guests',
  'Unlimited staff seats',
  'The day book & medication log',
  'Owner portal',
  'Check-out tickets',
  'Printable run-sheets',
  'Daily email recaps',
  'Data export (CSV + JSON)',
  'Dated, encrypted backups',
  'Lifetime updates',
  'Email support, from the author',
  'No subscription, no tiers',
];

export default function Home() {
  return (
    <div className="landing">
      <LandingNav />

      {/* HERO */}
      <section className="landing-hero">
        <div>
          <Eyebrow>A ledger for pet daycares &middot; est. &rsquo;24</Eyebrow>
          <h1 className="hero-display">
            Software with the <span className="italic">manners</span> of a
            floor manager.
          </h1>
          <p className="hero-lede">
            Kennelry is the quiet desk clerk for independent pet daycares. One
            screen. One ledger. Every guest accounted for by the minute.
          </p>
          <div className="hero-cta-row">
            <Button asChild size="lg">
              <Link href="/signup" className="gap-3">
                <span>Get a key &middot; $499</span>
                <Icon name="arrow-right" size={14} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
          <div className="hero-meta">
            <span>Lifetime license</span>
            <span>One-time payment</span>
            <span>Every feature</span>
          </div>
        </div>

        <aside className="landing-hero-right">
          <article className="hero-card">
            <header className="hero-card-chrome">
              <span className="hero-card-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="mono">Kennelry · 14:05</span>
            </header>
            <div className="hero-card-body">
              <div className="hero-card-head">
                <span className="hero-card-portrait">
                  <PetFace kind="poodle" size={52} />
                </span>
                <div>
                  <p className="hero-card-meta">PS-0421 · Suite 4</p>
                  <h3 className="hero-card-name">Juniper</h3>
                  <p className="hero-card-sub">Standard Poodle · 4 yr · Marion D.</p>
                </div>
                <span className="hero-card-badge">On premises</span>
              </div>
              <div className="hero-card-ledger">
                {JUNIPER_DAY.map((r) => (
                  <div
                    key={r.t}
                    className={
                      'hero-row' + (r.now ? ' now' : '') + (r.dim ? ' dim' : '')
                    }
                  >
                    <span className="mono">{r.t}</span>
                    <span>{r.title}</span>
                    {r.now ? (
                      <span className="now-dot">NOW</span>
                    ) : (
                      <span className="mono">{r.detail}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </article>
          <div className="hero-stamp">
            Kennelry
            <br />
            est. &rsquo;24
          </div>
        </aside>
      </section>

      {/* NUMBERS STRIP */}
      <section className="landing-section py-0">
        <div className="numbers-strip">
          {NUMBERS.map((n) => (
            <div key={n.l} className="num-cell">
              <span className="num-value">{n.v}</span>
              <span className="num-label">{n.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PLATE SECTION */}
      <section className="plate-section">
        <div className="plate-photo">
          <Image
            src="/plate-dog.jpg"
            alt="A golden retriever on a warm morning"
            width={1200}
            height={800}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="plate-caption-eyebrow">Field note &middot; 06:42</p>
          <p className="plate-caption">
            The floor, before the <span className="italic">first drop-off.</span>
          </p>
          <p className="text-ink-3 text-[15px] leading-[1.65] max-w-[44ch]">
            Most of the work of running a daycare is the work of being ready.
            Kennelry is the book your staff turns to first, and the last thing
            they close.
          </p>
        </div>
      </section>

      {/* WORK SECTION */}
      <section id="work" className="work-section">
        <Eyebrow className="mb-4">Chapter I &middot; the work</Eyebrow>
        <h2 className="section-title">
          Every tool a daycare morning actually needs.{' '}
          <span className="italic">Nothing it doesn&rsquo;t.</span>
        </h2>
        <div className="guide-index">
          {GUIDE.map((g) => (
            <article key={g.n} className="guide-row">
              <span className="guide-num">{g.n}</span>
              <div>
                <h3 className="guide-title">
                  {g.title}{' '}
                  <span className="italic">&mdash; {g.sub}</span>
                </h3>
              </div>
              <p className="guide-desc">{g.body}</p>
              <span className="guide-arrow">
                <Icon name="arrow-right" size={18} />
              </span>
            </article>
          ))}
        </div>
        <p className="mt-10 text-[14px] text-ink-3 italic font-serif max-w-[60ch]">
          Six tools, one screen. If you need another, write to the floor and
          we&rsquo;ll argue about it.
        </p>
      </section>

      {/* CHAPTER II — DEMO */}
      <DemoSection />

      {/* LETTERS / TESTIMONIALS */}
      <section id="letters" className="letters-section">
        <Eyebrow className="mb-4">Chapter III &middot; letters</Eyebrow>
        <h2 className="section-title">
          Read by floor managers,{' '}
          <span className="italic">written by floor managers.</span>
        </h2>
        <div className="letters-grid">
          {LETTERS.map((l) => (
            <figure key={l.sig} className="letter">
              <div className="letter-portrait text-ink-2">
                <PetFace kind={l.face} size={44} />
              </div>
              <blockquote>{l.quote}</blockquote>
              <figcaption>
                <span className="sig">{l.sig}</span>
                <span className="sig-meta">{l.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CRAFT SECTION */}
      <section id="craft" className="craft-section">
        <Eyebrow className="mb-4">Chapter IV &middot; the craft</Eyebrow>
        <blockquote className="craft-quote">
          A morning in daycare is a{' '}
          <span className="italic">hundred small decisions.</span> We keep the
          ledger, you keep the calm.
        </blockquote>
        <p className="craft-cite">
          &mdash; The Kennelry field guide
        </p>
        <div className="craft-pillars">
          {PILLARS.map((p) => (
            <div key={p.n}>
              <p className="pillar-num">{p.n}</p>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="pricing-section">
        <Eyebrow className="mb-4">Chapter V &middot; pricing</Eyebrow>
        <h2 className="section-title">
          One payment. <span className="italic">One license.</span>
        </h2>
        <p className="text-ink-3 text-[15px] leading-[1.65] max-w-[60ch] mb-12">
          We don&rsquo;t split features between &ldquo;Pro&rdquo; and
          &ldquo;Business.&rdquo; A daycare with two dogs uses the same
          Kennelry as a daycare with forty. Software for daycares usually
          tracks invoices. Kennelry tracks guests.
        </p>
        <article className="ticket">
          <div className="ticket-left">
            <Eyebrow className="mb-6">Includes, always</Eyebrow>
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
            <div className="ticket-price">$499</div>
            <div className="ticket-price-sub">Lifetime &middot; one-time</div>
            <Button
              asChild
              variant="accent"
              size="lg"
              shape="pill"
              className="w-full justify-between"
            >
              <Link href="/signup">
                <span className="flex items-center gap-2">
                  <Icon name="lock" size={14} />
                  Get a key
                </span>
                <Icon name="arrow-right" size={14} />
              </Link>
            </Button>
            <p className="mt-4 text-[11px] text-ink-3">
              30-day refund, no questions asked.
            </p>
          </aside>
        </article>
      </section>

      {/* FAQ */}
      <Faq />

      {/* FINAL CTA */}
      <section className="final-cta">
        <h2>
          A daycare{' '}
          <span className="italic">accounted for.</span>
        </h2>
        <div className="flex justify-center gap-3 flex-wrap">
          <Button asChild size="lg">
            <Link href="/signup">Get a key &middot; $499</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <span>&copy; 2026 &middot; Kennelry &middot; made for small daycares</span>
        <span className="landing-footer-center">one screen &middot; one ledger</span>
        <span className="landing-footer-right">
          <a href="mailto:hello@kennelry.co">Contact</a>
          <Link href="/login">Sign in</Link>
        </span>
      </footer>
    </div>
  );
}
