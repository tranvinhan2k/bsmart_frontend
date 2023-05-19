import axiosClient from '~/api/axiosClient';
import { LoginRequestPayload, LoginResponsePayload } from '~/models/api/auth';

const url = '/auth';

const authApi = {
  async signIn(
    credentialInformation: LoginRequestPayload
  ): Promise<LoginResponsePayload> {
    return axiosClient.post(`${url}/login`, credentialInformation);
  },
  async verifyEmail(code: string | undefined): Promise<{
    message: string;
    status: string;
  }> {
    return axiosClient.get(`${url}/verify?code=${code}`);
  },
  async reVerifyEmail(): Promise<{
    message: string;
    status: string;
  }> {
    return axiosClient.get(`${url}/resend-verify`);
  },
};

export default authApi;
