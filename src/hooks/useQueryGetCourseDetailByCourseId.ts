import { useQuery } from '@tanstack/react-query';
import coursesApi from '~/api/courses';

export const useQueryGetCourseDetailByCourseId = (
  id: string | number | undefined
) => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['course_detail'],
    queryFn: () => coursesApi.getDetailCourse(`${id}`),
  });
  return {
    error,
    courseDetail: data,
    isLoading,
  };
};
