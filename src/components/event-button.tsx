'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import Icon from './icon';
import { usePetContext } from '@/lib/hooks';
import { TIMELINE_KINDS } from '@/lib/validations';

const KIND_LABELS: Record<(typeof TIMELINE_KINDS)[number], string> = {
  checkin: 'Checked in',
  yard: 'Yard time',
  meal: 'Meal',
  med: 'Medication',
  nap: 'Nap',
  groom: 'Grooming',
  note: 'Note',
  checkout: 'Checked out',
};

type EventButtonProps = { petId: string };

export default function EventButton({ petId }: EventButtonProps) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<(typeof TIMELINE_KINDS)[number]>('yard');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [handler, setHandler] = useState('');
  const { handleAddEvent } = usePetContext();

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          setKind('yard');
          setTitle('');
          setNote('');
          setHandler('');
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Icon name="plus" size={14} /> Log event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
            The day book · new entry
          </p>
          <DialogTitle>What just happened?</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const finalTitle = title.trim() || KIND_LABELS[kind];
            flushSync(() => setOpen(false));
            void handleAddEvent(petId, {
              kind,
              title: finalTitle,
              note: note.trim() || undefined,
              handler: handler.trim() || undefined,
            });
          }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <Label>Kind</Label>
            <div className="flex flex-wrap gap-2">
              {TIMELINE_KINDS.filter((k) => k !== 'checkout' && k !== 'checkin').map(
                (k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKind(k)}
                    className={
                      'font-mono text-[11px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border transition-colors ' +
                      (kind === k
                        ? 'bg-ink text-paper border-ink'
                        : 'border-line text-ink-3 hover:border-ink hover:text-ink')
                    }
                  >
                    {KIND_LABELS[k]}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Title (optional)</Label>
            <Input
              id="title"
              variant="underline"
              value={title}
              placeholder={KIND_LABELS[kind]}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="note">Note (optional)</Label>
            <Textarea
              id="note"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="handler">Logged by (optional)</Label>
            <Input
              id="handler"
              variant="underline"
              value={handler}
              placeholder="Initials or name"
              onChange={(e) => setHandler(e.target.value)}
            />
          </div>

          <Button type="submit" className="self-end">
            Log event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
