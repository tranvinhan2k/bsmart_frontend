import axiosClient from '~/api/axiosClient';
import { UseSearchRegisterRequestPayload } from '~/hooks/user/useSearchRegisterRequest';
import { OptionPayload, PagingFilterPayload } from '~/models';
import { User } from '~/models/user';
import { ProcessRegisterRequestPayload } from './mentorProfile';

export interface ResponseCategoriesPayload {
  id: number;
  code: string;
  name: string;
}

export function handleResponseGetCategories(
  data?: ResponseCategoriesPayload[]
): OptionPayload[] | undefined {
  if (!data) {
    return undefined;
  }
  return data.map((item) => ({
    id: item.id,
    label: item.name,
    value: item.code,
  }));
}

const url = '/mentor-profiles';

const registerRequestsApi = {
  async getAllCategories(): Promise<OptionPayload[] | undefined> {
    const response: ResponseCategoriesPayload[] = await axiosClient.get(
      `${url}`
    );
    return handleResponseGetCategories(response);
  },
  async getRegisterRequest(id: number): Promise<any> {
    const response: any = await axiosClient.get(`${url}/${id}`);
    return response;
  },
  searchRegisterRequest({
    q,
    status,
    page,
    size,
    sort,
  }: UseSearchRegisterRequestPayload): Promise<PagingFilterPayload<User>> {
    const urlSearch = `${url}/pending?accountStatus=${status}&q=${q}&page=${page}&size=${size}&sort=${sort}`;
    return axiosClient.get(`${urlSearch}`);
  },
  async approveRegisterRequest(
    data: ProcessRegisterRequestPayload
  ): Promise<any> {
    const response: any = await axiosClient.put(`${url}/${data.id}/approval`, {
      status: data.status,
      message: data.message,
    });
    return response;
  },
};

export default registerRequestsApi;
