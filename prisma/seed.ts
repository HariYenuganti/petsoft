import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Events & meds are keyed to pet name so we can fan out after create.
const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};
const at = (h: number, m = 0) => {
  const d = today();
  d.setHours(h, m, 0, 0);
  return d;
};

const PETS_SEED: Array<
  Omit<Prisma.PetCreateWithoutUserInput, 'events' | 'medications'> & {
    events: Omit<Prisma.TimelineEventCreateWithoutPetInput, 'petId'>[];
    medications: Omit<Prisma.MedicationCreateWithoutPetInput, 'petId'>[];
  }
> = [
  {
    name: 'Benjamin',
    ownerName: 'John Doe',
    imageUrl: '/pet-placeholder.jpg',
    age: 2,
    notes:
      "Doesn't like to be touched on the belly. Plays well with other dogs.",
    events: [
      { time: at(8, 14), kind: 'checkin', title: 'Checked in', handler: 'Iris' },
      { time: at(9, 20), kind: 'yard', title: 'Morning yard', note: 'Group A — fetch for 18 min', handler: 'Mikel' },
      { time: at(12, 30), kind: 'meal', title: 'Lunch', note: 'Full portion', handler: 'Thea' },
      { time: at(13, 15), kind: 'nap', title: 'Nap in Suite 4', handler: 'Thea' },
      { time: at(14, 45), kind: 'yard', title: 'Scent game', note: 'Found 6 of 8 hidden treats', handler: 'Iris' },
    ],
    medications: [],
  },
  {
    name: 'Richard',
    ownerName: 'Josephine Dane',
    imageUrl: '/pet-placeholder.jpg',
    age: 5,
    notes: 'Needs medication twice a day.',
    events: [
      { time: at(7, 58), kind: 'checkin', title: 'Checked in', handler: 'Reza' },
      { time: at(9, 15), kind: 'yard', title: 'Quiet yard', note: 'Solo only — reactive to large dogs', handler: 'Reza' },
      { time: at(11, 0), kind: 'med', title: 'Morning meds given', handler: 'Reza' },
    ],
    medications: [
      { name: 'Apoquel', dose: '5.4 mg', scheduledAt: at(8, 30), givenAt: at(8, 32), givenBy: 'Reza' },
      { name: 'Apoquel', dose: '5.4 mg', scheduledAt: at(17, 30) },
    ],
  },
  {
    name: 'Anna',
    ownerName: 'Frank Doe',
    imageUrl: '/pet-placeholder.jpg',
    age: 4,
    notes: 'Allergic to chicken.',
    events: [
      { time: at(9, 40), kind: 'checkin', title: 'Checked in', handler: 'Iris' },
      { time: at(10, 30), kind: 'groom', title: 'Grooming — bath', note: 'Oatmeal shampoo', handler: 'Thea' },
      { time: at(12, 30), kind: 'meal', title: 'Lunch', note: 'Grain-free only', handler: 'Thea' },
    ],
    medications: [
      { name: 'Joint chew', dose: '1 unit', scheduledAt: at(17, 0) },
    ],
  },
];

async function main() {
  console.log(`Start seeding ...`);

  const hashedPassword = await bcrypt.hash('example', 10);

  const user = await prisma.user.create({
    data: {
      email: 'example@gmail.com',
      hashedPassword,
    },
  });

  for (const pet of PETS_SEED) {
    await prisma.pet.create({
      data: {
        name: pet.name,
        ownerName: pet.ownerName,
        imageUrl: pet.imageUrl,
        age: pet.age,
        notes: pet.notes,
        user: { connect: { id: user.id } },
        events: { create: pet.events },
        medications: { create: pet.medications },
      },
    });
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
