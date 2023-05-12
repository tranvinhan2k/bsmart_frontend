import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';
import { RoleKeys } from '~/models/variables';
import { ResponseCategoriesPayload } from './categories';

export interface LoginResponsePayload {
  email: string;
  id: number;
  roles: RoleKeys[];
  token: string;
}

export interface ImagePayload {
  id: number;
  name: string;
  url: string;
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

const url = `/image`;

const imageApi = {
  async uploadImage(formData: FormData): Promise<ImagePayload> {
    return axiosClient.post(`${url}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  async getImage(id: string): Promise<ImagePayload> {
    return axiosClient.get(`${url}/${id}`);
  },
};

export default imageApi;
