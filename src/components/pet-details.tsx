'use client';
import { useState } from 'react';
import Image from 'next/image';
import { usePetContext } from '@/lib/hooks';
import { PetWithRelations } from '@/lib/types';

import PetButton from './pet-button';
import PetFace from './pet-face';
import Eyebrow from './eyebrow';
import Timeline from './timeline';
import Medications from './medications';
import EventButton from './event-button';
import MedicationButton from './medication-button';
import Agenda from './agenda';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import Icon from './icon';

function petPlate(id: string) {
  return 'PS-' + id.slice(-4).toUpperCase();
}

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col h-full w-full bg-paper-2 overflow-y-auto">
      {!selectedPet ? <Agenda /> : <Detail pet={selectedPet} />}
    </section>
  );
}

function Detail({ pet }: { pet: PetWithRelations }) {
  const { handleCheckoutPet, handleRemovePet } = usePetContext();
  const [removeOpen, setRemoveOpen] = useState(false);
  const firstCheckin = pet.events
    .slice()
    .reverse()
    .find((e) => e.kind === 'checkin');

  return (
    <div className="flex flex-col">
      <div className="detail-hero">
        <div className="detail-photo">
          <div className="detail-photo-inner wag text-ink-2">
            {pet.imageUrl ? (
              <Image
                src={pet.imageUrl}
                alt={pet.name}
                width={180}
                height={180}
                className="w-full h-full object-cover"
              />
            ) : (
              <PetFace kind={pet.id} size={140} />
            )}
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <Eyebrow>
            Plate {petPlate(pet.id)} &middot;{' '}
            {pet.checkedOutAt ? 'Off premises' : 'On premises'}
          </Eyebrow>
          <h2 className="detail-name truncate">{pet.name}</h2>
          <p className="detail-byline">In the care of {pet.ownerName}.</p>
          <div className="flex gap-2 mt-6 flex-wrap items-center">
            <PetButton actionType="edit">Edit</PetButton>
            <EventButton petId={pet.id} />
            <MedicationButton petId={pet.id} />
            {!pet.checkedOutAt && (
              <Button
                variant="outline"
                onClick={() => handleCheckoutPet(pet.id)}
              >
                <Icon name="arrow-out" size={14} />
                Check out
              </Button>
            )}
            <MoreMenu onRemove={() => setRemoveOpen(true)} />
          </div>
        </div>
      </div>

      <div className="detail-specs">
        <div className="spec">
          <span className="spec-label">Age</span>
          <span className="spec-value">{pet.age ? `${pet.age} yr` : '—'}</span>
        </div>
        <div className="spec">
          <span className="spec-label">Owner</span>
          <span className="spec-value truncate">{pet.ownerName}</span>
        </div>
        <div className="spec">
          <span className="spec-label">Checked in</span>
          <span className="spec-value">
            {firstCheckin
              ? new Date(firstCheckin.time).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '—'}
          </span>
        </div>
        <div className="spec">
          <span className="spec-label">Events</span>
          <span className="spec-value">{pet.events.length}</span>
        </div>
      </div>

      <div className="p-8 flex flex-col gap-4">
        <Eyebrow>From the owner</Eyebrow>
        <p className="font-serif text-[17px] leading-relaxed text-ink-2 max-w-[60ch]">
          {pet.notes || (
            <span className="italic text-ink-3">No note on file yet.</span>
          )}
        </p>
      </div>

      <div className="px-8">
        <Medications medications={pet.medications} />
      </div>

      <div className="px-8 border-t border-line pb-8">
        <Timeline events={pet.events} />
      </div>

      {/* Destructive confirm */}
      <Dialog open={removeOpen} onOpenChange={setRemoveOpen}>
        <DialogContent>
          <DialogHeader>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-alert">
              Remove guest
            </p>
            <DialogTitle>Delete {pet.name}&rsquo;s record?</DialogTitle>
          </DialogHeader>
          <p className="font-serif text-[15px] text-ink-2 leading-relaxed">
            This deletes {pet.name}&rsquo;s profile, day book, and medication
            history. It can&rsquo;t be undone. Use this only when an owner has
            left the daycare for good.
          </p>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setRemoveOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setRemoveOpen(false);
                void handleRemovePet(pet.id);
              }}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MoreMenu({ onRemove }: { onRemove: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label="More"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
      >
        <Icon name="more" size={16} />
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-20 bg-paper border border-line rounded-md shadow-[0_12px_24px_hsl(var(--ink)/0.12)] py-1 min-w-[180px]">
          <button
            className="w-full text-left px-3 py-2 text-[13px] text-alert hover:bg-paper-2 flex items-center gap-2"
            onMouseDown={(e) => {
              e.preventDefault();
              setOpen(false);
              onRemove();
            }}
          >
            <Icon name="close" size={14} />
            Remove guest
          </button>
        </div>
      )}
    </div>
  );
}

