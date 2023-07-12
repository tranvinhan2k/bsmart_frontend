import coursesApi from '~/api/courses';
import { useCustomQuery } from '../useCustomQuery';

export const useQueryGetCourseContent = (id: number) => {
  return useCustomQuery(['get_content'], async () =>
    coursesApi.getAllCourseActivities(id)
  );
};
