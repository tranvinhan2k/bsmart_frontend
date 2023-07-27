import accountApi from '~/api/users';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useGetPromoCode = () => {
  return useCustomQuery(['promo_code'], () => accountApi.getIntroduceCode());
};
