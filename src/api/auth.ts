import axiosClient from '~/api/axiosClient';
import { LoginRequestPayload, LoginResponsePayload } from '~/models/api/auth';

const url = '/auth';

const authApi = {
  async signIn(
    credentialInformation: LoginRequestPayload
  ): Promise<LoginResponsePayload> {
    return axiosClient.post(`${url}/login`, credentialInformation);
  },
};

export default authApi;
