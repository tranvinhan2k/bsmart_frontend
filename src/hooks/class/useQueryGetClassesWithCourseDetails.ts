import { useQuery } from '@tanstack/react-query';
import classApi from '~/api/class';
import { keyUseQueryGetClassesOfCourseWithCourseDetails } from './key';

export const useQueryGetClassesOfCourseWithCourseDetails = (
  idCourse: number
) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [keyUseQueryGetClassesOfCourseWithCourseDetails, idCourse],
    queryFn: () => classApi.getClassesOfCourseWithCourseDetails(idCourse),
    keepPreviousData: true,
  });

  return {
    classesOfCourseWithCourseDetails: data,
    isError,
    isLoading,
    error,
    refetch,
  };
};
