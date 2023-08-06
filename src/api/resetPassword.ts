import { generateMockApi } from '~/utils/common';
import { axiosClient } from './axiosClient';

const url = `/reset-password`;

const resetPasswordApi = {
  async sendMailResetPassword(): Promise<any> {
    // return axiosClient.post(`${url}`);
    return generateMockApi(true);
  },
};

export default resetPasswordApi;
