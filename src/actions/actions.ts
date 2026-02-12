'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';
import { authSchema, petFormSchema, petIdSchema } from '@/lib/validations';
import { DEFAULT_PET_IMAGE_URL } from '@/lib/constants';
import { signIn, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { checkAuth, getPetById } from '@/lib/server-utils';
import { Prisma } from '@prisma/client';
import { AuthError } from 'next-auth';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//---User Actions---

export async function logIn(previousState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: 'Invalid form data.',
    };
  }

  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return {
            message: 'Invalid credentials.',
          };
        }
        default: {
          return {
            message: 'Error. Could not sign in.',
          };
        }
      }
    }

    throw error; // nextjs redirects throws error, so we need to rethrow it
  }
}

export async function signUp(previousState: unknown, formData: unknown) {
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

//---Payment Actions---
export async function createCheckoutSession() {
  //---Authentication Check---
  const session = await checkAuth();

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment?canceled=true`,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    metadata: {
      userId: session.user.id,
    },
    payment_method_types: ['card'],
  });

  //redirect user
  redirect(checkoutSession.url);
}
