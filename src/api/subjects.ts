import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';
import { SubjectPayload } from '~/models/type';

export interface ResponseSubjectsPayload {
  id: number;
  code: string;
  name: string;
  categoryIds: number[];
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
    categoryIds: item.categoryIds,
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
  async getAllSubjectsAllProp(): Promise<SubjectPayload[]> {
    const response = await axiosClient.get<any[]>(`${url}`);

    const result: SubjectPayload[] = response.map((item: any) => ({
      id: item.id,
      name: item.name,
      code: item.code,
      categoryIds: item.categoryIds,
    }));
    return result;
  },
};

export default subjectsApi;
