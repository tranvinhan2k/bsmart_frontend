import { useQuery } from '@tanstack/react-query';
import { Key } from './key';
import classApi from '~/api/class';
import { CourseStatusType } from '~/constants/course';

export interface UseGetCourseCreateRequestDetailsPayload {
  idCourse: number;
  status: CourseStatusType;
}

export const useGetCourseCreateRequestDetails = ({
  idCourse,
  status,
}: UseGetCourseCreateRequestDetailsPayload) => {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [Key.UseGetCourseCreateRequestDetails, idCourse, status],
    queryFn: () => classApi.getCourseCreateRequestDetails({ idCourse, status }),
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
