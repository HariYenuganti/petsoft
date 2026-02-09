'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';
import { authSchema, petFormSchema, petIdSchema } from '@/lib/validations';
import { DEFAULT_PET_IMAGE_URL } from '@/lib/constants';
import { auth, signIn, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { checkAuth, getPetById } from '@/lib/server-utils';
import { Prisma } from '@prisma/client';
//---User Actions---

export async function logIn(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: 'Invalid form data',
    };
  }

  await signIn('credentials', formData);
  redirect('/app/dashboard');
}

export async function signUp(formData: unknown) {
  // check if formData is instanceof FormData
  if (!(formData instanceof FormData)) {
    return {
      message: 'Invalid form data',
    };
  }
  //convert formData to object
  const formDataObject = Object.fromEntries(formData.entries());
  const validatedFormData = authSchema.safeParse(formDataObject);
  if (!validatedFormData.success) {
    return {
      message: 'Invalid form data',
    };
  }
  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          message: 'Email already exists',
        };
      }
    }
    return {
      message: 'Failed to sign up',
    };
  }
}

export async function logOut() {
  await signOut({ redirectTo: '/' });
}

//---Pet Actions---

export async function addPet(pet: unknown) {
  await sleep(1000);

  const session = await checkAuth();

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
      data: {
        ...petData,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
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

  //---Authentication Check---
  const session = await checkAuth();

  //---Validation---
  const validatedPetId = petIdSchema.safeParse(petId);

  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPet.success || !validatedPetId.success) {
    return {
      message: 'Invalid pet data',
    };
  }

  //---Authorization Check---
  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: 'Pet not found',
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: 'Unauthorized',
    };
  }

  //---Database Mutation---
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

  //---Authentication Check---
  const session = await checkAuth();

  //---Validation---
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: 'Invalid pet ID',
    };
  }

  //---Authorization Check---
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });

  if (!pet) {
    return {
      message: 'Pet not found',
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: 'Unauthorized',
    };
  }

  //---Database Mutation---

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
