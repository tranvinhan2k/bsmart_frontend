import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';

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
  async searchRegisterRequests({
    status,
    q,
    size,
    sort,
  }: SearchRegisterRequestsProps): Promise<any> {
    const urlSearch = `${url}/pending?accountStatus=${status}&page=${0}&size=${size}`;
    const response: any = await axiosClient.get(`${urlSearch}`);
    return response.items;
  },
  async approveRegisterRequest(id: number): Promise<any> {
    const response: any = await axiosClient.put(`${url}/${id}/approve`);
    return response;
  },
};

interface SearchRegisterRequestsProps {
  status?: string;
  q?: string;
  size?: number;
  sort?: string;
}

export default registerRequestsApi;
