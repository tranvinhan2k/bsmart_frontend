import { useCustomQuery } from '../custom/useCustomQuery';
import activityApi from '~/api/activity';

export const useGetAssignment = (id: number, classId: number) => {
  return useCustomQuery([], () =>
    activityApi.getMentorAssignments({
      id,
      params: {
        page: 0,
        classIds: [classId],
      },
    })
  );
};
