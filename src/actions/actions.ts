'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';
import { PetEssentials } from '@/lib/types';
import { Pet } from '@prisma/client';

export async function addPet(pet: PetEssentials) {
  await sleep(1000);
  try {
    await prisma.pet.create({
      data: pet,
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return {
      message: 'Failed to add pet',
    };
  }
}

export async function editPet(petId: Pet['id'], newPetData: PetEssentials) {
  await sleep(2000);
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPetData,
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return {
      message: 'Failed to edit pet',
    };
  }
}

export async function deletePet(petId: Pet['id']) {
  await sleep(2000);
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return {
      message: 'Failed to delete pet',
    };
  }
}
