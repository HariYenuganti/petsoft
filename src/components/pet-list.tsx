'use client';
import Image from 'next/image';
import { usePetContext, useSearchContext } from '@/lib/hooks';
import PetFace from './pet-face';
import Icon from './icon';

function petPlate(id: string) {
  return 'PS-' + id.slice(-4).toUpperCase();
}

export default function PetList() {
  const { pets, selectedPetId, handleSelectedPetId, handleRecheckInPet } =
    usePetContext();
  const { searchQuery, rosterFilter } = useSearchContext();

  const filtered = pets
    .filter((pet) =>
      rosterFilter === 'on' ? pet.checkedOutAt === null : pet.checkedOutAt !== null,
    )
    .filter((pet) =>
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <ul className="bg-paper-2 h-full overflow-y-auto">
      {filtered.length === 0 && (
        <li className="p-8 text-center flex flex-col items-center gap-3">
          <svg
            width="56"
            height="56"
            viewBox="0 0 96 96"
            fill="none"
            aria-hidden="true"
            className="text-ink-3 opacity-80"
          >
            <rect
              x="14"
              y="16"
              width="68"
              height="68"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="hsl(var(--paper-3))"
            />
            <line x1="14" y1="28" x2="82" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
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
          <p className="font-serif italic text-[16px] text-ink-3 max-w-[22ch]">
            {rosterFilter === 'on'
              ? searchQuery
                ? 'No guests match that search.'
                : "Nobody on the floor yet. Not a soul. The yard's still, the water bowls are full."
              : "Everyone's home."}
          </p>
        </li>
      )}
      {filtered.map((pet) => {
        const active = selectedPetId === pet.id;
        return (
          <li key={pet.id}>
            <div
              className="roster-row"
              data-active={active}
              style={{ cursor: 'default' }}
            >
              <button
                onClick={() => handleSelectedPetId(pet.id)}
                className="contents text-left"
              >
                <span className="roster-avatar text-ink-2">
                  {pet.imageUrl ? (
                    <Image
                      src={pet.imageUrl}
                      alt={pet.name}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PetFace kind={pet.id} size={40} />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="roster-name block truncate">{pet.name}</span>
                  <span className="roster-plate block">
                    {petPlate(pet.id)} &middot; {pet.ownerName}
                  </span>
                </span>
              </button>
              {rosterFilter === 'off' ? (
                <button
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 hover:text-ink inline-flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    void handleRecheckInPet(pet.id);
                  }}
                  title="Check in again"
                >
                  <Icon name="arrow-in" size={12} />
                  Check in
                </button>
              ) : (
                <span className="roster-time hidden sm:block">
                  {pet.age ? `${pet.age} yr` : '—'}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
