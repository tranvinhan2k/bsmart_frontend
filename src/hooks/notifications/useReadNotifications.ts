import notificationApi from '~/api/notification';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useReadNotifications = () => {
  return useCustomMutation(
    ['read_notifications'],
    notificationApi.postReadNotifications
  );
};
