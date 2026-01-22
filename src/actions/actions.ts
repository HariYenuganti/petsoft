'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';
import { PetEssentials } from '@/lib/types';
import { Pet } from '@prisma/client';
import { petFormSchema, petIdSchema } from '@/lib/validations';
import { DEFAULT_PET_IMAGE_URL } from '@/lib/constants';

export async function addPet(pet: unknown) {
  await sleep(1000);

  const validatedPet = petFormSchema.safeParse(pet);

  if (!validatedPet.success) {
    return {
      message: 'Invalid pet data',
    };
  }

  try {
    const petData = validatedPet.data;
    petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE_URL;

    await prisma.pet.create({
      data: petData,
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return {
      message: 'Failed to add pet',
    };
  }
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await sleep(2000);

  const validatedPetId = petIdSchema.safeParse(petId);

  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPet.success || !validatedPetId.success) {
    return {
      message: 'Invalid pet data',
    };
  }

  try {
    const petData = validatedPet.data;
    petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE_URL;

    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: petData,
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return {
      message: 'Failed to edit pet',
    };
  }
}

export async function deletePet(petId: unknown) {
  await sleep(2000);

  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success) {
    return {
      message: 'Invalid pet ID',
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return {
      message: 'Failed to delete pet',
    };
  }
}
