import {API_MAIN} from '@env';
import {isAxiosError} from 'axios';
import {useAxios} from 'services/useAxios';

export const GetMenu = async () => {
  try {
    const response = await useAxios({
      url: `${API_MAIN}`,
      method: 'get',
    });
    return Promise.resolve(response?.data);
  } catch (error) {
    if (isAxiosError(error)) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
};
