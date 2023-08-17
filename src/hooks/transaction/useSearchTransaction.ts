import { useQuery } from '@tanstack/react-query';
import { Key } from './key';
import transactionsApi from '~/api/transactions';

export interface UseSearchManagedWithdrawRequestPayload {
  q?: string;
  status: string;
  page?: number;
  size?: number | null;
  sort?: string[];
}

export const useSearchManagedWithdrawRequest = ({
  q = '',
  status,
  page = 0,
  size = null,
  sort = [],
}: UseSearchManagedWithdrawRequestPayload) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      Key.UseSearchManagedWithdrawRequest,
      q,
      status,
      page,
      size,
      sort,
    ],
    queryFn: () =>
      transactionsApi.searchManagedWithdrawRequest({
        q,
        status,
        page,
        size,
        sort,
      }),
    keepPreviousData: true,
  });

  return {
    managedWithdrawRequestList: data,
    error,
    isLoading,
    refetch,
  };
};
