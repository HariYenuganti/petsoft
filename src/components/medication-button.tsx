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
import Icon from './icon';
import { usePetContext } from '@/lib/hooks';

type MedicationButtonProps = { petId: string };

export default function MedicationButton({ petId }: MedicationButtonProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [time, setTime] = useState('09:00');
  const { handleAddMedication } = usePetContext();

  const reset = () => {
    setName('');
    setDose('');
    setTime('09:00');
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Icon name="plus" size={14} /> Add medication
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
            The medication log · new dose
          </p>
          <DialogTitle>Add a scheduled dose.</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim() || !dose.trim()) return;
            const [h, m] = time.split(':').map(Number);
            const scheduled = new Date();
            scheduled.setHours(h, m, 0, 0);
            flushSync(() => setOpen(false));
            void handleAddMedication(petId, {
              name: name.trim(),
              dose: dose.trim(),
              scheduledAt: scheduled,
            });
          }}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="med-name">Medication</Label>
            <Input
              id="med-name"
              variant="underline"
              value={name}
              placeholder="Carprofen"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="med-dose">Dose</Label>
              <Input
                id="med-dose"
                variant="underline"
                value={dose}
                placeholder="75 mg"
                required
                onChange={(e) => setDose(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="med-time">Scheduled (today)</Label>
              <Input
                id="med-time"
                type="time"
                variant="underline"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="self-end">
            Schedule
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
