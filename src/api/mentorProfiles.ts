import axiosClient from '~/api/axiosClient';
import { MentorPayload } from '~/models/mentor';

const url = `/mentorProfiles`;

export interface ResponseMentorData {
  id: number;
  introduce: string;
  yearsOfExperience: string;
  user: {
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
        code: 'TEACHER';
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
  };
  skillList: [
    {
      id: number;
      code: string;
      name: string;
      categoryId: number;
    }
  ];
}

function handleGetMentorById(data: ResponseMentorData) {
  const result: MentorPayload = {
    id: data.id,
    avatar: data.user?.userImages?.[0].url,
    name: data.user?.fullName,
  };
  return result;
}

const mentorProfileApi = {
  async getMentorById(id: number): Promise<MentorPayload | undefined> {
    const response: ResponseMentorData = await axiosClient.get(`${url}/${id}`);
    return handleGetMentorById(response);
  },
  async getAllMentor(): Promise<MentorPayload[] | undefined> {
    return axiosClient.get(`${url}/name`);
  },
};

export default mentorProfileApi;
