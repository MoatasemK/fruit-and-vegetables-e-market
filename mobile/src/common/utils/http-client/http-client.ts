import axios from 'axios';
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
} from 'axios';

import type { HttpClientRequestConfig } from './http-client.types';
import { SERVER_BASE_URL, defaultHttpClientConfig } from './http-client.config';

export function createHttpClient(httpClientConfig: HttpClientRequestConfig) {
  if (!httpClientConfig.baseURL) throw new Error('baseURL option is required!');

  const { authToken, ...axiosConfig } = httpClientConfig;
  const httpClient = axios.create({
    transformRequest: axios.defaults.transformRequest,
    transformResponse: axios.defaults.transformResponse,
    ...defaultHttpClientConfig,
    ...axiosConfig,
  });

  const handleOnError = (error: AxiosError) => {
    console.log('---> Request Failed !');
    // console.log('Axios Config: ', error?.config);
    // console.log('-----> Error:', error?.response ?? error?.message);

    return Promise.reject(error?.response?.data || error);
  };

  const handleOnPreRequest = (request: InternalAxiosRequestConfig) => {
    request.headers = {
      ...request.headers,
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    } as unknown as AxiosRequestHeaders;

    return request;
  };
  httpClient.interceptors.request.use(handleOnPreRequest, handleOnError);
  const handleOnAfterResponse = (response: AxiosResponse) => {
    console.log('---> Request Successful!');

    return response.data;
  };
  httpClient.interceptors.response.use(handleOnAfterResponse, handleOnError);

  return httpClient;
}

export const httpClient = () =>
  createHttpClient({
    authToken: localStorage?.getItem('jwtToken') as string,
    baseURL: SERVER_BASE_URL,
  });
