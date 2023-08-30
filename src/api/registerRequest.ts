import axiosClient from '~/api/axiosClient';
import { OptionPayload, PagingFilterPayload } from '~/models';
import { UseMutationProcessRegisterRequestPayload } from '~/hooks/user/useMutationProcessRegisterRequest';
import { User } from '~/models/user';
import { UseSearchRegisterRequestPayload } from '~/hooks/user/useSearchRegisterRequest';
import { generateMockApi } from '~/utils/common';
import { UseMutationRequestChangeContentPayload } from '~/hooks/user/useMutationRequestChangeContent';

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
  searchRegisterRequest({
    q,
    status,
    page,
    size,
    sort,
  }: UseSearchRegisterRequestPayload): Promise<PagingFilterPayload<User>> {
    const urlSearch = `${url}/pending?q=${q}&accountStatus=${status}&page=${page}&size=${size}&sort=${sort}`;
    return axiosClient.get(`${urlSearch}`);
  },
  processRegisterRequest(
    data: UseMutationProcessRegisterRequestPayload
  ): Promise<boolean> {
    return axiosClient.put(`${url}/${data.id}/approval`, {
      status: data.status,
      message: data.message,
    });
  },
  processManagerRequestEditMentor(id: number): Promise<boolean> {
    return axiosClient.put(`${url}/${id}/change-edit-request`);
  },
  processChangeContentRequest(
    data: UseMutationRequestChangeContentPayload
  ): Promise<boolean> {
    return generateMockApi(true);
  },
};

export default registerRequestsApi;
