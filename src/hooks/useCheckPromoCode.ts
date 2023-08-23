import referralCodeApi from '~/api/slots copy';
import { useCustomMutation } from './custom/useCustomMutation';

export const useCheckPromoCode = () => {
  return useCustomMutation(
    ['check_promo_code'],
    referralCodeApi.checkReferralCode
  );
};
