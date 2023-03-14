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

export interface EditAccountProfilePayload {
  oldPassword: string;
  newPassword: string;
}
export interface EditPersonalProfilePayload {
  fullName: string;
  birthday: Date | '';
  address: string;
  phone: string;
}
export interface EditSocialProfilePayload {
  twitterLink: string;
  facebookLink: string;
  instagramLink: string;
}

const accountApi = {
  signUp(data: RequestRegisterPayload): Promise<UserPayload[]> {
    return axiosClient.post(`${url}/register`, data);
  },
  editAccountProfile(data: EditAccountProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/account`, data);
  },
  editPersonalProfile(data: EditPersonalProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/personal`, data);
  },
  editSocialProfile(data: EditSocialProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/social`, data);
  },
};

export default accountApi;
