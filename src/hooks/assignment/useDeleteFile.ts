import activityApi from '~/api/activity';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useDeleteFile = (id: number) => {
  return useCustomMutation(['delete_file'], activityApi.deleteFile);
};
