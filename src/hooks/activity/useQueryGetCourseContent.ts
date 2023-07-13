import coursesApi from '~/api/courses';
import { useCustomQuery } from '~/hooks';

export const useQueryGetCourseContent = (id: number) => {
  return useCustomQuery(['get_content'], async () =>
    coursesApi.getAllCourseActivities(id)
  );
};
