import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';
import { ProcessRegisterRequestPayload } from './mentorProfile';

const url = '/courses';

const courseCreateRequestApi = {
  async searchCourseCreateRequest({
    status,
    q,
    size,
    sort,
  }: SearchCourseCreateRequestProps): Promise<any> {
    const urlSearch = `${url}/pending?status=${status}&page=${0}&size=${size}`;
    const response: any = await axiosClient.get(`${urlSearch}`);
    return response.items;
  },
  async approveCourseCreateRequest(
    data: ProcessRegisterRequestPayload
  ): Promise<any> {
    const response: any = await axiosClient.put(`${url}/${data.id}/approval`, {
      status: data.status,
      message: data.message,
    });
    return response;
  },
};

interface SearchCourseCreateRequestProps {
  status?: string;
  q?: string;
  size?: number;
  sort?: string;
}

export default courseCreateRequestApi;
