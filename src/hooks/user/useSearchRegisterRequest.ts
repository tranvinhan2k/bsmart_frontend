import { useQuery } from '@tanstack/react-query';
import { Key } from './key';
import registerRequestsApi from '~/api/registerRequest';

export interface UseSearchRegisterRequestPayload {
  status: string;
  q?: string;
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
    queryKey: [Key.UseSearchRegisterRequest, status, q, page, size, sort],
    queryFn: () =>
      registerRequestsApi.searchRegisterRequest({
        status,
        q,
        page,
        size,
        sort,
      }),
    keepPreviousData: true,
  });

  return {
    registerRequest: data,
    error,
    isLoading,
    refetch,
  };
};
