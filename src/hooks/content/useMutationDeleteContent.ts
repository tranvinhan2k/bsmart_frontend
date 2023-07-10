import activityApi from '~/api/activity';
import { useCustomMutation } from '../useCustomMutation';

export const useMutationDeleteContent = () => {
  const mutation = useCustomMutation(
    ['delete_content'],
    activityApi.deleteCourseContent
  );
  return mutation;
};
