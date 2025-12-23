'use client';
import Image from 'next/image';
import { usePetContext } from '@/lib/hooks';
import { cn } from '@/lib/utils';
export default function PetList() {
  const { pets, selectedPetId, handleSelectedPetId } = usePetContext();
  return (
    <ul className="bg-white border-b border-light">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => {
              handleSelectedPetId(pet.id);
            }}
            className={cn(
              'flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition',
              { ' bg-[#EFF1F2]': selectedPetId === pet.id }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="pet image"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
