import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';

export interface ResponseSubjectsPayload {
  id: number;
  code: string;
  name: string;
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
  }));
}

const url = `/subjects`;

const subjectsApi = {
  async getAllSubjects(): Promise<ResponseSubjectsPayload[]> {
    return axiosClient.get(`${url}`);
  },
};

export default subjectsApi;
