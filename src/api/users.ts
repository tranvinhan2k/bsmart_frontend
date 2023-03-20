import axiosClient from '~/api/axiosClient';
import { MentorPayload } from '~/models/mentor';
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
  async getMentorData(id: string): Promise<MentorPayload> {
    const response: UserResponsePayload = await axiosClient.get(`${url}/${id}`);
    return handleGetMentor(response);
  },
};

export default accountApi;
