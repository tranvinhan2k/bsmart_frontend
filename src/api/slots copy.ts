import axiosClient from '~/api/axiosClient';
import { ReferralCodeResponse } from '~/models/response';
import { IntroduceCodePayload } from '~/pages/CheckoutPage';

const url = `/referral-code`;

const referralCodeApi = {
  async checkReferralCode(params: { code: string; courseId: number }) {
    const response: ReferralCodeResponse = await axiosClient.get(`${url}`, {
      params,
    });
    const result: IntroduceCodePayload = {
      id: response.id || 0,
      classId: response.id || 0,
      code: response.code || '',
      courseId: response.id || 0,
      percent: response.discountPercent || 0,
    };
    return result;
  },
};
export default referralCodeApi;
