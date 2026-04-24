import { Pet, Prisma, TimelineEvent, Medication } from '@prisma/client';

export type { Pet, TimelineEvent, Medication };

export type PetWithRelations = Prisma.PetGetPayload<{
  include: { events: true; medications: true };
}>;

export type PetEssentials = Omit<
  Pet,
  'id' | 'createdAt' | 'updatedAt' | 'userId' | 'checkedOutAt'
>;
