import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { checkAuth } from '@/lib/server-utils';
import Icon from '@/components/icon';
import Eyebrow from '@/components/eyebrow';
import TicketActions from './ticket-actions';

function fmtTime(d: Date | string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
function fmtDate(d: Date | string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}
function petPlate(id: string) {
  return 'PS-' + id.slice(-4).toUpperCase();
}

export default async function TicketPage({
  params,
}: {
  params: Promise<{ petId: string }>;
}) {
  const { petId } = await params;
  const session = await checkAuth();
  const pet = await prisma.pet.findUnique({
    where: { id: petId },
    include: {
      events: { orderBy: { time: 'asc' } },
      medications: { orderBy: { scheduledAt: 'asc' } },
    },
  });
  if (!pet || pet.userId !== session.user.id) notFound();

  const firstCheckin = pet.events.find((e) => e.kind === 'checkin');
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const todayMedsGiven = pet.medications.filter(
    (m) => m.givenAt && new Date(m.givenAt).getTime() >= startOfDay.getTime(),
  );
  const todayEvents = pet.events.filter(
    (e) =>
      new Date(e.time).getTime() >= startOfDay.getTime() && e.kind !== 'checkout',
  );

  return (
    <main className="py-8 px-4">
      <div className="ticket-print mx-auto max-w-[720px] bg-paper border border-line rounded-xl shadow-[0_30px_80px_hsl(var(--ink)/0.1)] overflow-hidden">
        {/* Screen-only action row — hidden on the printed ticket */}
        <div className="no-print flex items-center justify-between px-10 py-3 border-b border-line bg-paper-2">
          <Link
            href="/app/dashboard"
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3 hover:text-ink active:text-accent-ink inline-flex items-center gap-1.5 transition-colors py-1 px-1 -mx-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper-2"
          >
            <Icon name="arrow-in" size={14} /> Back to roster
          </Link>
          <TicketActions variant="outline" />
        </div>
        {/* Header */}
        <header className="flex items-center justify-between px-10 py-6 border-b border-line">
          <div>
            <Eyebrow>Daycare key &middot; check-out ticket</Eyebrow>
            <p className="font-serif text-[26px] mt-1">Kennelry</p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
            {petPlate(pet.id)}
          </p>
        </header>

        {/* Hero */}
        <section className="px-10 py-8 border-b border-line">
          <Eyebrow>Guest</Eyebrow>
          <h1 className="font-serif text-[56px] leading-[1] mt-2">
            {pet.name}
          </h1>
          <p className="font-serif italic text-[18px] text-ink-2 mt-2">
            In the care of {pet.ownerName}.
          </p>
        </section>

        {/* Times grid */}
        <section className="grid grid-cols-2 gap-px bg-line border-b border-line">
          <div className="bg-paper px-10 py-6">
            <Eyebrow>Checked in</Eyebrow>
            <p className="font-serif text-[22px] mt-1">
              {firstCheckin ? fmtTime(firstCheckin.time) : '—'}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-1">
              {firstCheckin ? fmtDate(firstCheckin.time) : ''}
            </p>
          </div>
          <div className="bg-paper px-10 py-6">
            <Eyebrow>Checked out</Eyebrow>
            <p className="font-serif text-[22px] mt-1">
              {fmtTime(pet.checkedOutAt)}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-1">
              {fmtDate(pet.checkedOutAt)}
            </p>
          </div>
        </section>

        {/* Medications */}
        <section className="px-10 py-6 border-b border-line">
          <Eyebrow>Medications given today</Eyebrow>
          {todayMedsGiven.length === 0 ? (
            <p className="font-serif italic text-[15px] text-ink-3 mt-2">
              None today.
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-1.5">
              {todayMedsGiven.map((m) => (
                <li
                  key={m.id}
                  className="grid grid-cols-[80px_1fr_auto] gap-3 font-serif text-[15px]"
                >
                  <span className="font-mono text-[11px] text-ink-3">
                    {fmtTime(m.givenAt)}
                  </span>
                  <span>
                    {m.name}{' '}
                    <span className="font-mono text-[12px] text-ink-3">
                      {m.dose}
                    </span>
                  </span>
                  <span className="font-mono text-[11px] text-ink-3">
                    {m.givenBy || '—'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Today's events */}
        <section className="px-10 py-6 border-b border-line">
          <Eyebrow>Today at the daycare</Eyebrow>
          {todayEvents.length === 0 ? (
            <p className="font-serif italic text-[15px] text-ink-3 mt-2">
              A quiet day.
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-1.5">
              {todayEvents.map((e) => (
                <li
                  key={e.id}
                  className="grid grid-cols-[80px_1fr_auto] gap-3 font-serif text-[15px]"
                >
                  <span className="font-mono text-[11px] text-ink-3">
                    {fmtTime(e.time)}
                  </span>
                  <span>
                    {e.title}
                    {e.note && (
                      <span className="font-serif italic text-ink-3">
                        {' '}&mdash; {e.note}
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-[11px] text-ink-3">
                    {e.handler || ''}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Signature */}
        <section className="px-10 py-10">
          <Eyebrow>Received by owner</Eyebrow>
          <div className="border-b border-ink h-10 mt-4" />
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 mt-2">
            Signature &middot; {fmtDate(pet.checkedOutAt)}
          </p>
        </section>

        {/* Stamp — prints as the ticket's footer mark */}
        <footer className="px-10 py-6 border-t border-line">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
            Kennelry &middot; est. &rsquo;24
          </p>
        </footer>
      </div>
    </main>
  );
}
