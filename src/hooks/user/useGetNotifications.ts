import accountApi from '~/api/users';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useGetNotifications = () => {
  return useCustomQuery(['get_notification'], accountApi.getNotifications);
};
