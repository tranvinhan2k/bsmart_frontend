import activityApi from '~/api/activity';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useMutationUpdateContent = () => {
  return useCustomMutation(['update_content'], activityApi.updateCourseContent);
};
