import axiosClient from '~/api/axiosClient';
import { Role } from '~/models/role';
import { UserPayload } from '~/models/user';

const url = `/users`;

export interface RequestRegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
}

const accountApi = {
  signUp(data: RequestRegisterPayload): Promise<UserPayload[]> {
    return axiosClient.post(`${url}/register`, data);
  },
};

export default accountApi;
