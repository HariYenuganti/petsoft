'use client';

import { TimelineEvent } from '@prisma/client';
import Icon from './icon';
import Eyebrow from './eyebrow';

type TimelineProps = {
  events: TimelineEvent[];
};

const ICON_FOR: Record<string, string> = {
  checkin: 'arrow-in',
  yard: 'sun',
  meal: 'bowl',
  med: 'pill',
  nap: 'moon',
  groom: 'droplet',
  note: 'nose',
  checkout: 'arrow-out',
};

function formatTime(d: Date | string) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Timeline({ events }: TimelineProps) {
  if (events.length === 0) {
    return (
      <div className="py-4">
        <Eyebrow className="mb-3">The day book</Eyebrow>
        <p className="font-serif italic text-[15px] text-ink-3">
          Nothing in the book yet. Log the first event when something happens.
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <Eyebrow className="mb-4">The day book</Eyebrow>
      <ol className="flex flex-col">
        {events.map((e, i) => (
          <li
            key={e.id}
            className="relative grid grid-cols-[56px_24px_1fr] gap-3 pb-5"
          >
            <span className="font-mono text-[11px] text-ink-3 tracking-[0.06em] pt-1">
              {formatTime(e.time)}
            </span>
            <span className="relative flex justify-center pt-1">
              <span
                className={
                  'w-6 h-6 rounded-full grid place-items-center text-ink-2 ' +
                  (i === 0 ? 'bg-accent-soft text-accent-ink' : 'bg-paper-3')
                }
              >
                <Icon name={ICON_FOR[e.kind] ?? 'nose'} size={12} />
              </span>
              {i !== events.length - 1 && (
                <span className="absolute top-7 bottom-[-8px] w-px bg-line" />
              )}
            </span>
            <div className="pt-1">
              <p className="font-serif text-[16px] leading-snug text-ink">
                {e.title}
              </p>
              {e.note && (
                <p className="font-serif italic text-[13px] text-ink-3 mt-0.5 leading-snug">
                  {e.note}
                </p>
              )}
              {e.handler && (
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-4 mt-1">
                  {e.handler}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
