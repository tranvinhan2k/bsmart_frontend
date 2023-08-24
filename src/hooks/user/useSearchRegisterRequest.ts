import { useQuery } from '@tanstack/react-query';
import { Key } from './key';
import registerRequestsApi from '~/api/registerRequest';

export interface UseSearchRegisterRequestPayload {
  q?: string;
  status: string;
  page?: number;
  size?: number | null;
  sort?: string[];
}

export const useSearchRegisterRequest = ({
  q = '',
  status,
  page = 0,
  size = null,
  sort = [],
}: UseSearchRegisterRequestPayload) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [Key.UseSearchRegisterRequest, q, status, page, size, sort],
    queryFn: () =>
      registerRequestsApi.searchRegisterRequest({
        q,
        status,
        page,
        size,
        sort,
      }),
    keepPreviousData: true,
  });

  return {
    registerRequestList: data,
    error,
    isLoading,
    refetch,
  };
};
