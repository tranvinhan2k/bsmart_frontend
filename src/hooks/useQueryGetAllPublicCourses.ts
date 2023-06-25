import { useQuery } from '@tanstack/react-query';
import coursesApi from '~/api/courses';

export const useQueryGetAllPublicCourses = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['public_course'],
    queryFn: () => coursesApi.getAllPublicCourse(),
  });

  return {
    error,
    publicCourses: (data as any)?.items,
    isLoading,
  };
};
