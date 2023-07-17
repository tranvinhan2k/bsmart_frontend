import activityApi from '~/api/activity';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useMutationAddSection = () => {
  const mutation = useCustomMutation(
    ['add_section'],
    activityApi.addSectionActivity
  );
  return mutation;
};
