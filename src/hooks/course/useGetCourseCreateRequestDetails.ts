import { useQuery } from '@tanstack/react-query';
import classApi from '~/api/class';
import { keyUseGetCourseCreateRequestDetails } from './key';

export const useGetCourseCreateRequestDetails = (idCourse: number) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [keyUseGetCourseCreateRequestDetails, idCourse],
    queryFn: () => classApi.getCourseCreateRequestDetails(idCourse),
    keepPreviousData: true,
  });

  return {
    courseCreateRequestDetails: data,
    isError,
    isLoading,
    error,
    refetch,
  };
};
