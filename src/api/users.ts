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

export interface EditPersonalProfilePayload {
  oldPassword: string;
  newPassword: string;
}

export interface EditSocialProfilePayload {
  id: number;
  twitterLink: string;
  facebookLink: string;
  instagramLink: string;
}

const accountApi = {
  signUp(data: RequestRegisterPayload): Promise<UserPayload[]> {
    return axiosClient.post(`${url}/register`, data);
  },
  editSocialProfile(data: EditSocialProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/${data.id}/social`, data);
  },
  editPersonalProfile(data: EditPersonalProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/account`, data);
  },
};

export default accountApi;
