import { useQuery } from '@tanstack/react-query';
import transactionsApi from '~/api/transactions';

export const useQueryGetTransactions = () => {
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ['get_transactions'],
    queryFn: () => transactionsApi.getTransactions(),
  });
  return {
    error,
    transactions: data,
    isLoading,
    refetch,
  };
};
