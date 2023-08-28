import activityApi from '~/api/activity';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useGetAssignmentResult = (params: {
  classId: number;
  assignmentId: number;
}) => {
  return useCustomQuery(['get_result_asg'], () =>
    activityApi.getResultAssignment(params)
  );
};
