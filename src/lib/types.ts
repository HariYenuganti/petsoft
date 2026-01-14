import { Pet } from '@prisma/client';
export type { Pet };

export type PetEssentials = Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>;
