import { useQuery } from '@tanstack/react-query';
import { Key } from './key';
import coursesApi from '~/api/courses';

export interface UseSearchCourseUpdateRequestPayload {
  status: string;
  q?: string;
  page?: number;
  size?: number | null;
  sort?: string[];
}

export const useSearchCourseUpdateRequest = ({
  q = '',
  status,
  page = 0,
  size = null,
  sort = [],
}: UseSearchCourseUpdateRequestPayload) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [Key.UseSearchCourseUpdateRequest, status, q, page, size, sort],
    queryFn: () =>
      coursesApi.searchCourseUpdateRequest({
        status,
        q,
        page,
        size,
        sort,
      }),
    keepPreviousData: true,
  });

  return {
    courseUpdateRequestList: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
