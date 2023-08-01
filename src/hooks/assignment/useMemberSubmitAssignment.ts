import activityApi from '~/api/activity';
import { useCustomMutation } from '../custom/useCustomMutation';

export const useMemberSubmitAssignment = () => {
  return useCustomMutation(['submit_assignment'], activityApi.submitAssignment);
};
