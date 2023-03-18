import axiosClient from '~/api/axiosClient';
import { Role } from '~/models/role';
import { UserPayload } from '~/models/user';

const url = `/users`;
const urlAuth = `/auth`;

export interface RequestRegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
}
export interface RequestSignInPayload {
  email: string;
  password: string;
}

export interface EditAccountProfilePayload {
  oldPassword: string;
  newPassword: string;
}
export interface EditCertificateProfilePayload {
  certificate1: string;
  certificate2: string;
  certificate3: string;
  certificate4: string;
  certificate5: string;
}
export interface EditPersonalProfilePayload {
  fullName: string;
  birthday: Date | '';
  address: string;
  phone: string;
  introduce?: string;
}
export interface EditSocialProfilePayload {
  twitterLink?: string;
  facebookLink?: string;
  instagramLink?: string;
}

const accountApi = {
  signUp(data: RequestRegisterPayload): Promise<UserPayload[]> {
    return axiosClient.post(`${url}/register`, data);
  },
  signIn(data: RequestSignInPayload): Promise<any> {
    return axiosClient.post(`${urlAuth}/signin`, data);
  },
  getProfile(config: any): Promise<any> {
    return axiosClient.get(`${url}/profile`, config);
  },
  editAccountProfile(data: EditAccountProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/account`, data);
  },
  editCertificateProfile(data: EditCertificateProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/certificate`, data);
  },
  editMentorPersonalProfile(data: EditPersonalProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/mentor-personal`, data);
  },
  editMemberPersonalProfile(data: EditPersonalProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/member-personal`, data);
  },
  editSocialProfile(data: EditSocialProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/social`, data);
  },
};

export default accountApi;
