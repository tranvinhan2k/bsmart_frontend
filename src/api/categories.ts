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
  async getAllCategories(): Promise<ResponseCategoriesPayload[]> {
    return axiosClient.get(`${url}`);
  },
};

export default categoriesApi;
