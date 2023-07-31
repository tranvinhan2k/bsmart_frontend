import { useQuery } from '@tanstack/react-query';
import transactionsApi from '~/api/transactions';

export interface UseQueryGetTransactionsPayload {
  page: number;
  size: number;
  sort: string;
}

export const useQueryGetTransactions = ({
  page,
  size,
  sort,
}: UseQueryGetTransactionsPayload) => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['transactions', page, size, sort],
    queryFn: () => transactionsApi.getTransactions({ page, size, sort }),
    keepPreviousData: true,
  });
  return {
    error,
    isLoading,
    refetch,
    transactions: data,
  };
};
