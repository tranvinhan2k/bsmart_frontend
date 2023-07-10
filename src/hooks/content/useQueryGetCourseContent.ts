import { useCustomQuery } from '../useCustomQuery';
import activityApi from '~/api/activity';

export const useQueryGetCourseContent = (id: number) => {
  return useCustomQuery(['get_content'], async () =>
    activityApi.getCourseContent(id)
  );
};
