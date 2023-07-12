import activityApi from '~/api/activity';
import { useCustomMutation } from '../useCustomMutation';
import { PostActivityRequest } from '~/models';

export const useMutationAddSection = (params: PostActivityRequest) => {
  const mutation = useCustomMutation(['add_section'], () =>
    activityApi.addSectionActivity(params)
  );
  return mutation;
};
