import notificationApi from '~/api/notification';
import { useCustomMutation } from './custom/useCustomMutation';

export const useReadNotifications = () => {
  return useCustomMutation(
    ['post_read_notification'],
    notificationApi.postReadNotifications
  );
};
