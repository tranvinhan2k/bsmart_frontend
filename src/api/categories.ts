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

const url = `/categories`;

const categoriesApi = {
  async getAllCategories(): Promise<OptionPayload[] | undefined> {
    const response: ResponseCategoriesPayload[] = await axiosClient.get(
      `${url}`
    );
    return handleResponseGetCategories(response);
  },
  async getCategory(id: number): Promise<OptionPayload | undefined> {
    const response: any = await axiosClient.get(`${url}/${id}`);
    return response;
  },
  async deleteCategory(id: number): Promise<OptionPayload | undefined> {
    const response: any = await axiosClient.delete(`${url}/${id}`);
    return response;
  },
  async updateCategory(
    id: number,
    params: {
      code: string;
      name: string;
    }
  ): Promise<OptionPayload | undefined> {
    const response: any = await axiosClient.put(`${url}/${id}`, params);
    return response;
  },
  async createCategory(
    id: number,
    params: { code: string; name: string }
  ): Promise<OptionPayload | undefined> {
    const response: any = await axiosClient.post(`${url}/${id}`, params);
    return response;
  },
  async getAllCategoriesAllProp(): Promise<OptionPayload | undefined> {
    const response: any = await axiosClient.get(`${url}`);
    return response;
  },
};

export default categoriesApi;
