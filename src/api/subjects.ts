import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';

export interface ResponseSubjectsPayload {
  id: number;
  code: string;
  name: string;
  SubjectId: number;
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
    SubjectId: item.SubjectId,
  }));
}

const url = `/subjects`;

const subjectsApi = {
  async getAllSubjects(): Promise<OptionPayload[] | undefined> {
    const response: ResponseSubjectsPayload[] = await axiosClient.get(`${url}`);
    return handleResponseGetSubjects(response);
  },
  async getSubject(id: number): Promise<OptionPayload | undefined> {
    const response: any = await axiosClient.get(`${url}/${id}`);
    return response;
  },
  async deleteSubject(id: number): Promise<OptionPayload | undefined> {
    const response: any = await axiosClient.delete(`${url}/${id}`);
    return response;
  },
  async updateSubject(params: {
    id: number;
    code: string;
    name: string;
    categoryId: number;
  }): Promise<any> {
    const response: any = await axiosClient.put(`${url}/${params.id}`, {
      code: params.code,
      name: params.name,
      categoryId: params.categoryId,
    });
    return response;
  },
  async createSubject(params: {
    code: string;
    name: string;
    categoryId: number;
  }): Promise<any> {
    const response: any = await axiosClient.post(`${url}`, params);
    return response;
  },
  async getAllSubjectsAllProp(): Promise<any> {
    const response: any = await axiosClient.get(`${url}`);
    return response;
  },
};

export default subjectsApi;
