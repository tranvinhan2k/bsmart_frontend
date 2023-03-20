import axiosClient from '~/api/axiosClient';
import { OptionPayload } from '~/models';
import { RoleKeys } from '~/models/variables';
import { ResponseCategoriesPayload } from './categories';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponsePayload {
  email: string;
  id: number;
  roles: RoleKeys[];
  token: string;
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

const url = `/auth`;

const authApi = {
  async signIn(
    credentialInformation: LoginPayload
  ): Promise<LoginResponsePayload> {
    return axiosClient.post(`${url}/login`, credentialInformation);
  },
};

export default authApi;
