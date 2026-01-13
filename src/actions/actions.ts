'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';

export async function addPet(formData: FormData) {
  await sleep(2000);
  try {
    await prisma.pet.create({
      data: {
        name: formData.get('name') as string,
        ownerName: formData.get('ownerName') as string,
        imageUrl:
          (formData.get('imageUrl') as string) ||
          'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
        age: Number(formData.get('age')),
        notes: formData.get('notes') as string,
      },
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return {
      message: 'Failed to add pet',
    };
  }
}

export async function editPet(petId: string, formData: FormData) {
  await sleep(2000);
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: {
        name: formData.get('name') as string,
        ownerName: formData.get('ownerName') as string,
        imageUrl:
          (formData.get('imageUrl') as string) ||
          'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
        age: Number(formData.get('age')),
        notes: formData.get('notes') as string,
      },
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return {
      message: 'Failed to edit pet',
    };
  }
}

export async function deletePet(petId: string) {
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
