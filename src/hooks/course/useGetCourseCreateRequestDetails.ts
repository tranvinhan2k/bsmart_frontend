import { useQuery } from '@tanstack/react-query';
import { Key } from './key';
import classApi from '~/api/class';

export const useGetCourseCreateRequestDetails = (idCourse: number) => {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [Key.UseGetCourseCreateRequestDetails, idCourse],
    queryFn: () => classApi.getCourseCreateRequestDetails(idCourse),
    keepPreviousData: true,
  });

  return {
    courseCreateRequestDetails: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
