import axiosClient from '~/api/axiosClient';
import { UserPayload } from '~/models/user';

const url = `/users`;

const accountApi = {
  get(): Promise<UserPayload[]> {
    return axiosClient.get(url);
  },
};

export default accountApi;
