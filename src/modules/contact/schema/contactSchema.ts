import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  description: z.string().trim().min(10).max(5000),
  privacyAccepted: z
    .boolean()
    .refine(value => value, { message: 'Privacy consent is required.' }),
  honeypot: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactActionResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };
