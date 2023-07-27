import activityApi from '~/api/activity';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useMutationSubmitPointAssignment = () => {
  return useCustomMutation(
    ['submit_point_assignment'],
    activityApi.addPointAssignment
  );
};
