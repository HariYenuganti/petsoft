'use client';

import { useState, useRef } from 'react';
import Eyebrow from '@/components/eyebrow';
import PetFace from '@/components/pet-face';
import Icon from '@/components/icon';
import { Button } from '@/components/ui/button';

type DemoPet = {
  id: string;
  name: string;
  face: string;
  plate: string;
  status: string;
  fresh?: boolean;
};

const SEED: DemoPet[] = [
  { id: 'd1', name: 'Juniper', face: 'poodle', plate: 'KR-0421', status: 'Yard A' },
  { id: 'd2', name: 'Basil', face: 'shiba', plate: 'KR-0422', status: 'Suite 2' },
  { id: 'd3', name: 'Nutmeg', face: 'cat', plate: 'KR-0423', status: 'Napping' },
];

const FACES = ['golden', 'berner', 'whippet', 'daxie', 'aussie', 'cavalier'];

export default function DemoSection() {
  const [pets, setPets] = useState<DemoPet[]>(SEED);
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addPet = (e?: React.FormEvent) => {
    e?.preventDefault();
    const n = name.trim();
    if (!n) {
      inputRef.current?.focus();
      return;
    }
    const next: DemoPet = {
      id: 'd_' + Date.now(),
      name: n,
      face: FACES[pets.length % FACES.length],
      plate: 'KR-' + String(500 + pets.length).padStart(4, '0'),
      status: 'Checking in',
      fresh: true,
    };
    setPets([next, ...pets.slice(0, 4)]);
    setName('');
    // Clear the fresh flag after the animation
    setTimeout(() => {
      setPets((cur) =>
        cur.map((p) => (p.id === next.id ? { ...p, fresh: false } : p)),
      );
    }, 700);
  };

  return (
    <section id="demo" className="landing-section">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Eyebrow className="mb-4">Chapter II · a small demonstration</Eyebrow>
          <h2 className="section-title">
            Check a guest in.{' '}
            <span className="italic">Watch the floor make room.</span>
          </h2>
          <p className="text-ink-3 text-[15px] leading-[1.65] max-w-[46ch] mb-8">
            Type a name and press return. Kennelry writes the line, assigns a
            plate, and slides the guest into today&rsquo;s roster. No server.
            No database. Just the feel of it.
          </p>
          <form
            onSubmit={addPet}
            className="flex items-center gap-2 max-w-[420px]"
          >
            <div className="search-field flex-1">
              <span className="text-ink-3">
                <Icon name="plus" size={14} />
              </span>
              <input
                ref={inputRef}
                placeholder="Name a guest…"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <Button type="submit" size="sm">
              Check in
            </Button>
          </form>
          <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-4">
            Demo only · nothing is saved
          </p>
        </div>

        <aside className="demo-roster">
          {pets.map((p) => (
            <div key={p.id} className={p.fresh ? 'fresh' : ''}>
              <span className="demo-face text-ink-2">
                <PetFace kind={p.face} size={28} />
              </span>
              <span>
                <span className="demo-name block">{p.name}</span>
                <span className="demo-plate block">{p.plate}</span>
              </span>
              <span className="demo-plate">{p.status}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
