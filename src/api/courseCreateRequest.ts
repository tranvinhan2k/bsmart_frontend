import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';

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
  async approveCourseCreateRequest(id: number): Promise<any> {
    const response: any = await axiosClient.put(`${url}/${id}/approval`);
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
