import axiosClient from '~/api/axiosClient';
import { MentorPayload, MentorQuickPayload } from '~/models/mentor';
import { MentorProfileRequestInfoPayload } from '~/models/mentorProfiles';
import { PagingFilterPayload, PagingFilterRequest } from '~/models';
import { ProfileImgType } from '~/constants/profile';
import { UseMutationUpdateMentorProfileRequestPayload } from '~/hooks/user/useMutationUpdateMentorProfileRequest';
import { ResponseGetMentorPayload } from '~/models/response';

const url = `/mentor-profiles`;

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

function handleResponseGetMentor(
  data?: PagingFilterPayload<ResponseGetMentorPayload>
): PagingFilterPayload<MentorQuickPayload> | null {
  if (!data) {
    return null;
  }
  return {
    ...data,
    items: data.items.map((item) => {
      return {
        id: item.id || 0,
        fullName: item.user?.fullName || '',
        introduce: item.introduce || '',
        averageRate: item.averageRate || 0,
        submissionCount: item.submissionCount || 0,
        workingExperience: item.workingExperience || '',
        userImagesAvatar:
          item.user?.userImages.find(
            (img: any) => img.type === ProfileImgType.AVATAR
          )?.url || '',
      };
    }),
  };
}

const mentorProfileApi = {
  async getMentorById(id: number): Promise<MentorPayload | undefined> {
    return axiosClient.get(`${url}/${id}`);
  },
  async getAllMentor(
    data: PagingFilterRequest
  ): Promise<PagingFilterPayload<MentorQuickPayload> | null> {
    const response: PagingFilterPayload<ResponseGetMentorPayload> =
      await axiosClient.get(url, {
        params: data,
        paramsSerializer: { indexes: null },
      });
    return handleResponseGetMentor(response);
  },

  getUpdateMentorProfileRequestInfo(): Promise<
    MentorProfileRequestInfoPayload[]
  > {
    return axiosClient.get(`${url}/request-approval`);
  },

  updateMentorProfileRequest(
    data: UseMutationUpdateMentorProfileRequestPayload
  ): Promise<any> {
    return axiosClient.post(`${url}/request-edit-profile`, data);
  },

  sendUpdateMentorProfileRequest(id: number): Promise<any> {
    return axiosClient.post(`${url}/${id}`);
  },
};

export default mentorProfileApi;
