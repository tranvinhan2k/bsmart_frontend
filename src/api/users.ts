import axiosClient from '~/api/axiosClient';
import { MentorPayload } from '~/models/mentor';
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
  certificates: { file: string | Blob }[];
}
export interface EditImageProfilePayload {
  avatar: string;
  identityFront?: string;
  identityBack?: string;
}
export interface EditPersonalProfilePayload {
  fullName: string;
  birthday: Date | '';
  address: string;
  phone: string;
}
export interface EditMentorProfilePayload {
  introduce: string;
  skills: Array<any>;
  experience: string;
}
export interface EditSocialProfilePayload {
  twitterLink?: string;
  facebookLink?: string;
  instagramLink?: string;
}

export interface ResponseProfilePayload {
  id: number;
  username: string;
  introduce: string;
  fullName: string;
  email: string;
  birthday: string;
  gender: string;
  address: string;
  phone: string;
  status: boolean;
  roles: [
    {
      id: number;
      name: string;
      code: string;
    }
  ];
  twitterLink: string;
  facebookLink: string;
  instagramLink: string;
  userImages: [
    {
      id: number;
      name: string;
      url: string;
    }
  ];
  wallet: {
    id: number;
    balance: number;
    previous_balance: number;
    owner_id: number;
  };
}

export interface UserResponsePayload {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  birthday: string;
  address: string;
  phone: string;
  status: true;
  roles: [
    {
      id: number;
      name: string;
      code: string;
    }
  ];
  twitterLink: string;
  facebookLink: string;
  instagramLink: string;
  userImages: [
    {
      id: number;
      name: string;
      url: string;
    }
  ];
  wallet: {
    id: number;
    balance: number;
    previous_balance: number;
    owner_id: number;
  };
}

function handleGetMentor(data: UserResponsePayload) {
  const result: MentorPayload = {
    id: data.id,
    avatar: data.userImages?.[0]?.url,
    name: data.fullName,
  };
  return result;
}

const accountApi = {
  signUp(data: RequestRegisterPayload): Promise<UserPayload[]> {
    return axiosClient.post(`${url}/register`, data);
  },
  signIn(data: RequestSignInPayload): Promise<any> {
    return axiosClient.post(`${urlAuth}/login`, data);
  },
  getProfile(config: any): Promise<any> {
    return axiosClient.get(`${url}/profile`, config);
  },
  getTokenProfile(): Promise<ResponseProfilePayload> {
    return axiosClient.get(`${url}/profile`);
  },
  editAccountProfile(data: EditAccountProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/account`, data);
  },
  editImageProfile(data: EditImageProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/images`, data);
  },
  editCertificateProfile(data: EditCertificateProfilePayload): Promise<any> {
    const bodyFormData = new FormData();
    const files = data.certificates;
    files.forEach((item) => {
      bodyFormData.append('files', item.file);
    });
    return axiosClient.post(`${url}/upload-degree`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  editMentorProfile(data: EditMentorProfilePayload): Promise<any> {
    return axiosClient.put(`/mentorProfiles`, data);
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
  async getMentorData(id: string): Promise<any> {
    return axiosClient.get(`${url}/${id}`);
  },
};

export default accountApi;
