'use client';

import { createContext, useOptimistic, useState } from 'react';
import { Pet } from '@prisma/client';
import { PetEssentials } from '@/lib/types';
import { addPet, deletePet, editPet } from '@/actions/actions';
import { toast } from 'sonner';

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet['id'] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet['id'], newPetData: PetEssentials) => Promise<void>;
  handleSelectedPetId: (id: Pet['id']) => void;
  handleCheckoutPet: (id: Pet['id']) => Promise<void>;
};

type Action =
  | {
      action: 'add';
      payload: PetEssentials;
    }
  | {
      action: 'edit';
      payload: {
        id: Pet['id'];
        newPetData: PetEssentials;
      };
    }
  | {
      action: 'delete';
      payload: Pet['id'];
    };

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  // State
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }: Action) => {
      if (action === 'add') {
        return [
          ...state,
          {
            ...payload,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      } else if (action === 'edit') {
        return state.map((pet) =>
          pet.id === payload.id ? { ...pet, ...payload.newPetData } : pet,
        );
      } else if (action === 'delete') {
        return state.filter((pet) => pet.id !== payload);
      }
      return state;
    },
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // event handlers/actions
  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets({ action: 'add', payload: newPet });
    const result = await addPet(newPet);
    if (result?.message) {
      toast.warning(result.message);
      return;
    }
  };

  const handleEditPet = async (petId: Pet['id'], newPetData: PetEssentials) => {
    setOptimisticPets({ action: 'edit', payload: { id: petId, newPetData } });
    const result = await editPet(petId, newPetData);
    if (result?.message) {
      toast.warning(result.message);
      return;
    }
  };

  const handleCheckoutPet = async (petId: Pet['id']) => {
    setOptimisticPets({ action: 'delete', payload: petId });
    const result = await deletePet(petId);
    if (result?.message) {
      toast.warning(result.message);
      return;
    }
    toast.success('Pet deleted successfully');

    setSelectedPetId(null);
  };

  const handleSelectedPetId = (id: Pet['id']) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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
