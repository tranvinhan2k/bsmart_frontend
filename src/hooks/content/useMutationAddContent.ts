import activityApi from '~/api/activity';
import { useCustomMutation } from '../useCustomMutation';

export const useMutationAddContent = () => {
  const mutation = useCustomMutation(
    ['create_content'],
    activityApi.addActivityCourse
  );
  return mutation;
};
