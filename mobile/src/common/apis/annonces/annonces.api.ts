import { z } from 'zod';

import { httpClient } from '@/common/utils';
import { createAnnoncePayloadSchema, updateAnnoncePayloadSchema } from './annonces.schema';

export const getAll = () => httpClient().get('/api/v1/annonces');

export const get = (annonceId: string) => httpClient().get(`/api/v1/annonces/${annonceId}`);

type CreateAnnoncePayload = z.TypeOf<typeof createAnnoncePayloadSchema>;
export const create = (createAnnoncePayload: CreateAnnoncePayload) =>
  httpClient().post(`/api/v1/annonces`, createAnnoncePayload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

type UpdateAnnoncePayload = z.TypeOf<typeof updateAnnoncePayloadSchema>;
export const update = (updateAnnoncePayload: UpdateAnnoncePayload) =>
  httpClient().put(`/api/v1/annonces/${updateAnnoncePayload._id}`, updateAnnoncePayload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const del = (annonceId: string) => httpClient().delete(`/api/v1/annonces/${annonceId}`);
