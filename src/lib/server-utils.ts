import 'server-only';
import { auth } from './auth';
import { redirect } from 'next/navigation';
import { Pet, User } from '@prisma/client';
import prisma from './db';

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  return session;
}

export async function getPetById(petId: Pet['id']) {
  const pet = await prisma.pet.findUnique({
    where: { id: petId },
  });
  return pet;
}

/** Returns all pets for a user (on + off premises), with events + meds. */
export async function getPetsByUserId(userId: User['id']) {
  const pets = await prisma.pet.findMany({
    where: { userId },
    include: {
      events: { orderBy: { time: 'desc' } },
      medications: { orderBy: { scheduledAt: 'asc' } },
    },
    orderBy: [{ checkedOutAt: 'asc' }, { createdAt: 'desc' }],
  });
  return pets;
}

export async function getEventsByPetId(petId: Pet['id']) {
  return prisma.timelineEvent.findMany({
    where: { petId },
    orderBy: { time: 'desc' },
  });
}

export async function getMedicationsByPetId(petId: Pet['id']) {
  return prisma.medication.findMany({
    where: { petId },
    orderBy: { scheduledAt: 'asc' },
  });
}

export { getUserByEmail } from './user-model';
