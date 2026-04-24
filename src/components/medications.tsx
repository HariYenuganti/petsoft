'use client';

import { useState } from 'react';
import { Medication } from '@prisma/client';
import Eyebrow from './eyebrow';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Icon from './icon';
import { usePetContext } from '@/lib/hooks';

function formatTime(d: Date | string) {
  return new Date(d).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

type MedicationsProps = {
  medications: Medication[];
};

export default function Medications({ medications }: MedicationsProps) {
  return (
    <section className="py-4 border-t border-line">
      <Eyebrow className="mb-3">Medications</Eyebrow>
      {medications.length === 0 ? (
        <p className="font-serif italic text-[14px] text-ink-3">
          No medications on the chart.
        </p>
      ) : (
        <ul className="flex flex-col max-h-[260px] overflow-y-auto">
          {medications.map((m) => (
            <MedicationRow key={m.id} med={m} />
          ))}
        </ul>
      )}
    </section>
  );
}

function MedicationRow({ med }: { med: Medication }) {
  const [handler, setHandler] = useState('');
  const [markingOpen, setMarkingOpen] = useState(false);
  const { handleMarkMedicationGiven } = usePetContext();
  const given = !!med.givenAt;
  const now = new Date();
  const isOverdue =
    !given && new Date(med.scheduledAt).getTime() <= now.getTime();

  return (
    <li className="grid grid-cols-[90px_1fr_auto] gap-4 py-3 border-b border-line-2 items-center">
      <span className="font-mono text-[11px] text-ink-3 tracking-[0.06em]">
        {formatTime(med.scheduledAt)}
      </span>
      <div>
        <p
          className={
            'font-serif text-[17px] leading-snug ' +
            (given ? 'text-ink-3 line-through' : isOverdue ? 'text-accent-ink' : 'text-ink')
          }
        >
          {med.name} <span className="font-mono text-[12px] text-ink-3">{med.dose}</span>
        </p>
        {given && med.givenBy && (
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ok mt-1">
            ✓ Given by {med.givenBy} · {formatTime(med.givenAt!)}
          </p>
        )}
        {!given && isOverdue && (
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-ink mt-1">
            Due now
          </p>
        )}
      </div>
      {!given &&
        (markingOpen ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const h = handler.trim();
              if (!h) return;
              void handleMarkMedicationGiven(med.id, h);
              setMarkingOpen(false);
              setHandler('');
            }}
            className="flex items-center gap-2"
          >
            <Label htmlFor={`h-${med.id}`} className="sr-only">
              Handler
            </Label>
            <Input
              id={`h-${med.id}`}
              variant="underline"
              value={handler}
              autoFocus
              placeholder="Your initials"
              className="w-28 text-[13px]"
              onChange={(e) => setHandler(e.target.value)}
            />
            <Button size="sm" type="submit">
              <Icon name="check" size={14} />
            </Button>
          </form>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setMarkingOpen(true)}
          >
            Mark given
          </Button>
        ))}
    </li>
  );
}
