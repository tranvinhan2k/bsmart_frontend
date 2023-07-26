import { useQuery } from '@tanstack/react-query';
import registerRequestsApi from '~/api/registerRequest';
import { keyUseSearchAccountRegisterRequest } from './key';

// export interface RequestCategoryPayload {
//   code: string;
//   name: string;
// }
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
    queryKey: [keyUseSearchAccountRegisterRequest, status, q, page, size, sort],
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
