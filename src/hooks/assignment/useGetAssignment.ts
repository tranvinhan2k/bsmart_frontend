import { useCustomQuery } from '../custom/useCustomQuery';
import activityApi from '~/api/activity';

export const useGetAssignment = (id: number) => {
  return useCustomQuery([], () => activityApi.getMentorAssignments(id));
};
