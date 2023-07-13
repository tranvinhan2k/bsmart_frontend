import activityApi from '~/api/activity';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useMutationDeleteContent = () => {
  const mutation = useCustomMutation(
    ['delete_content'],
    activityApi.deleteContent
  );
  return mutation;
};
