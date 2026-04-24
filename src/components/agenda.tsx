'use client';

import { useEffect, useState } from 'react';
import Eyebrow from './eyebrow';
import Icon from './icon';
import { usePetContext } from '@/lib/hooks';

type AgendaItem = {
  id: string;
  time: Date;
  title: string;
  sub: string;
  kind: 'med-due' | 'med-done' | 'event';
  petId: string;
  iconName: string;
};

const EVENT_ICON: Record<string, string> = {
  checkin: 'arrow-in',
  yard: 'sun',
  meal: 'bowl',
  med: 'pill',
  nap: 'moon',
  groom: 'droplet',
  note: 'nose',
  checkout: 'arrow-out',
};

function fmtTime(d: Date) {
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Clock that re-renders the agenda once a minute so "due now" stays accurate. */
function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Agenda() {
  const { pets, handleSelectedPetId } = usePetContext();
  const clock = useClock();
  const dayStartDate = new Date(clock);
  dayStartDate.setHours(0, 0, 0, 0);
  const dayStart = dayStartDate.getTime();
  const now = clock.getTime();

  const items: AgendaItem[] = [];

  for (const pet of pets) {
    if (pet.checkedOutAt) continue; // only on-premises
    for (const m of pet.medications) {
      const scheduled = new Date(m.scheduledAt).getTime();
      const given = m.givenAt ? new Date(m.givenAt).getTime() : null;
      if (given !== null && given >= dayStart) {
        items.push({
          id: 'md-' + m.id,
          time: new Date(m.givenAt!),
          title: `${pet.name} — ${m.name} ${m.dose}`,
          sub: m.givenBy ? `Given by ${m.givenBy}` : 'Given',
          kind: 'med-done',
          petId: pet.id,
          iconName: 'pill',
        });
      } else if (scheduled >= dayStart) {
        items.push({
          id: 'm-' + m.id,
          time: new Date(m.scheduledAt),
          title: `${pet.name} — ${m.name} ${m.dose}`,
          sub: scheduled <= now ? 'Due now' : 'Scheduled',
          kind: 'med-due',
          petId: pet.id,
          iconName: 'pill',
        });
      }
    }
    for (const e of pet.events) {
      const t = new Date(e.time).getTime();
      if (t < dayStart) continue;
      if (e.kind === 'checkout') continue; // suppress checkout noise
      items.push({
        id: 'e-' + e.id,
        time: new Date(e.time),
        title: `${pet.name} — ${e.title}`,
        sub: e.handler || (e.note ?? ''),
        kind: 'event',
        petId: pet.id,
        iconName: EVENT_ICON[e.kind] ?? 'nose',
      });
    }
  }

  items.sort((a, b) => a.time.getTime() - b.time.getTime());

  const upcoming = items.filter(
    (i) => i.kind === 'med-due' && i.time.getTime() >= now,
  );
  const dueNow = items.filter(
    (i) => i.kind === 'med-due' && i.time.getTime() < now,
  );
  const logged = items.filter(
    (i) => i.kind !== 'med-due',
  );

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-10 text-center gap-3">
        <LedgerGlyph />
        <Eyebrow>Today at the daycare</Eyebrow>
        <p className="font-serif italic text-[22px] text-ink-3 max-w-[24ch]">
          A quiet day. Log the first event when something happens.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full p-8 gap-6 overflow-y-auto">
      <div>
        <Eyebrow>Today at the daycare</Eyebrow>
        <h2 className="font-serif text-[28px] leading-[1.05] mt-1">
          The order of the <span className="italic">day.</span>
        </h2>
        <p className="font-serif italic text-[14px] text-ink-3 mt-1">
          Select a guest from the roster to see their full day.
        </p>
      </div>

      {dueNow.length > 0 && (
        <AgendaList
          title="Due now"
          tone="accent"
          items={dueNow}
          onSelect={handleSelectedPetId}
        />
      )}
      {upcoming.length > 0 && (
        <AgendaList
          title="Later today"
          tone="default"
          items={upcoming}
          onSelect={handleSelectedPetId}
        />
      )}
      {logged.length > 0 && (
        <AgendaList
          title="Already logged"
          tone="dim"
          items={logged}
          onSelect={handleSelectedPetId}
        />
      )}
    </div>
  );
}

function AgendaList({
  title,
  tone,
  items,
  onSelect,
}: {
  title: string;
  tone: 'default' | 'accent' | 'dim';
  items: AgendaItem[];
  onSelect: (id: string) => void;
}) {
  return (
    <section>
      <Eyebrow
        className={
          tone === 'accent'
            ? '!text-accent-ink mb-3'
            : tone === 'dim'
              ? '!text-ink-4 mb-3'
              : 'mb-3'
        }
      >
        {title}
      </Eyebrow>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onSelect(item.petId)}
              className={
                'w-full grid grid-cols-[56px_20px_1fr_auto] gap-3 items-center py-2 border-b border-line-2 text-left hover:bg-paper-3 rounded-sm transition-colors px-1 -mx-1 ' +
                (tone === 'dim' ? 'text-ink-4' : 'text-ink-2')
              }
            >
              <span className="font-mono text-[11px] text-ink-3">
                {fmtTime(item.time)}
              </span>
              <span
                className={
                  'w-5 h-5 rounded-full grid place-items-center ' +
                  (tone === 'accent'
                    ? 'bg-accent-soft text-accent-ink'
                    : tone === 'dim'
                      ? 'bg-paper-2 text-ink-4'
                      : 'bg-paper-3 text-ink-3')
                }
              >
                <Icon name={item.iconName} size={11} />
              </span>
              <span className="min-w-0">
                <span
                  className={
                    'font-serif text-[15px] leading-snug block truncate ' +
                    (tone === 'dim' ? 'line-through decoration-ink-4' : '')
                  }
                >
                  {item.title}
                </span>
                {item.sub && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-4 block truncate">
                    {item.sub}
                  </span>
                )}
              </span>
              <span className="text-ink-4 group-hover:text-ink-2">
                <Icon name="arrow-right" size={14} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function LedgerGlyph() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
      className="text-ink-3"
    >
      <rect
        x="14"
        y="16"
        width="68"
        height="68"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="hsl(var(--paper-2))"
      />
      <line
        x1="14"
        y1="28"
        x2="82"
        y2="28"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      {[36, 44, 52, 60, 68, 76].map((y, i) => (
        <line
          key={i}
          x1="20"
          y1={y}
          x2={72 - i * 4}
          y2={y}
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.35"
        />
      ))}
      <circle cx="48" cy="84" r="2" fill="hsl(var(--accent-hue))" />
    </svg>
  );
}
