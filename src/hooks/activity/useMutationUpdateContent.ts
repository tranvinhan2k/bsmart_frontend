import activityApi from '~/api/activity';
import { useCustomMutation } from '../useCustomMutation';

export const useMutationUpdateContent = () => {
  return useCustomMutation(['update_content'], activityApi.updateCourseContent);
};
