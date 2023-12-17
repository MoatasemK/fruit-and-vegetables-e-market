import { z } from 'zod';

export const createAnnoncePayloadSchema = z.object({
  title: z.string().min(6),
  description: z.string().min(15).max(300),
  price: z.number().positive().min(1),
  category: z.enum(['fruit', 'vegetable']),
  photo: z.any(),
});

export const updateAnnoncePayloadSchema = z
  .object({ _id: z.string().min(1) })
  .and(createAnnoncePayloadSchema);

export type Annonce = z.TypeOf<typeof updateAnnoncePayloadSchema> & {
  owner: {
    _id: string;
    fullname: string;
    email: string;
    password: string;
  };
};
