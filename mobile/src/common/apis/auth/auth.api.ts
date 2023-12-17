import { z } from 'zod';

import { httpClient } from '@/common/utils';
import type { loginPayloadSchema, registerPayloadSchema } from './auth.schema';

type RegisterPayload = z.TypeOf<typeof registerPayloadSchema>;
export const register = (loginPayload: RegisterPayload) =>
  httpClient().post('/api/v1/auth/register', loginPayload);

type LoginPayload = z.TypeOf<typeof loginPayloadSchema>;
export const login = (loginPayload: LoginPayload) =>
  httpClient().post('/api/v1/auth/login', loginPayload);
