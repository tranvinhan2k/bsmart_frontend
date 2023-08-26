import axiosClient from '~/api/axiosClient';
import { UseMutationConfigReferralCodePayload } from '~/hooks/config/useMutationConfigReferralCode';
import { ConfigPayload } from '~/models/type';

const url = `/config`;

const configApi = {
  getConfigReferralCode(): Promise<ConfigPayload> {
    return axiosClient.get(`${url}/referral-code`);
  },
  editConfigReferralCode(
    data: UseMutationConfigReferralCodePayload
  ): Promise<boolean> {
    return axiosClient.post(`${url}/referral-code`, data);
  },
};

export default configApi;
