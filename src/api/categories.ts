import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';
import { CategoriesPayload } from '~/models/type';

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

  async getMentorCategories(): Promise<OptionPayload[] | undefined> {
    const response: any[] = await axiosClient.get(`${url}//mentor-skills`);
    const formatResponse: OptionPayload[] = response.map((item) => ({
      id: item.id,
      label: item.name,
      value: item.id,
    }));
    return formatResponse;
  },

  async getCategory(id: number): Promise<any> {
    const response: any = await axiosClient.get(`${url}/${id}`);
    return response;
  },
  async deleteCategory(id: number): Promise<any> {
    const response: any = await axiosClient.delete(`${url}/${id}`);
    return response;
  },
  async updateCategory(params: {
    id: number;
    code: string;
    name: string;
  }): Promise<any> {
    const response: any = await axiosClient.put(`${url}/${params.id}`, {
      code: params.code,
      name: params.name,
    });
    return response;
  },
  async createCategory(params: { code: string; name: string }): Promise<any> {
    const response: any = await axiosClient.post(`${url}`, params);
    return response;
  },
  async getAllCategoriesAllProp(): Promise<CategoriesPayload[] | undefined> {
    const response = await axiosClient.get<any[]>(url);
    const result: CategoriesPayload[] = response.map((item: any) => ({
      id: item.id,
      code: item.code,
      name: item.name,
    }));

    return result;
  },
};

export default categoriesApi;
