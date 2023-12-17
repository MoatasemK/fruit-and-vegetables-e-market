import type { AxiosRequestConfig } from 'axios';

export interface HttpClientRequestConfig extends AxiosRequestConfig {
  baseURL?: string;
  authToken?: string;
}
