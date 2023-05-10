import axiosClient from '~/api/axiosClient';
import { Role } from '~/models/role';
import { UserPayload } from '~/models/user';
import { ProfileImgType } from '~/constants/profile';
import { LoginRequestPayload } from '~/models/api/auth';
import { EditAccountProfilePayload } from '~/models/modelAPI/user/account';
import { EditPersonalProfilePayload } from '~/models/modelAPI/user/personal';
import { EditSocialProfilePayload } from '~/models/modelAPI/user/social';

const url = `/users`;
const urlAuth = `/auth`;

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
export interface EditCertificateProfilePayload {
  certificates: { file: string | Blob }[];
}
export interface EditImageProfilePayload {
  file: string | Blob;
  imageType:
    | ProfileImgType.AVATAR
    | ProfileImgType.FRONTCI
    | ProfileImgType.BACKCI;
}

export interface EditMentorProfilePayload {
  introduce: string;
  mentorSkills: Array<any>;
  workingExperience: string;
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

const accountApi = {
  signUp(data: RequestRegisterPayload): Promise<UserPayload[]> {
    return axiosClient.post(`${url}/register`, data);
  },
  signIn(data: LoginRequestPayload): Promise<any> {
    return axiosClient.post(`${urlAuth}/login`, data);
  },
  getProfile(config: any): Promise<any> {
    return axiosClient.get(`${url}/profile`, config);
  },
  getUserById(id: number): Promise<any> {
    return axiosClient.get(`${url}/${id}`);
  },
  getTokenProfile(): Promise<ResponseProfilePayload> {
    return axiosClient.get(`${url}/profile`);
  },
  editAccountProfile(data: EditAccountProfilePayload): Promise<any> {
    return axiosClient.put(`${url}/password`, data);
  },
  async editImageProfile(data: EditImageProfilePayload): Promise<any> {
    const bodyFormData = new FormData();
    const { file, imageType } = data;

    bodyFormData.append('file', file);
    bodyFormData.append('imageType', imageType);

    return axiosClient.post(`${url}/upload-image`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
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
    return axiosClient.put(`/mentor-profiles`, data);
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
