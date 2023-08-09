import coursesApi from '~/api/courses';
import { useCustomQuery } from '../custom/useCustomQuery';

export const useQueryGetCoursePercent = (id: number) => {
  const { data, isLoading, refetch } = useCustomQuery(['course_percent'], () =>
    coursesApi.getCoursePercent(id)
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
