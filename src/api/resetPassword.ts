import { generateMockApi } from '~/utils/common';
import { axiosClient } from './axiosClient';

const url = `/reset-password`;

const resetPasswordApi = {
  async sendMailResetPassword(email: string): Promise<boolean> {
    return axiosClient.post(`${url}/${email}/generate-token`);
  },

  async confirmEmailIsValid(token: string) {
    // return
    return generateMockApi(true);
  },

  async resetPassword({
    params,
    token,
  }: {
    token: string;
    params: { oldPassword: string; newPassword: string };
  }) {
    // return axiosClient.put(`${url}/${token}`);
    return generateMockApi(true);
  },
};

export default resetPasswordApi;
