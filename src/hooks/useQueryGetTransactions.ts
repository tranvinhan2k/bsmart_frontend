import { useQuery } from '@tanstack/react-query';
import transactionsApi from '~/api/transactions';
import { PaginationPayload } from '~/models';

export const useQueryGetTransactions = ({
  page,
  size,
  sort,
}: PaginationPayload) => {
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
