import accountApi from '~/api/users';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useAddPromoCode = () => {
  return useCustomMutation(['add_promo_code'], accountApi.addPromoCode);
};
