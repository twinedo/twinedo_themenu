import {X_SECRET_TOKEN} from '@env';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

const instance = axios;

interface configProps {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  params?: object;
  data?: any;
  headers?: any;
  cancelToken?: any;
}

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    'X-SECRET-TOKEN': X_SECRET_TOKEN,
  };
  return config;
});

export const useAxios = async (props: configProps) => {
  const {url, method, params, data, headers, cancelToken} = props;

  try {
    const response: AxiosResponse = await instance({
      url,
      method,
      params,
      data,
      cancelToken,
      headers,
    });

    return Promise.resolve(response);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError;
      if (serverError && serverError.response) {
        return Promise.reject(serverError.response);
      }
    } else {
      throw new Error('different error than axios');
    }
  }
};
