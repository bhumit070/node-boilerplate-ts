import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(30)
    .regex(/^[a-zA-Z0-9]*$/),
});

export const registerSchema = z.object({
  name: z.string().min(2).max(4),
  ...loginSchema.shape,
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
