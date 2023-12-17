import { z } from 'zod';

export const registerPayloadSchema = z.object({
  fullname: z.string().min(10),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginPayloadSchema = registerPayloadSchema.pick({
  email: true,
  password: true,
});
