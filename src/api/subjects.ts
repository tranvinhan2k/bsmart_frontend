import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';

export interface ResponseSubjectsPayload {
  id: number;
  code: string;
  name: string;
  categoryId: number;
}

export function handleResponseGetSubjects(
  data?: ResponseSubjectsPayload[]
): OptionPayload[] | undefined {
  if (!data) {
    return undefined;
  }
  return data.map((item) => ({
    id: item.id,
    label: item.name,
    value: item.code,
    categoryId: item.categoryId,
  }));
}

const url = `/subjects`;

const subjectsApi = {
  async getAllSubjects(): Promise<OptionPayload[] | undefined> {
    const response: ResponseSubjectsPayload[] = await axiosClient.get(`${url}`);
    return handleResponseGetSubjects(response);
  },
};

export default subjectsApi;
