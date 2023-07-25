import { useQuery } from '@tanstack/react-query';
import courseCreateRequestApi from '~/api/courseCreateRequest';
import { keyUseSearchCourseCreateRequest } from './key';

export interface UseSearchCourseCreateRequestPayload {
  status: string;
  q?: string | null;
  page?: number;
  size?: number | null;
  sort?: string[];
}

export const useSearchCourseCreateRequest = ({
  status,
  q,
  page,
  size,
  sort,
}: UseSearchCourseCreateRequestPayload) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [keyUseSearchCourseCreateRequest, status, q, page, size, sort],
    queryFn: () =>
      courseCreateRequestApi.searchCourseCreateRequest({
        status,
        q,
        page,
        size,
        sort,
      }),
    keepPreviousData: true,
  });

  return {
    courseCreateRequestList: data,
    error,
    isError,
    isLoading,
    refetch,
  };
};
