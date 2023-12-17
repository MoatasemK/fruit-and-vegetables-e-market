import type { HttpClientRequestConfig } from './http-client.types';

export const defaultHttpClientConfig: HttpClientRequestConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    responseType: 'json',
    timeout: 2000,
  },
};

export const SERVER_BASE_URL = 'http://localhost:3333';
