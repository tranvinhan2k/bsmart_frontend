import transactionsApi from '~/api/transactions';
import { useCustomMutation } from './custom/useCustomMutation';

export const useChangePromoCode = () => {
  return useCustomMutation(
    ['change_promo_code'],
    transactionsApi.postPromoCodeInformation
  );
};
