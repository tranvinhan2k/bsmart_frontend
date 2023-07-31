import activityApi from '~/api/activity';
import { useCustomMutation } from '../custom/useCustomMutation';
import assignmentFileApi from '~/api/assignmentFiles';

export const useDeleteFile = () => {
  return useCustomMutation(['delete_file'], assignmentFileApi.deleteFile);
};
