'use client';

import { useSearchContext } from '@/lib/hooks';

export default function RosterTabs({
  onCount,
  offCount,
}: {
  onCount: number;
  offCount: number;
}) {
  const { rosterFilter, handleChangeRosterFilter } = useSearchContext();
  const tabs: { id: 'on' | 'off'; label: string; count: number }[] = [
    { id: 'on', label: 'On premises', count: onCount },
    { id: 'off', label: 'Off premises', count: offCount },
  ];
  return (
    <div className="flex items-center gap-1 border-b border-line pb-2">
      {tabs.map((t) => {
        const active = rosterFilter === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => handleChangeRosterFilter(t.id)}
            className={
              'font-mono text-[11px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-sm transition-colors flex items-center gap-2 ' +
              (active
                ? 'text-ink'
                : 'text-ink-3 hover:text-ink')
            }
          >
            <span>{t.label}</span>
            <span
              className={
                'font-mono text-[10.5px] px-1.5 py-0.5 rounded ' +
                (active ? 'bg-ink text-paper' : 'bg-paper-3 text-ink-3')
              }
            >
              {t.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
