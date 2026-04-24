import { z } from 'zod';

export const petIdSchema = z.string().cuid();

export const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be at most 100 characters long' }),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: 'Owner name is required' })
    .max(100, { message: 'Owner name must be at most 100 characters long' }),
  imageUrl: z.union([
    z.literal(''),
    z.string().trim().url({ message: 'Invalid image URL' }),
  ]),
  age: z.number().int().positive().max(100),
  notes: z.union([
    z.literal(''),
    z
      .string()
      .trim()
      .max(1000, { message: 'Notes must be at most 1000 characters long' }),
  ]),
});

export type PetFormValues = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters long' }),
});

export type TAuth = z.infer<typeof authSchema>;

// ---------- Timeline events ----------

export const TIMELINE_KINDS = [
  'checkin',
  'yard',
  'meal',
  'med',
  'nap',
  'groom',
  'note',
  'checkout',
] as const;

export const timelineEventSchema = z.object({
  kind: z.enum(TIMELINE_KINDS),
  title: z.string().trim().min(1).max(100),
  note: z
    .string()
    .trim()
    .max(500, { message: 'Note must be at most 500 characters' })
    .optional()
    .or(z.literal('')),
  handler: z
    .string()
    .trim()
    .max(60)
    .optional()
    .or(z.literal('')),
});

export type TimelineEventValues = z.infer<typeof timelineEventSchema>;

export const timelineEventIdSchema = z.string().cuid();

// ---------- Medications ----------

export const medicationSchema = z.object({
  name: z.string().trim().min(1).max(80),
  dose: z.string().trim().min(1).max(40),
  scheduledAt: z.coerce.date(),
});

export type MedicationValues = z.infer<typeof medicationSchema>;

export const medicationIdSchema = z.string().cuid();

export const markGivenSchema = z.object({
  medicationId: medicationIdSchema,
  handler: z.string().trim().min(1).max(60),
});
