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
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type TAuth = z.infer<typeof authSchema>;
