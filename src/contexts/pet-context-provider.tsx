'use client';

import { createContext, useState } from 'react';
import { Pet } from '@/lib/types';

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (pet: Omit<Pet, 'id'>) => void;
  handleEditPet: (petId: string, newPetData: Omit<Pet, 'id'>) => void;
  handleSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  // State
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // event handlers
  const handleAddPet = (pet: Omit<Pet, 'id'>) => {
    const newPet = {
      id: Date.now().toString(),
      ...pet,
    };
    setPets((prev) => [...prev, newPet]);
  };

  const handleEditPet = (petId: string, newPetData: Omit<Pet, 'id'>) => {
    setPets((prev) =>
      prev.map((pet) => (pet.id === petId ? { ...pet, ...newPetData } : pet))
    );
  };

  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  const handleSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
