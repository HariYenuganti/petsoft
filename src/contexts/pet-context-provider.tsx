'use client';

import { createContext, useOptimistic, useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Pet, TimelineEvent, Medication } from '@prisma/client';
import { PetEssentials, PetWithRelations } from '@/lib/types';
import {
  addPet,
  addMedication,
  addTimelineEvent,
  checkoutPet,
  deletePet,
  editPet,
  markMedicationGiven,
  recheckInPet,
} from '@/actions/actions';
import { toast } from 'sonner';
import { DEFAULT_PET_IMAGE_URL } from '@/lib/constants';

type PetContextProviderProps = {
  data: PetWithRelations[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: PetWithRelations[];
  selectedPetId: Pet['id'] | null;
  selectedPet: PetWithRelations | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet['id'], newPetData: PetEssentials) => Promise<void>;
  handleSelectedPetId: (id: Pet['id']) => void;
  handleCheckoutPet: (id: Pet['id']) => Promise<void>;
  handleRecheckInPet: (id: Pet['id']) => Promise<void>;
  handleRemovePet: (id: Pet['id']) => Promise<void>;
  handleAddEvent: (
    petId: Pet['id'],
    event: { kind: string; title: string; note?: string; handler?: string },
  ) => Promise<void>;
  handleAddMedication: (
    petId: Pet['id'],
    med: { name: string; dose: string; scheduledAt: Date },
  ) => Promise<void>;
  handleMarkMedicationGiven: (
    medicationId: Medication['id'],
    handler: string,
  ) => Promise<void>;
};

type Action =
  | { action: 'add'; payload: PetEssentials }
  | { action: 'edit'; payload: { id: Pet['id']; newPetData: PetEssentials } }
  | { action: 'delete'; payload: Pet['id'] }
  | { action: 'checkout'; payload: Pet['id'] }
  | { action: 'recheckin'; payload: Pet['id'] }
  | { action: 'add-event'; payload: { petId: Pet['id']; event: Partial<TimelineEvent> } }
  | { action: 'mark-med'; payload: { medicationId: string; handler: string } }
  | {
      action: 'add-med';
      payload: {
        petId: Pet['id'];
        med: { name: string; dose: string; scheduledAt: Date };
      };
    };

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const router = useRouter();
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }: Action) => {
      if (action === 'add') {
        return [
          {
            ...payload,
            imageUrl: payload.imageUrl || DEFAULT_PET_IMAGE_URL,
            id: 'temp_' + Date.now(),
            userId: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            checkedOutAt: null,
            events: [],
            medications: [],
          },
          ...state,
        ];
      }
      if (action === 'edit') {
        return state.map((pet) =>
          pet.id === payload.id
            ? {
                ...pet,
                ...payload.newPetData,
                imageUrl:
                  payload.newPetData.imageUrl || DEFAULT_PET_IMAGE_URL,
              }
            : pet,
        );
      }
      if (action === 'delete') {
        return state.filter((pet) => pet.id !== payload);
      }
      if (action === 'checkout') {
        return state.map((pet) =>
          pet.id === payload ? { ...pet, checkedOutAt: new Date() } : pet,
        );
      }
      if (action === 'recheckin') {
        return state.map((pet) =>
          pet.id === payload ? { ...pet, checkedOutAt: null } : pet,
        );
      }
      if (action === 'add-event') {
        return state.map((pet) =>
          pet.id === payload.petId
            ? {
                ...pet,
                events: [
                  {
                    id: 'temp_' + Date.now(),
                    petId: pet.id,
                    time: new Date(),
                    kind: payload.event.kind ?? 'note',
                    title: payload.event.title ?? 'Note',
                    note: payload.event.note ?? null,
                    handler: payload.event.handler ?? null,
                    createdAt: new Date(),
                  } as TimelineEvent,
                  ...pet.events,
                ],
              }
            : pet,
        );
      }
      if (action === 'add-med') {
        return state.map((pet) =>
          pet.id === payload.petId
            ? {
                ...pet,
                medications: [
                  ...pet.medications,
                  {
                    id: 'temp_' + Date.now(),
                    petId: pet.id,
                    name: payload.med.name,
                    dose: payload.med.dose,
                    scheduledAt: payload.med.scheduledAt,
                    givenAt: null,
                    givenBy: null,
                    createdAt: new Date(),
                  } as Medication,
                ].sort(
                  (a, b) =>
                    a.scheduledAt.getTime() - b.scheduledAt.getTime(),
                ),
              }
            : pet,
        );
      }
      if (action === 'mark-med') {
        return state.map((pet) => ({
          ...pet,
          medications: pet.medications.map((m) =>
            m.id === payload.medicationId
              ? { ...m, givenAt: new Date(), givenBy: payload.handler }
              : m,
          ),
        }));
      }
      return state;
    },
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = optimisticPets.find((p) => p.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleAddPet = async (newPet: PetEssentials) => {
    startTransition(async () => {
      setOptimisticPets({ action: 'add', payload: newPet });
      const result = await addPet(newPet);
      if (result?.message) {
        toast.warning(result.message);
      }
    });
  };

  const handleEditPet = async (petId: Pet['id'], newPetData: PetEssentials) => {
    startTransition(async () => {
      setOptimisticPets({
        action: 'edit',
        payload: { id: petId, newPetData },
      });
      const result = await editPet(petId, newPetData);
      if (result?.message) {
        toast.warning(result.message);
      }
    });
  };

  const handleCheckoutPet = async (petId: Pet['id']) => {
    setSelectedPetId(null);
    router.push(`/app/pets/${petId}/ticket`);
    startTransition(async () => {
      setOptimisticPets({ action: 'checkout', payload: petId });
      const result = await checkoutPet(petId);
      if (result?.message) {
        toast.warning(result.message);
      }
    });
  };

  const handleRecheckInPet = async (petId: Pet['id']) => {
    startTransition(async () => {
      setOptimisticPets({ action: 'recheckin', payload: petId });
      const result = await recheckInPet(petId);
      if (result?.message) {
        toast.warning(result.message);
        return;
      }
      toast.success('Checked back in');
    });
  };

  const handleRemovePet = async (petId: Pet['id']) => {
    startTransition(async () => {
      setOptimisticPets({ action: 'delete', payload: petId });
      const result = await deletePet(petId);
      if (result?.message) {
        toast.warning(result.message);
        return;
      }
      toast.success('Guest removed');
      setSelectedPetId(null);
    });
  };

  const handleAddEvent: TPetContext['handleAddEvent'] = async (petId, event) => {
    startTransition(async () => {
      setOptimisticPets({
        action: 'add-event',
        payload: { petId, event: event as Partial<TimelineEvent> },
      });
      const result = await addTimelineEvent(petId, event);
      if (result?.message) {
        toast.warning(result.message);
      }
    });
  };

  const handleAddMedication: TPetContext['handleAddMedication'] = async (
    petId,
    med,
  ) => {
    startTransition(async () => {
      setOptimisticPets({ action: 'add-med', payload: { petId, med } });
      const result = await addMedication(petId, med);
      if (result?.message) {
        toast.warning(result.message);
      }
    });
  };

  const handleMarkMedicationGiven: TPetContext['handleMarkMedicationGiven'] = async (
    medicationId,
    handler,
  ) => {
    startTransition(async () => {
      setOptimisticPets({
        action: 'mark-med',
        payload: { medicationId, handler },
      });
      const result = await markMedicationGiven({ medicationId, handler });
      if (result?.message) {
        toast.warning(result.message);
      }
    });
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
        handleRecheckInPet,
        handleRemovePet,
        handleAddPet,
        handleEditPet,
        handleAddEvent,
        handleAddMedication,
        handleMarkMedicationGiven,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
