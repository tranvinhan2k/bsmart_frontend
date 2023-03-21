import { useQuery } from '@tanstack/react-query';
import coursesApi from '~/api/courses';

export const useQueryGetSubCourseByCourseId = (
  id: string | number | undefined
) => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['sub_course_by_course_id'],
    queryFn: () => coursesApi.getSubCourse(`${id}`),
  });
  return {
    error,
    subCourses: data,
    isLoading,
  };
};
