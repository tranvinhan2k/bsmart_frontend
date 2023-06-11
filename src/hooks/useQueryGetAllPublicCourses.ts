import { useQuery } from '@tanstack/react-query';
import coursesApi from '~/api/courses';

export const useQueryGetAllPublicCourses = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => coursesApi.getAllPublicCourse(),
  });

  return {
    error,
    publicCourses: data?.items,
    isLoading,
  };
};
