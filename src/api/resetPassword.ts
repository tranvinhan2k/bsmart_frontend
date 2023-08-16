import { axiosClient } from './axiosClient';

const url = `/reset-password`;

const resetPasswordApi = {
  async sendMailResetPassword(email: string): Promise<boolean> {
    return axiosClient.post(`${url}/${email}/generate-token`);
  },

  async confirmEmailIsValid(token: string) {
    return axiosClient.get(`${url}/${token}`);
  },

  async resetPassword({
    params,
    token,
  }: {
    token: string;
    params: { password: string };
  }) {
    return axiosClient.put(`${url}/${token}`, params);
  },
};

export default resetPasswordApi;
