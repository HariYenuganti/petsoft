'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import {
  authSchema,
  medicationIdSchema,
  medicationSchema,
  markGivenSchema,
  petFormSchema,
  petIdSchema,
  timelineEventIdSchema,
  timelineEventSchema,
} from '@/lib/validations';
import { DEFAULT_PET_IMAGE_URL } from '@/lib/constants';
import { signIn, signOut } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { checkAuth, getPetById } from '@/lib/server-utils';
import { Prisma } from '@prisma/client';
import { AuthError } from 'next-auth';

//---User Actions---

export async function logIn(previousState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return { message: 'Invalid form data.' };
  }

  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid credentials.' };
        default:
          return { message: 'Error. Could not sign in.' };
      }
    }
    throw error;
  }
}

export async function signUp(previousState: unknown, formData: unknown) {
  if (!(formData instanceof FormData)) {
    return { message: 'Invalid form data' };
  }
  const formDataObject = Object.fromEntries(formData.entries());
  const validatedFormData = authSchema.safeParse(formDataObject);
  if (!validatedFormData.success) {
    return { message: 'Invalid form data' };
  }
  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({ data: { email, hashedPassword } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { message: 'Email already exists' };
      }
    }
    return { message: 'Failed to sign up' };
  }

  await signIn('credentials', formData);
}

export async function logOut() {
  await signOut({ redirectTo: '/' });
}

// -------- Ownership helper --------

async function assertPetOwnership(petId: string) {
  const session = await checkAuth();
  const validated = petIdSchema.safeParse(petId);
  if (!validated.success) return { error: 'Invalid pet ID' as const };
  const pet = await getPetById(validated.data);
  if (!pet) return { error: 'Pet not found' as const };
  if (pet.userId !== session.user.id) return { error: 'Unauthorized' as const };
  return { pet, session };
}

//---Pet Actions---

export async function addPet(pet: unknown) {
  const session = await checkAuth();
  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) return { message: 'Invalid pet data' };

  try {
    const petData = validatedPet.data;
    petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE_URL;
    await prisma.pet.create({
      data: {
        ...petData,
        user: { connect: { id: session.user.id } },
      },
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    console.error('addPet Error:', error);
    return { message: 'Failed to add pet' };
  }
}

export async function editPet(petId: unknown, newPetData: unknown) {
  const session = await checkAuth();
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPet.success || !validatedPetId.success) {
    return { message: 'Invalid pet data' };
  }

  const pet = await getPetById(validatedPetId.data);
  if (!pet) return { message: 'Pet not found' };
  if (pet.userId !== session.user.id) return { message: 'Unauthorized' };

  try {
    const petData = validatedPet.data;
    petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE_URL;
    await prisma.pet.update({
      where: { id: validatedPetId.data },
      data: petData,
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return { message: 'Failed to edit pet' };
  }
}

/** Hard delete — permanently removes the pet and cascades to events + meds. */
export async function deletePet(petId: unknown) {
  const check = await assertPetOwnership(petId as string);
  if ('error' in check) return { message: check.error };

  try {
    await prisma.pet.delete({ where: { id: check.pet.id } });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return { message: 'Failed to delete pet' };
  }
}

/** Soft-archive: sets checkedOutAt, inserts a checkout TimelineEvent. */
export async function checkoutPet(petId: unknown) {
  const check = await assertPetOwnership(petId as string);
  if ('error' in check) return { message: check.error };

  try {
    const now = new Date();
    await prisma.pet.update({
      where: { id: check.pet.id },
      data: {
        checkedOutAt: now,
        events: {
          create: {
            time: now,
            kind: 'checkout',
            title: 'Checked out',
          },
        },
      },
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return { message: 'Failed to check out pet' };
  }
}

/** Clears checkedOutAt, inserts a checkin TimelineEvent. */
export async function recheckInPet(petId: unknown) {
  const check = await assertPetOwnership(petId as string);
  if ('error' in check) return { message: check.error };

  try {
    await prisma.pet.update({
      where: { id: check.pet.id },
      data: {
        checkedOutAt: null,
        events: {
          create: {
            kind: 'checkin',
            title: 'Checked in',
          },
        },
      },
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return { message: 'Failed to check in pet' };
  }
}

//---Timeline event Actions---

export async function addTimelineEvent(petId: unknown, data: unknown) {
  const check = await assertPetOwnership(petId as string);
  if ('error' in check) return { message: check.error };

  const validated = timelineEventSchema.safeParse(data);
  if (!validated.success) return { message: 'Invalid event data' };

  try {
    await prisma.timelineEvent.create({
      data: {
        petId: check.pet.id,
        kind: validated.data.kind,
        title: validated.data.title,
        note: validated.data.note || null,
        handler: validated.data.handler || null,
      },
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return { message: 'Failed to log event' };
  }
}

export async function deleteTimelineEvent(eventId: unknown) {
  const session = await checkAuth();
  const validatedId = timelineEventIdSchema.safeParse(eventId);
  if (!validatedId.success) return { message: 'Invalid event ID' };

  const event = await prisma.timelineEvent.findUnique({
    where: { id: validatedId.data },
    include: { pet: true },
  });
  if (!event) return { message: 'Event not found' };
  if (event.pet.userId !== session.user.id) return { message: 'Unauthorized' };

  try {
    await prisma.timelineEvent.delete({ where: { id: validatedId.data } });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return { message: 'Failed to delete event' };
  }
}

//---Medication Actions---

export async function addMedication(petId: unknown, data: unknown) {
  const check = await assertPetOwnership(petId as string);
  if ('error' in check) return { message: check.error };

  const validated = medicationSchema.safeParse(data);
  if (!validated.success) return { message: 'Invalid medication data' };

  try {
    await prisma.medication.create({
      data: {
        petId: check.pet.id,
        name: validated.data.name,
        dose: validated.data.dose,
        scheduledAt: validated.data.scheduledAt,
      },
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return { message: 'Failed to add medication' };
  }
}

export async function markMedicationGiven(data: unknown) {
  const session = await checkAuth();
  const validated = markGivenSchema.safeParse(data);
  if (!validated.success) return { message: 'Invalid input' };

  const med = await prisma.medication.findUnique({
    where: { id: validated.data.medicationId },
    include: { pet: true },
  });
  if (!med) return { message: 'Medication not found' };
  if (med.pet.userId !== session.user.id) return { message: 'Unauthorized' };

  try {
    await prisma.medication.update({
      where: { id: med.id },
      data: {
        givenAt: new Date(),
        givenBy: validated.data.handler,
      },
    });
    await prisma.timelineEvent.create({
      data: {
        petId: med.petId,
        kind: 'med',
        title: `${med.name} ${med.dose} given`,
        handler: validated.data.handler,
      },
    });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return { message: 'Failed to mark medication' };
  }
}

export async function deleteMedication(medicationId: unknown) {
  const session = await checkAuth();
  const validatedId = medicationIdSchema.safeParse(medicationId);
  if (!validatedId.success) return { message: 'Invalid ID' };

  const med = await prisma.medication.findUnique({
    where: { id: validatedId.data },
    include: { pet: true },
  });
  if (!med) return { message: 'Medication not found' };
  if (med.pet.userId !== session.user.id) return { message: 'Unauthorized' };

  try {
    await prisma.medication.delete({ where: { id: med.id } });
    revalidatePath('/app', 'layout');
  } catch (error) {
    return { message: 'Failed to delete medication' };
  }
}
